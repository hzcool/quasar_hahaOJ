<template>
  <div>
    <div class="q-pa-md row justify-center" v-if="loaded">
      <div style="width: 1200px;" v-if="post.index" class="text-h4 text-black">
        {{post.index}} <span class="text-red q-ml-md" > {{post.title}}</span>
      </div>
      <q-card  flat bordered style="width: 1200px" class="q-mt-md">
        <q-card-section>
          <q-item>
            <q-item-section class="col-2">
              <q-item-label>
                <q-chip>
                  <q-avatar size="40px"> <img :src="post.avatar"> </q-avatar>
                  {{post.author}}
                </q-chip>
              </q-item-label>
            </q-item-section>
            <q-item-section class="col-2">
              <q-item-label caption> {{post.created_at}} </q-item-label>
            </q-item-section>
            <q-item-section>
              <q-item-label class="text-orange" v-if="post.updated_at"> 修改于 {{post.updated_at}} </q-item-label>
            </q-item-section>
            <q-item-section class="float-right col-1">
              总共{{post.reply_count}}条回复
            </q-item-section>
          </q-item>
        </q-card-section>

        <q-card-section>
          <div class="text-h4 q-mb-xs text-black">
            {{post.head}}
            <Tag v-for="(tag,idx) in post.tags" :key="idx" :color="tag.color"> {{tag.label}} </Tag>
          </div>
          <div v-html="post.html_content" class="q-mt-md" style="font-size: 20px"> </div>
        </q-card-section>

        <q-card-section>
          <span>  <q-btn flat :color="post.good_color" icon="thumb_up" dense @click="for_good_post"/> {{post.good_count}} </span>
          <span class="q-ml-lg"> <q-btn flat :color="post.bad_color" icon="thumb_down" @click="for_bad_post" dense/>  {{post.bad_count}} </span>
        </q-card-section>
      </q-card>

      <div class="q-mt-lg">
        <div v-if="replies.length<=0">
          <q-card flat bordered style="width: 1200px;" >
            <q-card-actions class="row justify-center" >
              <q-img src="https://www.helloimg.com/images/2020/07/27/no_solution3604bbb1a4f6a3a7.jpg"   style="width:500px;"/>
            </q-card-actions>
            <q-card-actions class="row justify-center">
              <div class="text-h4"> 暂时没有回复 </div>
            </q-card-actions>
          </q-card>
        </div>

        <div style="width: 1200px;" class="q-gutter-md" v-else>
          <div class="text-h4 text-black"> 回复 : </div>
          <q-card flat bordered v-for="(item,idx) in replies" :key="idx" class="q-pa-sm">
            <div class="row" style="width:100%">
              <div style="width: 400px;">
                <q-chip>
                  <q-avatar size="30px"> <img :src="item.avatar" /> </q-avatar>
                  {{item.author}}
                </q-chip>
                <span  v-if="item.author==post.author" style="color: orange">(作者)</span>
                <Time :time="(new Date(item.created_at)).getTime()" hash="#hash" class="q-ml-md"/>
              </div>

              <div class="row justify-end" style="width: 760px">
                <Button type="text" @click="showCommentModal(item)" >
                  <Icon type="ios-chatbubbles-outline" size="18"/>
                  <span style="font-size: 15px" v-if="item.comment_count>0"> {{item.comment_count}} 条评论 </span>
                  <span style="font-size: 15px" v-else> 添加评论 </span>
                </Button>
              </div>
            </div>
            <div v-html="item.html_content" class="text-black q-ma-md" style="font-size: 18px"> </div>
          </q-card>
          <Page
            :current.sync="current"
            :total = "post.reply_count"
            :page-size="page_size"
            @on-change="getReplies"
            class="float-right"
          >
          </Page>
        </div>
      </div>


      <div class="q-mt-md" style="width: 1200px;font-size: 20px;">
        <Button type="primary" size="large" class="float-right" @click="forReply=true"> 我要回复 </Button>
      </div>

    </div>
    <Modal
      v-model="forComment"
      :mask="true"
      width="800px"
    >
      <div slot="header" class="text-teal" style="font-size:20px">
        <q-icon name="send" /> <span class="q-ml-md">{{choose_reply.author}} <span v-if="choose_reply.author==post.author" style="color: orange">(作者)</span></span>
      </div>

      <div>
        <q-scroll-area style="height: 400px;" v-if="comments.length>0">
          <div class="row" v-for="(item,idx) in comments" :key="idx">
            <q-separator inset class="q-my-md" v-if="idx!=0"/>
            <div style="width:60px">
              <div>
                <q-avatar size="50px"> <img :src="item.avatar"> </q-avatar>
              </div>
            </div>
            <div style="width:700px">
              <div style="font-size: 18px">
                <span class="text-black" > {{item.author}}<span v-if="item.author==post.author" style="color: orange"> (作者) </span> </span>
                <span v-if="item.to!=''" class="q-ml-md"> <q-icon name="send" /> {{item.to}}<span v-if="item.to==post.author" style="color: orange"> (作者) </span> </span>
                <Time :time="(new Date(item.created_at)).getTime()" class="q-ml-lg"/>
                <Button type="text" @click="commentTo=item.author"> 回复</Button>
                <div v-html="item.content"  style="word-break:break-all;color: black;margin-top: 10px" > </div>
              </div>
            </div>
          </div>
        </q-scroll-area>
        <div v-if="comments.length==0">
          暂无评论
        </div>
      </div>
      <div slot="footer" style="text-align:left">
        <div v-if="commentTo!=''" class="text-red" style="font-size: 16px">
          <Tag type="border" closable color="magenta" @on-close="commentTo=''"> @{{commentTo}}</Tag>
        </div>
        <q-editor v-model="text" min-height="4rem"/>
        <Button type="primary"  @click="send_one_comment" class="q-mt-md" > 发表评论 </Button>
      </div>
    </Modal>

    <Modal  v-model="forReply" width="1300px">
      <div slot="header" class="text-teal" style="font-size:20px">
        <q-icon name="send" /> <span class="q-ml-md">{{post.author}} <span style="color: orange">(作者)</span></span>
      </div>
      <mavon-editor v-model="editor" ref="editor" :subfield="false" defaultOpen @imgAdd="imgAdd"/>
      <div slot="footer">
        <Button type="text" @click="forReply=false"> 取消</Button>
        <Button type="primary" @click="sendOneReply" style="margin-left: 10px"> 回复 </Button>
      </div>
    </Modal>

  </div>
