<template>
  <div class="row justify-center q-pa-md"  v-if="loaded">
    <q-card style="width: 1450px; margin-top:50px;" >
      <q-item>
        <q-item-section top avatar>
          <q-avatar color="primary" text-color="white"  size="120px">
            <img :src="info.avatar" />
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label class="text-blue text-h4">{{info.username}}</q-item-label>
          <q-item-label  lines="2" class="text-grey"> {{info.description}}</q-item-label>
        </q-item-section>

        <q-item-section side >
          <q-card  style="width: 800px;" flat>
            <q-tabs
              v-model="tab"
              class="text-black"
              active-color="primary"
              indicator-color="primary"
              align="justify"
              narrow-indicator
            >
              <q-tab name="info"> <span class="text-h6">基本信息</span> </q-tab>
              <q-tab name="practice"> <span class="text-h6">练习记录</span> </q-tab>
              <q-tab name="post"> <span class="text-h6">文章概况</span> </q-tab>
            </q-tabs>
          </q-card>
        </q-item-section>
      </q-item>
    </q-card>

    <div style="width: 1500px;margin-top: 50px;"  >
      <q-tab-panels v-model="tab">

        <q-tab-panel name="info" style="background:  #f1f3f6">
          <div class="row justify-between">
            <div style="width: 800px">
              <q-card class="q-pa-md" >
                <q-item >
                  <q-item-section  class="text-black text-h6" style="font-size: 20px">
                    <q-item-label> 个人简介 </q-item-label>
                  </q-item-section>
                </q-item>
                <q-item  style="font-size: 18px;" >
                  {{info.description}}
                </q-item>

              </q-card>
            </div>

            <div style="width: 500px;" >
              <q-card class="q-pa-md text-black" style="font-size: 18px;">
                <q-item >
                  <q-item-section class="col-4"> 注册时间 </q-item-section>
                  <q-item-section style="color: orange"> {{info.created_at}} </q-item-section>
                </q-item>
                <q-item >
                  <q-item-section class="col-4"> 用户身份 </q-item-section>
                  <q-item-section style="color: red"> {{status}} </q-item-section>
                </q-item>
                <q-item >
                  <q-item-section class="col-4"> 学 校 </q-item-section>
                  <q-item-section style="color: red"> {{info.school}} </q-item-section>
                </q-item>
                <q-item >
                  <q-item-section class="col-4"> 邮 箱 </q-item-section>
                  <q-item-section style="color: red"> {{info.email}} </q-item-section>
                </q-item>
              </q-card>
            </div>
          </div>
        </q-tab-panel>

        <q-tab-panel name="practice" style="background:  #f1f3f6">
          <div class="row justify-between">
            <div class="q-gutter-lg col-6">
              <q-card class="q-pa-md">
                <div class="text-black text-h6"> 尝试过并未解决的题 <span style="color: #C10015">{{info.failed.length}}</span> 道</div>
                <div class="row justify-start q-mt-md">
                  <div v-for="(item,idx) in info.failed" :key="idx" class="q-ml-lg" style="font-size: 20px">
                    <router-link  :to="{name:'problem',params: {'index':item}}">
                      [{{item}}]
                    </router-link>
                  </div>
                </div>
              </q-card>
              <q-card class="q-pa-md">
                <div class="text-black text-h6"> 已经解决的题 <span style="color: #C10015">{{info.passed.length}}</span> 道</div>
                <div class="row justify-start q-mt-md">
                  <div v-for="(item,idx) in info.passed" :key="idx" class="q-ml-lg" style="font-size: 20px">
                    <router-link  :to="{name:'problem',params: {'index':item}}">
                      [{{item}}]
                    </router-link>
                  </div>
                </div>
              </q-card>
            </div>

            <q-card class="col-5 q-pa-md" >
              <v-chart :options="myChart"/>
            </q-card>
          </div>
        </q-tab-panel>

        <q-tab-panel name="post" style="background:  #f1f3f6">
          <div class="row justify-center">
            <q-card class="col-12 row justify-center q-gutter-md q-mt-lg" >
              <div class="col-2 text-center q-gutter-md" style="height: 150px">
                <svg t="1592990579801" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="16405" width="32" height="32"><path d="M854.44 252.05L705.1 105.18A32.043 32.043 0 0 0 682.66 96H192c-17.67 0-32 14.33-32 32v768c0 17.67 14.33 32 32 32h640c17.67 0 32-14.33 32-32V274.87c0-8.58-3.45-16.8-9.56-22.82zM800 864H224V160h383.86l0.11 128.06c0.03 35.25 28.73 63.94 64 63.94H800v512zM671.97 288l-0.1-125.73L799.72 288H671.97z" p-id="16406" fill="#d4237a"></path><path d="M320 416h192c17.67 0 32-14.33 32-32s-14.33-32-32-32H320c-17.67 0-32 14.33-32 32s14.33 32 32 32zM288 544c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32s-14.33-32-32-32H320c-17.67 0-32 14.33-32 32zM704 672H320c-17.67 0-32 14.33-32 32s14.33 32 32 32h384c17.67 0 32-14.33 32-32s-14.33-32-32-32z" p-id="16407" fill="#d4237a"></path></svg>
                <div class="text-black" style="font-size: 15px"> 博客数量 </div>
                <div > {{blog_count}} </div>
              </div>
              <div class="col-2 text-center q-gutter-md" style="height: 150px">
                <svg t="1592991068491" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="20582" width="32" height="32"><path d="M512 924.66C284.46 924.66 99.34 739.54 99.34 512S284.46 99.34 512 99.34 924.66 284.46 924.66 512 739.54 924.66 512 924.66z m0-788.36c-207.16 0-375.7 168.54-375.7 375.7S304.84 887.7 512 887.7 887.7 719.16 887.7 512 719.16 136.3 512 136.3z" fill="#d81e06" p-id="20583"></path><path d="M510.35 548.85a18.48 18.48 0 0 1 0-37 119.7 119.7 0 1 0-119.72-119.7 18.48 18.48 0 1 1-37 0c0-86.38 70.29-156.66 156.67-156.66S667 305.8 667 392.19s-70.26 156.66-156.65 156.66zM510.35 799.73a67.46 67.46 0 1 1 67.46-67.46 67.54 67.54 0 0 1-67.46 67.46z m0-98a30.51 30.51 0 1 0 30.51 30.51 30.55 30.55 0 0 0-30.51-30.48z" fill="#d81e06" p-id="20584"></path><path d="M510.35 635.08a18.48 18.48 0 0 1-18.48-18.48v-78.83a18.48 18.48 0 1 1 37 0v78.84a18.48 18.48 0 0 1-18.52 18.47z" fill="#d81e06" p-id="20585"></path></svg>
                <div class="text-black" style="font-size: 15px"> 提问数量 </div>
                <div > {{puzzle_count}} </div>
              </div>
              <div class="col-2 text-center q-gutter-md" style="height: 150px">
                <svg t="1592990974303" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="19487" width="32" height="32"><path d="M631.466667 870.4c0 12.561067-10.194489 22.755556-22.755556 22.755556l-182.044444 0c-12.561067 0-22.755556-10.194489-22.755556-22.755556s10.194489-22.755556 22.755556-22.755556l182.044444 0C621.272178 847.644444 631.466667 857.838933 631.466667 870.4zM608.711111 904.533333l-182.044444 0c-14.973156 0-26.567111 14.461156-21.583644 30.173867 3.003733 9.477689 12.5952 15.337244 22.539378 15.337244l0.341333 0c13.141333 0 25.156267 7.429689 31.038578 19.182933l0.238933 0.477867C467.171556 985.543111 483.362133 995.555556 501.077333 995.555556l33.223111 0c17.7152 0 33.905778-10.012444 41.824711-25.850311l0.238933-0.477867c5.882311-11.753244 17.897244-19.182933 31.038578-19.182933l0.341333 0c9.944178 0 19.535644-5.859556 22.539378-15.337244C635.278222 918.994489 623.684267 904.533333 608.711111 904.533333zM517.688889 176.355556c12.561067 0 22.755556-10.194489 22.755556-22.755556l0-91.022222c0-12.561067-10.194489-22.755556-22.755556-22.755556s-22.755556 10.194489-22.755556 22.755556l0 91.022222C494.933333 166.161067 505.127822 176.355556 517.688889 176.355556zM276.332089 262.997333c4.437333 4.448711 10.262756 6.667378 16.088178 6.667378s11.650844-2.218667 16.088178-6.667378c8.886044-8.886044 8.886044-23.290311 0-32.176356l-64.364089-64.364089c-8.874667-8.886044-23.301689-8.886044-32.176356 0-8.886044 8.886044-8.886044 23.290311 0 32.176356L276.332089 262.997333zM221.866667 472.177778c0-12.561067-10.194489-22.755556-22.755556-22.755556l-91.022222 0c-12.561067 0-22.755556 10.194489-22.755556 22.755556s10.194489 22.755556 22.755556 22.755556l91.022222 0C211.672178 494.933333 221.866667 484.738844 221.866667 472.177778zM276.332089 681.358222l-64.364089 64.364089c-8.886044 8.886044-8.886044 23.290311 0 32.176356 4.437333 4.448711 10.262756 6.667378 16.088178 6.667378s11.650844-2.218667 16.088178-6.667378l64.364089-64.364089c8.886044-8.886044 8.886044-23.290311 0-32.176356C299.633778 672.472178 285.206756 672.472178 276.332089 681.358222zM759.045689 681.358222c-8.886044-8.886044-23.290311-8.886044-32.176356 0s-8.886044 23.290311 0 32.176356l64.364089 64.364089c4.448711 4.448711 10.262756 6.667378 16.088178 6.667378s11.639467-2.218667 16.088178-6.667378c8.886044-8.886044 8.886044-23.290311 0-32.176356L759.045689 681.358222zM927.288889 449.422222l-91.022222 0c-12.561067 0-22.755556 10.194489-22.755556 22.755556s10.194489 22.755556 22.755556 22.755556l91.022222 0c12.561067 0 22.755556-10.194489 22.755556-22.755556S939.849956 449.422222 927.288889 449.422222zM742.957511 269.664711c5.825422 0 11.639467-2.218667 16.088178-6.667378l64.364089-64.364089c8.886044-8.886044 8.886044-23.290311 0-32.176356s-23.290311-8.886044-32.176356 0l-64.364089 64.364089c-8.886044 8.886044-8.886044 23.290311 0 32.176356C731.306667 267.446044 737.132089 269.664711 742.957511 269.664711zM631.466667 813.511111c0 12.561067-10.194489 22.755556-22.755556 22.755556l-182.044444 0c-12.561067 0-22.755556-10.194489-22.755556-22.755556 0-12.117333 9.500444-21.936356 21.447111-22.619022C411.192889 662.846578 278.755556 634.322489 278.755556 483.555556c0-131.959467 106.973867-238.933333 238.933333-238.933333s238.933333 106.973867 238.933333 238.933333c0 150.766933-132.437333 179.291022-146.602667 307.336533C621.966222 791.574756 631.466667 801.393778 631.466667 813.511111zM465.248711 308.451556c-3.538489-8.726756-13.471289-12.925156-22.232178-9.409422-58.151822 23.563378-102.240711 73.9328-117.930667 134.735644-2.3552 9.136356 3.140267 18.432 12.265244 20.7872C338.773333 454.940444 340.206933 455.111111 341.617778 455.111111c7.600356 0 14.529422-5.108622 16.520533-12.8 12.993422-50.3808 49.516089-92.114489 97.6896-111.627378C464.566044 327.145244 468.775822 317.201067 465.248711 308.451556z" p-id="19488" fill="#1296db"></path></svg>
                <div class="text-black" style="font-size: 15px"> 题解数量 </div>
                <div > {{solution_count}} </div>
              </div>
            </q-card>
          </div>
        </q-tab-panel>
      </q-tab-panels>
    </div>


  </div>
