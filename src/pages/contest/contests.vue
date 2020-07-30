<template>
  <div class="row justify-center">
  <div class="q-pa-lg" v-if="loaded" style="width: 1600px">
    <div class="text-h3 text-center q-mt-md"> 比赛列表 </div>
    <br>
    <Row class="q-mt-md">
      <span style="font-size: 15px;color: black"> 比赛ID <Input v-model="id"  placeholder="Search By ID" style="width: 200px;margin-left: 2px;" @on-enter="search"/> </span>
      <span style="margin-left: 30px;font-size: 15px;color: black">
                比赛标题
                <Input v-model="contestName"  placeholder="Search By Contest Title" style="width: 200px;margin-left: 2px;" @on-enter="search"/>
            </span>
      <span style="margin-left: 30px;font-size: 15px;color: black">
                状态
                <Select v-model="select" style="width:200px;margin-left: 2px;">
                    <Option v-for="item in statusList" :value="item.value" :key="item.value" :class="item.value">{{ item.label }}</Option>
                </Select>
            </span>
      <Button :loading="sloading" type="info" shape="circle" icon="ios-search" style="margin-left:20px" @click="search">查找</Button>
      <Page :total="total" :page-size="pageSize"  show-total show-elevator @on-change="changePage" style="float: right"/>
      <div style="clear: both"> </div>
    </Row>
    <br>
    <div class="contesttable">
      <Table  :columns="head" :data="data" :rowClassName="rowClassName">
        <template slot-scope="{ row }" slot="title">
          <Button type="text" @click="forEnter(row)" style="color: #2d8cf0"> {{row.title}} </Button>
        </template>
        <template slot-scope="{ row }" slot="status">
          <span :class="row.status"> {{row.status}} </span>
        </template>
        <template slot-scope="{ row }" slot="length">
          <span> {{row.length.toFixed(2)}} </span>
        </template>
      </Table>
    </div>
  </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        head:[
          {
            title: '比赛ID',
            key: 'id',
            width: 100,
            align: 'center',
          },
          {
            title: '比赛标题',
            slot: 'title',
            align: 'center',
          },
          {
            title: '开始时间',
            key:'begin',
            align: 'center',
            width: 200,
          },
          {
            title: '比赛时长(小时)',
            slot: 'length',
            align: 'center',
            width: 200,
          },
          {
            title: '比赛类型',
            key: 'type',
            align: 'center',
            width: 120,
          },
          {
            title: '赛制',
            key: 'format',
            align: 'center',
            width: 120,
          },
          {
            title: '状态',
            slot: 'status',
            align: 'center',
            width: 120,
          },
          {
            title: '队伍总数',
            key: 'num',
            align: 'center',
            width: 120,
          }
        ],
        data:[],

        total: 0,
        pageSize: 20,
        //查询条件
        id:'',
        contestName:'',
        statusList: [
          {
            value: 'All',
            label: 'All'
          },
          {
            value: 'Pending',
            label: 'Pending'
          },
          {
            value: 'Running',
            label: 'Running'
          },
          {
            value: 'Ended',
            label: 'Ended'
          },
        ],
        select: "All",

        choose_id: 0,
        sloading: false,
        loaded:false,
      }
    },
    methods: {
      getRules() {
        let rules = {}
        this.id = this.id.trim()
        this.contestName = this.contestName.trim()
        if(this.id) rules.id = this.id
        if (this.contestName) rules.title = this.contestName
        if (this.select!='All') rules.status = this.select
        return rules
      },
      search() {
        this.sloading = true
        setTimeout(()=>{
          this.searchContests(1,this.pageSize,this.getRules())
        },600)
      },
      changePage(page) {
        let l = (page-1)*this.pageSize + 1
        let r = page*this.pageSize
        this.searchContests(l,r,this.getRules())
      },
      searchContests(l,r,rules) {
        let form = new FormData()
        form.set("l",l)
        form.set("r",r)
        form.append("rules",JSON.stringify(rules))
        this.$req.post("getContests",form)
          .then(res => {
            if(res.errno == undefined) {
              this.total = res.total
              this.data = res.data
              this.loaded = true
            }
            this.sloading = false
          })
      },
      enter() {
        this.$router.push({name:'contest',params:{'id':this.choose_id}})
      },
      check(pwd) {  //验证参赛密码
        this.$req.get('checkContestPassword',{'password':pwd,'id':this.choose_id})
          .then(res => {
            if(res.errno==undefined) {
              if (res.ok) this.enter();
            }
          })
      },

      forEnter(row) {
        this.choose_id = row.id
        if(row.type=='private') {
          if(!this.$store.state.user.is_login) {
            this.$notify("error", "请先登陆")
            return
          }
          this.$req.get('enterContest',{'id':row.id})
            .then(res => {
              if(res.errno == undefined) {
                if(res.ok) this.enter();
                else {
                  this.$q.dialog({
                    dark:true,
                    title: "请输入参赛码",
                    prompt: {
                      model:'',
                      type:'text'
                    },
                    cancel:true,
                    persistent:true
                  }).onOk(pwd => {
                    this.check(pwd)
                  })
                }
              }
            })
        } else {
          this.enter()
        }
      },
      rowClassName(row,index) {
        if(row.status=="Pending") return "pendingRow"
        else if(row.status=="Running") return "runningRow"
        return ""
      }
    },
    mounted() {
      this.searchContests(1,this.pageSize,{})
      this.loaded = true
    }
  }
</script>
<style>
  .contesttable .ivu-table-header th{
    background-color: #9C27B0;
    color: #fff;
  }
  .contesttable .ivu-table td{
    font-size: 16px;
  }
  .contesttable .ivu-table .pendingRow td{
    background-color: #FFFFE0;
  }
  .contesttable .ivu-table .runningRow td{
    background-color: yellow;
  }
</style>

<style scoped>

  .Pending {
    color: green;
  }
  .Running{
    color: red;
  }

  .Ended {
    color: navy;
  }
  .All{
    color:black;
  }
</style>
