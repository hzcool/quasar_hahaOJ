<template>
  <div class="q-ma-lg">
    <div class="q-gutter-lg text-h6 text-black">
      <q-radio v-model="is_open" :val="true" label="公开题库" color="cyan" />
      <q-radio v-model="is_open" :val="false" label="私有题库" color="orange" :disable="($store.state.user.privilege&4)==0"/>
    </div>
    <div class="row q-mt-md q-ml-md">
      <Page :total="total" :page-size="page_size"  show-total show-elevator  :current.sync="current" @on-change="get_problems"/>
      <q-space />
      <Button type="info"  class="q-mr-md" @click="$router.push({name:'newProblem'}) " v-if="($store.state.user.privilege&4)>0"> 创建题目 </Button>
      <Button type="warning" class="q-mr-md" @click="reverse"> 反序 </Button>
    </div>

    <Table border :columns="columns" :data="data" class="q-mt-md">
      <template slot-scope="{ row }" slot="index">
        <router-link to="#"> {{row.index}} </router-link>
      </template>
      <template slot-scope="{ row }" slot="title">
        <router-link to="#"> {{row.title}} </router-link>
      </template>
      <template slot-scope="{ row }" slot="tags">
        <Tag v-for="(tag,idx) in row.tags" :key="idx" :color="tag.color"> {{tag.label}} </Tag>
      </template>
      <template slot-scope="{ index,row }" slot="action" style="text-align: center">
        <Button type="primary" @click="$router.push({name:'problemInfo',params:{'index':row.index}})" v-if="($store.state.user.privilege&8)>0"> 修改 </Button>
        <Button type="error" style="margin-left: 10px" @click="del(row,index)" v-if="($store.state.user.privilege&32)>0"> 删除 </Button>
        <Button type="warning" style="margin-left: 10px" @click="copy(row.index)" v-if="($store.state.user.privilege&16)>0"> 拷贝 </Button>
        <Button type="info" style="margin-left: 10px" @click="showTagModal(row)" v-if="($store.state.user.privilege&8)>0"> 标签 </Button>
        <Button type="success" style="margin-left: 10px" @click="$router.push({name:'testdata',params:{'index':row.index}})" v-if="($store.state.user.privilege&64)>0"> 测试数据 </Button>
      </template>
    </Table>

    <Modal
      width="800px"
      v-model="tagsModal"
      title="设置题目标签"
      @on-ok = "updateTags"
      >
      <Tags :prop_tags="tags" ref="tags" />
    </Modal>
    <br>
  </div>
</template>

<script>
    import Tags from "../../../components/Tags"
    export default {
        name: "index",
        components: {Tags},
        data() {
          return {

            columns: [
              {
                title:'Index',
                slot: 'index',
                width: 80,
              },
              {
                title: 'Title',
                slot: 'title',
              },
              {
                title: 'Author',
                key: 'author'
              },
              {
                title: 'Source',
                key: 'source',
              },
              {
                  title:'Tags',
                  slot:"tags",
              },
              {
                title: 'Action',
                slot: 'action',
                width: 450,
              }
            ],
            is_open : true,
            data: [],
            page_size: 50,
            total: 0,
            current:1,
            inv_order: true,
            wants : JSON.stringify( ["index","title","author","source"]),
            tagsModal: false,
            tags:[],
            tag_row:null,
          }
        },
        watch: {
          is_open() {

            this.current = 1
            this.get_problems()
          }
        },
        methods: {
          showTagModal(row) {
            this.tag_row = row
            this.tags = row.tags
            this.tagsModal = true
          },
          updateTags() {
            // this.tag_row.tags = this.$refs.tags.get_select_tags()
            let form = new FormData()
            let tmp = this.$refs.tags.get_select_tags()
            form.set("tags",JSON.stringify(tmp))
            form.set("index",this.tag_row.index)
            this.$req.post("updateProblemTags",form)
            .then (res=> {
              if (res.errno == undefined) {
                this.tag_row.tags =  tmp
                this.$notify("success","更新题目标签成功")
              }
            })
          },
          del(row,i) {
            this.$q.dialog({
              dark: true,
              title: '确认框',
              message: '你确定要删除 ' + '<strong style="font-size:18px;color:red">' +row.title +'</strong>'+" 这道题",
              cancel: true,
              persistent: true,
              html: true
            }).onOk(() => {
              this.$req.get("delProblem",{"index":row.index})
                .then(res=>{
                  if(res.errno==undefined) {
                    this.data.splice(i,1)
                    this.$notify("success","删除成功")
                  }
                })
            })
          },
          copy(index) {
            let copyMsg = "私有题库"
            if (index[0]=='U') copyMsg = "公共题库"
            copyMsg = " 将会被拷贝到" + copyMsg +"中,你确定吗"
            this.$q.dialog({
              dark: true,
              title: '确认框',
              message: '<strong style="font-size:18px;color:red">' + index +'</strong>'+ copyMsg,
              cancel: true,
              persistent: true,
              html: true
            }).onOk(() => {
              this.$req.get("copyProblem",{"index":index})
                .then(res=>{
                  if(res.errno==undefined) {
                    this.$notify("success","拷贝成功")
                  }
                })
            })
          },
          reverse() {
              this.data = this.data.reverse()
              this.inv_order = !this.inv_order
          },
          get_problems() {
            let l = this.page_size*(this.current-1) + 1
            let r = l + this.page_size-1
            this.$req.get("getProblems",{"l":l,"r":r,"is_open":this.is_open})
            .then(res=>{
              if(res.errno==undefined) {
                this.total = res.total
                if(this.inv_order) this.data = res.data.reverse();else this.data = res.data
                for(let item of this.data) {
                  if (item.tags=="") item.tags = []
                  else item.tags = JSON.parse(item.tags)
                }
              }
            })
          }
        },
        mounted() {
          this.get_problems()
        }
    }
</script>

<style scoped>

</style>
