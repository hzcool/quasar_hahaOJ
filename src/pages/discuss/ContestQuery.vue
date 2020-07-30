<template>
  <div>

    <div class="row justify-center q-mt-lg" >
      <div  style="width: 1600px" class="justify-between row">
        <div class="text-h4 text-black"> {{label}}  <span class="text-red q-ml-md"> {{title}} </span></div>
      </div>

      <div style="width: 1600px" class="justify-between row q-mt-lg">
        <div style="width:1100px">
          <GlobalPostCard :post_list="discuss_list" @getPosts="get_discuss" @enter="enter"/>
        </div>
        <div style="width: 350px">
          <q-card flat class="q-pa-lg">
            <Button type="primary" size="large" @click="toNewDiscuss">新建提问</Button>
            <Button type="error" size="large" @click="$router.push({name:'contest',params:{'id':contest_id}})" style="margin-left: 50px">返回比赛</Button>
          </q-card>
        </div>
      </div>
    </div>

    <Modal
      width="1200px"
      v-model="newDiscussModal"
      title="提问"
      :closable="false"
      :mask-closable="false"
    >
      <div class="text-black q-mt-md text-h6">
        <div class="q-gutter-md row items-start">
          <div>标 题</div>
          <q-input v-model="head" dense outlined style="width: 500px"
                   lazy-rules
                   :rules="[
                   val => val && val.length > 0 || '请输入标题',
                   val => val.length <= 40 || '标题太长',
                ]"
          />
        </div>
        <div class="q-mt-md">
          <Tags :prop_tags="prop_tags" ref="tags"/>
        </div>
        <q-separator class="q-mt-md"/>
        <div class="q-mt-md">
          <mavon-editor v-model="value" ref="editor" defaultOpen="edit" @imgAdd="imgAdd"/>
        </div>
      </div>
      <div slot="footer">
        <Button type="text" @click="newDiscussModal=false"> 取消 </Button>
        <Button type="primary" @click="submit"> 提交 </Button>
      </div>
    </Modal>
  </div>
</template>

<script>
  import Tags from "../../components/Tags";
  import GlobalPostCard from "../../components/GlobalPostCard";
  export default {
    name: "problemDiscussion",
    components:{Tags,GlobalPostCard},
    data() {
      return {
        label:'',
        title:'',
        contest_id : 0,
        index:"",

        discuss_list:[],
        newDiscussModal:false,
        head:"",
        prop_tags:[],
        value:"",
      }
    },
    methods:{
      submit() {
        if (!this.$store.state.user.is_login) {
          this.$notify("error","请先登陆")
          return
        }
        this.head = this.head.trim()
        if (this.head=="") {
          this.$notify("error","请输入标题")
          return
        }
        if (this.value.trim() == "") {
          this.$notify("error","请输入内容")
          return
        }
        let form = new FormData()
        form.set("head",this.head)
        form.set("kind","puzzle")
        form.set("problem",this.index)
        form.set("content",this.value)
        form.set("html_content",this.$refs.editor.d_render)
        form.set("tags",JSON.stringify(this.$refs.tags.get_select_tags()))
        this.$req.post("newPost",form)
          .then(res => {
            if(res.errno == undefined) {
              this.$notify("success","提交成功")
              this.value=this.head=""
              this.newDiscussModal = false
              this.get_discuss(1,10)
            }
          })
      },
      toNewDiscuss() {
        this.newDiscussModal = true
      },
      get_discuss(l,r) {
        this.$req.get("getContestDiscussList",{"kind":"puzzle","l":l,"r":r,"index":this.index,"id":this.contest_id})
          .then(res=>{
            if(res.errno == undefined) {
              this.discuss_list = res.data
              for(let item of  this.discuss_list) {
                if(item.tags!="") item.tags = JSON.parse(item.tags)
                else item.tags = []
              }
            }
          })
      },
      enter(discuss) {
        this.$router.push({name:'oneContestQuery',params:{'puzzle_id':discuss.post_id,"id":this.contest_id}})
      },
      imgAdd(pos,$file) {
        let form = new FormData()
        form.set("file",$file)
        this.$req.post("addImg",form)
          .then(res=> {
            this.$refs.editor.$img2Url(pos,res.url)
          })
      },
    },
    mounted() {
      if (this.$route.params.id == undefined || this.$route.params.label==undefined) this.$router.push({name:"discussions"})
      else {
        this.contest_id = this.$route.params.id
        this.label = this.$route.params.label
        this.$req.get("getCproblemIndexAndTitle",{"id":this.contest_id,"label":this.label})
        .then( res=>{
            if (res.errno == undefined) {
                  this.index = res.index
                  this.title = res.title
                this.get_discuss(1,10)
            }
        })
      }
    }
  }
</script>

<style scoped>

</style>