</template>

<script>
  export default {
    name: "userinfo",
    data() {
      return {
        loaded:false,
        blog_count: 0,
        puzzle_count: 0,
        solution_count:0,
        tab : "info",
        tabPostDone : false,
        tabInfoDone: false,
        info:{
          "description":"",
          "created_at": "",
          "is_admin": false,
          "school": "",
          "email": "",
          "passed":[],
          "failed":[],
          "username":"",
          "avatar":"",
        },

        mp: {
          "Accepted": "正确",
          "WrongAnswer": "答案错误",
          "TimeLimitExceeded": "时间超限",
          "MemoryLimitExceeded": "空间超限",
          "OutputLimitExceeded": "输出超限",
          "RuntimeError": "运行错误",
          "SystemError": "系统错误",
          "CompileError": "编译错误",
        },
        myChart : {
          title: {
            text: '解题分析',
            left: 'center'
          },
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
          },
          legend: {
            orient: 'vertical',
            left: 'left',
            data: ['正确', '答案错误', '时间超限','空间超限', '输出超限', '运行错误','系统错误','编译错误']
          },
          series: [
            {
              name: '解题分析',
              type: 'pie',
              radius: '60%',
              center: ['60%', '60%'],
              data: [],
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              },
              itemStyle: { // 设置实例颜色
                normal: {
                  color: function (params) {
                    // 自定义颜色
                    var colorList = [
                      '#00FF00',  '#A52A2A', '#95DE64', '#5CDBD3', '#69C0FF','#FFBB96','DeepPink','red'
                    ]
                    return colorList[params.dataIndex]
                  }
                },
              }
            }
          ]
        },
      }
    },
    methods: {
      countPost() {
        this.tabPostDone = true
        this.$req.get("countMyPost")
          .then(res => {
            if(res.errno == undefined) {
              res = res.post_count
              if (res.blog_count) this.blog_count = res.blog_count
              if (res.puzzle_count) this.puzzle_count = res.puzzle_count
              if (res.solution_count) this.solution_count = res.solution_count
            }
          })
      },
      getUserInfo() {
        this.tabInfoDone = true
        this.$req.get("getUserInfo",{"username":this.info.username})
          .then(res=>{
            if(res.errno == undefined) {
              this.loaded = true
              this.info = res.info
              for(let x in res.status) {
                this.myChart.series[0].data.push({
                  name: this.mp[x],
                  value: res.status[x]
                })
              }
            }
          })
      },



    },
    watch: {
      tab(pane) {
        if (pane=="info" && !this.tabInfoDone) {
          this.getUserInfo()
        }
        if (pane=="post" && !this.tabPostDone) {
          this.countPost()
        }
      }
    },
    computed: {
      status() {
        if (this.info.is_admin) return "管理员"
        return  "普通用户"
      },
    },
    mounted() {
      if(this.$route.params.username) {
          this.info.username = this.$route.params.username
          this.getUserInfo()
      }
    }
  }
</script>

<style scoped>

</style>