</template>

<script>

  export default {
    name: "showPost",
    props:['post_id'],
    data () {
      return {
        editor:"",
        loaded:false,
        post : { author:"",created_at:"",reply_count:0,tags:[],head:"",html_content:"",good_count:0,bad_count:0 },
        replies : [],
        current : 1,
        total_replies: 0,
        page_size: 20,

        forComment:false,
        choose_reply:{author:""},
        commentTo:"",
        replyID:0,
        text:"",
        comments :[],

        forReply:false,

        contest_id:0,
        label:"",
      }
    },

    methods: {
      for_good_post() {
        let attitude = 1
        if (this.post.for_post == 1) {
          attitude = 0
        }
        this.$req.get("addPostAttitude", {"post_id": this.post_id, "attitude": attitude})
          .then(res => {
            if (res.errno == undefined) {
              this.post.for_post = attitude
              this.post.good_color = attitude == 0 ? "black" : "blue"
              this.post.bad_color = "black"
              this.post.good_count = res.good_count
              this.post.bad_count = res.bad_count
            }
          })
      },
      for_bad_post() {
        let attitude = 2
        if (this.post.for_post == 2) {
          attitude = 0
        }
        this.$req.get("addPostAttitude", {"post_id": this.post_id, "attitude": attitude})
          .then(res => {
            if (res.errno == undefined) {
              this.post.for_post = attitude
              this.post.good_color = "black"
              this.post.bad_color = attitude == 0 ? "black" : "blue"
              this.post.good_count = res.good_count
              this.post.bad_count = res.bad_count
            }
          })
      },

      send_one_comment(to="") {
        if (!this.$store.state.user.is_login) {
          this.$notify("error","未登陆")
          return
        }
        let c = this.text.trim()
        if (c.length <= 0 ) {
          this.$notify("error","内容不能为空")
          return;
        }
        let form = new FormData()
        form.set("content",c)
        form.set("post_id",this.post_id)
        form.set("reply_id",this.choose_reply.reply_id),
          form.set("to",this.commentTo)
        this.$req.post("sendOneComment",form)
          .then(res=>{
            if (res.errno == undefined) {
              this.comments.push(res.comment)
              let num = this.choose_reply.comment_count + 1
              this.$set(this.choose_reply, 'comment_count',num)
              this.text = ""
              this.commentTo = ""
              this.$notify("success","发送成功")
            }
          })
      },
      sendOneReply() {
        if (!this.$store.state.user.is_login) {
          this.$notify("error","未登陆")
          return
        }
        if (this.editor.trim().length <= 0 ) {
          this.$notify("error","内容不能为空")
          return;
        }
        let c = this.$refs.editor.d_render
        let form = new FormData()
        form.set("editor",c)
        form.set("post_id",this.post_id)
        this.$req.post("sendOneReply",form)
          .then(res=>{
            if (res.errno == undefined) {
              this.current = Math.ceil((this.total_replies+1)/this.page_size)
              this.getReplies()
              this.forReply = false
              this.editor =  ""
              this.$notify("success","发送成功")
            }
          })
      },

      showCommentModal(reply) {
        this.choose_reply = reply
        this.comments = []
        this.commentTo = ""
        if (reply.comment_count>0) {
          this.$req.get("getComments",{"post_id":this.post_id,"reply_id":this.choose_reply.reply_id})
            .then(res=> {
              if(res.errno==undefined) {
                this.comments = res.comments
                this.forComment = true
              }
            })
        } else {
          this.forComment = true
        }
      },
      getReplies() {
        let l = (this.current-1)*this.page_size + 1
        let r = l + this.page_size-1
        this.$req.get("getReplies",{"post_id": this.post_id,"l":l,"r":r})
          .then(res=>{
            if (res.errno == undefined) {
              this.total_replies = res.total
              this.post.reply_count = res.total
              this.replies = res.replies
            }
          })
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
        if (this.$route.params.id != undefined) {
            this.contest_id = this.$route.params.id
            this.label = this.$route.params.label
        }
        setTimeout(()=>{


          if (this.post_id != 0 ) {
            this.$req.get("getPost", {"post_id": this.post_id})
              .then(res => {
                if (res.errno == undefined) {
                  this.post = res.post
                  this.post.tags = JSON.parse(this.post.tags)
                  this.post.good_color = "black"
                  this.post.bad_color = "black"
                  if (this.post.for_post == 1) {
                    this.post.good_color = "blue"
                  } else if (this.post.for_post == 2) {
                    this.post.bad_color = "blue"
                  }
                  this.getReplies()
                  if (this.contest_id!=0) this.post.index = this.label
                  this.loaded = true
                }
              })
          }
        },300)

    }
  }
</script>

<style scoped>

</style>
