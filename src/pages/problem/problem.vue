<template>
    <div v-if="loaded" class="row justify-center q-pa-md">
      <q-card style="width: 1200px;margin-left: 50px;" class="q-pa-md" >
          <problem-show :info="info" ></problem-show>
          <Code ref="codeRef" />
          <div>
            <q-btn rounded color="green" label="提 交" size="lg" @click="submit" :loading="running" style="width: 15rem">
              <template v-slot:loading>
                <q-spinner-hourglass class="on-left" />
                {{runMessage}}
              </template>
            </q-btn>
          </div>
      </q-card>
      <div class="q-ml-xl" style="width:300px;">
        <q-card class="q-pa-sm text-black" style="font-size: 1rem">
            <q-item >
                <q-item-section class="col-3"> 来 源 </q-item-section>
                <q-item-section style="color: orange"> {{this.info.source}} </q-item-section>
            </q-item>
            <q-item>
              <q-item-section class="col-3"> 通 过 </q-item-section>
              <q-item-section style="color: green"> {{this.info.accepted_count}} </q-item-section>
            </q-item>
            <q-item>
              <q-item-section class="col-3"> 提 交 </q-item-section>
              <q-item-section style="color: red"> {{this.info.all_count}} </q-item-section>
            </q-item>
            <q-item v-if="info.tags.length > 0">
              <q-item-section class="col-3">  标 签 </q-item-section>
              <q-item-section class="q-mr-md" v-if="info.tags.length > 0">
                 <q-toggle v-model="showTags" label="显示" />
              </q-item-section>
            </q-item>
            <div class="q-px-sm q-gutter-sm q-mt-sm q-mb-md" v-if="showTags">
              <span v-for="(tag,idx) in info.tags" :key="idx">
                <Tag  :color="tag.color" size="large" style="font-size: 15px"> {{tag.label}} </Tag>
              </span>
              <br>
            </div>

        </q-card>
        <q-card class="q-pa-md text-black q-mt-lg" style="font-size: 1.2rem" >
          <div>
            <router-link :to="{name:'discussProblem',params:{index:index},query:{title:info.title}}"> 相关讨论 <Icon type="ios-chatbubbles" size="24"/> </router-link>
            <router-link :to="{name:'solutions',params:{index:index},query:{title: info.title}}" style="margin-left: 50px"> 查看题解 <Icon type="ios-paper" size="24"/> </router-link>
          </div>
        </q-card>
        <q-card class="q-pa-sm text-black q-mt-lg" style="font-size: 1rem" >
          <q-item>
            <q-item-section> 我的提交 </q-item-section>
          </q-item>
            <div v-for="(s,idx) in history" :key="idx" class="q-mt-sm q-ml-md" v-if="idx<4 || showAllSub">
              <div>
                  {{s.created_at}}
              </div>
              <div>
                <q-btn flat :class="s.status" :label="s.status" dense  no-caps @click="showCode(s.id)" size="16px"/>
              </div>
            </div>

            <q-toggle v-model="showAllSub" label="展示全部" class="q-mb-md" v-if="history.length>4"/>
        </q-card>
      </div>
    </div>
</template>

<script>
    import problemShow from "../../components/problemShow";
    import Code from "../../components/Code";
    export default {
        name: "problem",
        components:{problemShow,Code},
        data() {
          return {
              loaded:false,
              info:null,
              index :"",
              wants: ["index","source","title","background_html","statement_html","input_html","output_html","examples_in","examples_out","hint_html","time_limit","memory_limit","accepted_count","all_count","tags"],
              running:false,
              runMessage:"",
              history :[],
              showAllSub:false,
              showTags:false,
          }
        },
        methods:{
            getProblem() {
                let form = new FormData()
                form.set("index",this.index)
                form.set("wants",JSON.stringify(this.wants))
                this.$req.post("getProblemAsWants",form)
                .then(res=>{
                  if(res.errno==undefined) {
                      this.info = res.data
                      this.info.examples_in = JSON.parse(this.info.examples_in)
                      this.info.examples_out = JSON.parse(this.info.examples_out)
                      this.info.all_count = parseInt(this.info.all_count)
                      this.info.accepted_count = parseInt(this.info.accepted_count)
                      if (this.info.tags=="") this.info.tags=[]
                      else this.info.tags = JSON.parse(this.info.tags)
                      this.loaded = true
                      this.getSubmissionHistory()
                  }
                })
            },
            getSubmissionHistory() {
                this.$req.get("getSubmissionHistory",{"index":this.index})
                .then(res=>{
                    if(res.errno==undefined) {
                      this.history = res.history
                      this.$refs.codeRef.code = res.code
                      this.$refs.codeRef.lang = res.lang
                    }
                })
            },
            setTimer(id) {
              this.timer = setInterval(()=>{
                this.$req.get('getOneSubmissionBase',{"id":id})
                  .then(res => {
                    if(res.errno==undefined) {
                      res = res.data
                      if(res.status!="Queueing" && res.status!="Running")  {
                        this.clearTimer()
                        this.running = false
                        this.info.all_count += 1
                        let msg = "恭喜你,你的代码通过了此题!!!"
                        if (res.status!="Accepted") msg = "很遗憾,你的代码没有通过此题";else this.info.accepted_count += 1
                        this.$q.dialog({
                          dark: true,
                          title:msg,
                        })
                        this.history.unshift(res)
                      }
                    } else {
                      this.clearTimer()
                      this.running = false
                    }
                  })
              }, 1500)
            },
            clearTimer() {
              clearInterval(this.timer)
              this.timer = null
            },
            submit() {
              let code = this.$refs.codeRef.code
              if(code.length <= 10) {
                this.$notify("error","代码太短")
                return
              }
              this.running = true
              this.runMessage = "提交中..."
              let form = new FormData()
              form.set("code",code)
              form.set("lang",this.$refs.codeRef.lang)
              form.set("index",this.index)
              this.$req.post("submitCode",form)
                .then(res => {
                  if(res.errno == undefined) {
                    setTimeout(()=>{
                      this.runMessage = "测评中..."
                      this.setTimer(res.id)
                    },1000)
                  } else {
                    this.running = false
                  }
                })
            },
          showCode(id) {
              let routeData = this.$router.resolve({ name: 'code', params: {  id: id } });
              window.open(routeData.href, '_blank');
            },
        },
      computed: {
        contentStyle () {
          return {
            backgroundColor: 'rgba(0,0,0,0.02)',
            color: '#555'
          }
        },

        contentActiveStyle () {
          return {
            backgroundColor: '#eee',
            color: 'black'
          }
        },

        thumbStyle () {
          return {
            right: '2px',
            borderRadius: '5px',
            backgroundColor: '#027be3',
            width: '5px',
            opacity: 0.75
          }
        }
      },
        mounted() {
          this.index = this.$route.params.index
          if (this.index == undefined) {
            this.$router.push({name: 'problemset'})
          } else {
            setTimeout(this.getProblem(),500)
          }
        }
    }
</script>

<style scoped>

</style>
