<template>
    <div class="row justify-center" v-if="loaded">


        <div style="width: 1600px;margin-top:30px" class="row justify-between">
            <div class="text-black text-h4" style="width: 1000px">
              {{index}} <span class="text-red"> {{title}} </span>
            </div>

            <div style="width: 100%" class="row justify-between q-mt-md">
              <div style="width: 1250px">
                <q-card flat class="q-pa-md ">
                  <div v-if="total==0" >
                    <div class="text-center">
                      <q-img src="https://www.helloimg.com/images/2020/07/27/no_solution3604bbb1a4f6a3a7.jpg"   style="width: 400px; height: 500px;"/>
                    </div>
                    <div class="text-center text-h4 text-black">
                      暂无题解
                    </div>
                  </div>
                  <div v-else>
                    <div class="text-h5 text-black" >
                      总共 {{total}} 份题解
                    </div>
                    <div v-for="(item,idx) in solution_list" :key="idx">
                      <q-separator class="q-my-md"/>
                      <q-item>
                        <q-item-section top avatar>
                          <q-avatar size="50px"> <img :src="item.avatar"> </q-avatar>
                        </q-item-section>
                        <q-item-section >
                          <q-item-label>
                            <span class="text-black" style="font-size: 20px"> {{item.author}} </span>
                          </q-item-label>
                          <q-item-label caption>
                            发表时间 <Time :time="(new Date(item.created_at)).getTime()"  class="q-ml-sm"/>
                          </q-item-label>
                        </q-item-section>
                        <q-item-section class="col-2">
                         <q-item-label><Tag v-for="(tag,idx) in item.tags" :key="idx" :color="tag.color"> {{tag.label}} </Tag></q-item-label>
                        </q-item-section >
                        <q-item-section class="col-5">
                          <q-item-label class="text-orange" v-if="item.updated_at"> 修改于 <Time :time="(new Date(item.updated_at)).getTime()"  class="q-ml-sm"/> </q-item-label>
                        </q-item-section >
                        <q-item-section class=" col-2" >
                          <div style="text-align: right">
                            <Button type="text" @click="showCommentModal(item)" >
                              <Icon type="ios-chatbubbles-outline" size="18"/>
                              <span style="font-size: 15px" v-if="item.reply_count>0"> {{item.reply_count}} 条评论 </span>
                              <span style="font-size: 15px" v-else> 添加评论 </span>
                            </Button>
                          </div>
                        </q-item-section>
                      </q-item>
                      <q-card flat bordered class="q-pa-md">
                        <div v-html="item.content_html" style="font-size: 20px" class="text-black">  </div>
                      </q-card>

                      <div class="q-px-sm q-mt-md">
                        <span>  <q-btn flat :color="item.good_color" icon="thumb_up" dense @click="for_good_post(item)"/> {{item.good_count}} </span>
                        <span class="q-ml-md">  <q-btn flat :color="item.bad_color" icon="thumb_down" dense @click="for_bad_post(item)"/> {{item.bad_count}} </span>
                      </div>

                    </div>
                    <Page
                      :current.sync="current"
                      :total = "total"
                      :page-size="page_size"
                      @on-change="get_solutions"
                      class="float-right"
                      style="margin-top: 30px"
                    >
                    </Page>
                  </div>
                </q-card>
              </div>

              <div style="width: 300px">
                <q-card flat class="q-pa-md">
                  <div class="row justify-between">
                    <Button type="primary" size="large" @click="showNewSolutionModal"> 发表题解 </Button>
                    <Button type="error" size="large"  @click="$router.push({name:'problem',params:{index:index}})"> 返回题目 </Button>
                  </div>
                </q-card>
                <q-card flat class="q-pa-md q-mt-lg">
                  <div class="text-h6 text-black">
                    只作参考，不要作弊
                  </div>
                </q-card>
              </div>
            </div>


        </div>

      <Modal
        width="1200px"
        v-model="newSolutionModal"
        :closable="false"
        :mask-closable="false"
      >
        <div slot="header" class="text-h6">
            发表题解
        </div>
        <div class="text-black q-mt-md text-h6">
          <div class="q-mt-md">
            <Tags :prop_tags="prop_tags" ref="tags"/>
          </div>
          <q-separator class="q-mt-md"/>
          <div class="q-mt-md">
            <mavon-editor v-model="value" ref="editor" defaultOpen="edit" @imgAdd="imgAdd"/>
          </div>
        </div>
        <div slot="footer">
          <Button type="text" @click="newSolutionModal=false"> 取消 </Button>
          <Button type="primary" @click="submit"> 提交 </Button>
        </div>
      </Modal>

      <Modal
        v-model="forComment"
        :mask="true"
        width="800px"
      >
        <div slot="header" class="text-teal" style="font-size:20px">
          <q-icon name="send" /> <span class="q-ml-md">{{choose_post.author}} </span>
        </div>

          <div>
            <q-scroll-area style="height: 400px;" v-if="comments.length>0">
              <div class="row" v-for="(item,idx) in comments" :key="idx">
                <q-separator inset class="q-my-lg" v-if="idx!=0"/>
                <div style="width:60px">
                  <div>
                    <q-avatar size="50px"> <img :src="item.avatar"> </q-avatar>
                  </div>
                </div>
                <div style="width:700px">
                  <div style="font-size: 18px">
                    <span class="text-black" > {{item.author}}<span v-if="item.author==choose_post.author" style="color: orange"> (作者) </span> </span>
                    <span v-if="item.to!=''" class="q-ml-md"> <q-icon name="send" /> {{item.to}}<span v-if="item.to==choose_post.author" style="color: orange"> (作者) </span> </span>
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
    </div>
</template>

<script>
  import Tags from "../../components/Tags";
    export default {

        name: "solutionIndex",
        components:{Tags},
        data() {
          return {
              solution_list:[
                {
                    avatar:'1.jpeg',
                    author:'',
                    created_at: "",
                    updated_at: "",
                    content_html: "",
                    reply_count:2,
                    good_count:0,
                    bad_count:0,
                },
              ],
              loaded:false,
              total: 0,

              page_size: 10,
              current:1,

              index:'',
              title:'',
              newSolutionModal:false,
              prop_tags:[],
              value:"",

              forComment:false,
              choose_post:{author:""},
              commentTo:"",
              text:"",
              comments :[],

          }
        },
        methods:{

          for_good_post(item) {
            let attitude = 1
            if (item.for_post == 1) {
              attitude = 0
            }
            this.$req.get("addPostAttitude", {"post_id": item.post_id, "attitude": attitude})
              .then(res => {
                if (res.errno == undefined) {
                  item.for_post = attitude
                  item.good_color = attitude == 0 ? "" : "blue"
                  item.bad_color = ""
                  item.good_count = res.good_count
                  item.bad_count = res.bad_count
                }
              })
          },
          for_bad_post(item) {
            let attitude = 2
            if (item.for_post == 2) {
              attitude = 0
            }
            this.$req.get("addPostAttitude", {"post_id": item.post_id, "attitude": attitude})
              .then(res => {
                if (res.errno == undefined) {
                  item.for_post = attitude
                  item.good_color = ""
                  item.bad_color = attitude == 0 ? "" : "blue"
                  item.good_count = res.good_count
                  item.bad_count = res.bad_count
                }
              })
          },

          showCommentModal(item) {
            this.choose_post = item
            this.comments = []
            this.commentTo = ""
            if (item.reply_count > 0) {
              this.$req.get("getComments",{"post_id":item.post_id,"reply_id":0})
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
            form.set("post_id",this.choose_post.post_id)
            form.set("reply_id",0),
              form.set("to",this.commentTo)
            this.$req.post("sendOneComment",form)
              .then(res=>{
                if (res.errno == undefined) {
                  this.comments.push(res.comment)
                  let num = this.choose_post.reply_count + 1
                  this.$set(this.choose_post, 'reply_count',num)
                  this.text = ""
                  this.commentTo = ""
                  this.$notify("success","发送成功")
                }
              })
          },

          showNewSolutionModal() {
              this.newSolutionModal = true
          },
          submit() {
            if (!this.$store.state.user.is_login) {
              this.$notify("error","请先登陆")
              return
            }
            if (this.value.trim() == "") {
              this.$notify("error","请输入内容")
              return
            }
            let form = new FormData()
            form.set("kind","solution")
            form.set("problem",this.index)
            form.set("content",this.value)
            form.set("html_content",this.$refs.editor.d_render)
            form.set("tags",JSON.stringify(this.$refs.tags.get_select_tags()))
            this.$req.post("newPost",form)
              .then(res => {
                if(res.errno == undefined) {
                  this.$notify("success","提交成功")
                  this.value=""
                  this.newSolutionModal = false
                  this.current = 1
                  this.get_solutions()
                }
              })
          },
          get_solutions() {
            let l = this.page_size*(this.current-1) + 1
            let r = l + this.page_size -1
            this.$req.get("getPostList",{"kind":"solution","l":l,"r":r,"index":this.index})
              .then(res=>{
                if(res.errno == undefined) {
                  this.solution_list = res.data
                  this.total = res.total
                  for(let item of  this.solution_list) {
                    if(item.tags!="") item.tags = JSON.parse(item.tags)
                    else item.tags = []
                    if (item.for_post == 1) {
                        item.good_color = "blue"
                    } else if (item.for_post == 2) {
                        item.bad_color = "blue"
                    }
                  }
                  this.loaded = true
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
            this.index = this.$route.params.index
            this.title = this.$route.query.title
            if (this.index==undefined) {
              this.$router.push({name:'home'})
            } else {
              setTimeout(()=>{
                this.get_solutions()
                if (this.title==undefined) {
                  this.$req.get("getProblemTitle",{'index':this.index})
                  .then(res=>{
                      if (res.errno == undefined) {
                          this.title = res.title
                      }
                  })
                }
              },300)
            }
        }
    }
</script>

<style scoped>

</style>
