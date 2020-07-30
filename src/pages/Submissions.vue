<template>
  <div class="q-pa-md" style="width: 100rem;margin: 0 auto">
    <div class="text-h3 text-center q-mt-md"> 测评记录 </div>
    <div  class="row q-pa-md">
      <div class="row q-col-gutter-md">
        <q-input color="purple-12" v-model="index" label="problem" style="max-width: 12rem; font-size: 1.3rem">
          <template v-slot:prepend>
            <svg t="1586059211441" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3786" width="32" height="32"><path d="M513.9 959.3c-60.4 0-119-11.8-174.2-35.2-53.3-22.5-101.1-54.8-142.2-95.9-41.1-41.1-73.4-88.9-95.9-142.2-23.3-55.2-35.2-113.8-35.2-174.2s11.8-119 35.2-174.2c22.5-53.3 54.8-101.1 95.9-142.2 41.1-41.1 88.9-73.4 142.2-95.9 55.2-23.3 113.8-35.2 174.2-35.2 60.4 0 119 11.8 174.2 35.2 53.3 22.5 101.1 54.8 142.2 95.9 41.1 41.1 73.4 88.9 95.9 142.2 23.3 55.2 35.2 113.8 35.2 174.2s-11.8 119-35.2 174.2c-22.5 53.3-54.8 101.1-95.9 142.2-41.1 41.1-88.9 73.4-142.2 95.9-55.1 23.4-113.8 35.2-174.2 35.2z m0-839c-52.9 0-104.1 10.3-152.4 30.8C315 170.8 273.1 199 237.1 235s-64.2 77.8-83.9 124.5c-20.4 48.2-30.8 99.5-30.8 152.4s10.3 104.1 30.8 152.4c19.7 46.6 47.9 88.5 83.9 124.5s77.8 64.2 124.5 83.9c48.2 20.4 99.5 30.8 152.4 30.8 52.9 0 104.1-10.3 152.4-30.8 46.6-19.7 88.5-47.9 124.5-83.9 36-36 64.2-77.8 83.9-124.5 20.4-48.2 30.8-99.5 30.8-152.4s-10.3-104.1-30.8-152.4c-19.7-46.6-47.9-88.5-83.9-124.5-36-36-77.8-64.2-124.5-83.9-48.3-20.5-99.6-30.8-152.5-30.8z" fill="#13227a" p-id="3787"></path><path d="M512.4 716m-39.4 0a39.4 39.4 0 1 0 78.8 0 39.4 39.4 0 1 0-78.8 0Z" fill="#13227a" p-id="3788"></path><path d="M508.2 648.3h-0.2c-15.3 0-27.7-12.3-27.9-27.5-0.4-28 0.2-69.2 6.6-84.7 9.1-21.9 31.8-34.4 55.5-47.7 38.2-21.5 63.2-38.1 63.2-71.2 0-51.3-41.7-93-93-93-44 0-80.9 30.7-90.6 71.7-3 12.6-14.4 21.3-27.3 21.3-17.9 0-31.3-16.6-27.2-34 15.5-66 74.9-115.2 145.5-115 81.6 0.2 148.3 67 148.6 148.6 0.2 68.5-55.1 99.7-91.7 120.3-11.5 6.5-28.7 16.2-31.7 21.3-2.4 6.2-2.3 37.4-1.9 61.5 0.3 15.6-12.3 28.4-27.9 28.4z" fill="#13227a" p-id="3789"></path></svg>
          </template>
        </q-input>
        <q-input color="teal" v-model="author" label="author" style="max-width: 12rem;font-size: 1.3rem">
          <template v-slot:prepend>
            <svg t="1586059139406" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2967" width="32" height="32"><path d="M928 448C928 218.4 741.6 32 512 32S96 218.4 96 448c0 186.8 122.8 344.4 292.4 397.2-42 35.2-68.4 88-68.4 146.8h64c0-70.8 57.2-128 128-128s128 57.2 128 128h64c0-58.8-26.4-111.6-68.4-146.8 169.6-52.8 292.4-210.4 292.4-397.2z m-416 352c-194.4 0-352-157.6-352-352s157.6-352 352-352 352 157.6 352 352-157.6 352-352 352z" fill="#13227a" p-id="2968"></path><path d="M608 416h-64V352c0-17.6-14.4-32-32-32s-32 14.4-32 32v64h-64c-17.6 0-32 14.4-32 32s14.4 32 32 32h64v64c0 17.6 14.4 32 32 32s32-14.4 32-32v-64h64c17.6 0 32-14.4 32-32s-14.4-32-32-32z" fill="#13227a" p-id="2969"></path></svg>
          </template>
        </q-input>
        <q-select color="orange"   v-model="lang" :options="langList" style="max-width: 20rem;min-width: 12rem"
        >
          <template v-slot:selected >
            <div class="text-orange" style="font-size: 1.2rem">
              {{lang}}
            </div>
          </template>
          <template v-slot:prepend>
            <svg t="1586059251123" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4592" width="32" height="32"><path d="M511.786667 85.333333C276.053333 85.333333 85.333333 276.266667 85.333333 512s190.72 426.666667 426.453334 426.666667C747.52 938.666667 938.666667 747.733333 938.666667 512S747.52 85.333333 511.786667 85.333333z m295.466666 256h-125.866666c-13.866667-53.333333-33.28-104.533333-58.88-151.893333 78.506667 26.88 143.786667 81.28 184.746666 151.893333zM512 172.16c35.626667 51.2 63.36 108.16 81.493333 169.173333h-162.986666c18.133333-61.013333 45.866667-117.973333 81.493333-169.173333zM181.76 597.333333C174.72 570.026667 170.666667 541.44 170.666667 512s4.053333-58.026667 11.093333-85.333333h144c-3.413333 27.946667-5.76 56.32-5.76 85.333333 0 29.013333 2.346667 57.386667 5.973333 85.333333H181.76z m34.773333 85.333334h125.866667c13.866667 53.333333 33.28 104.533333 58.88 152.106666A342.058667 342.058667 0 0 1 216.533333 682.666667z m125.866667-341.333334h-125.866667c40.96-70.613333 106.24-125.226667 184.746667-152.106666-25.6 47.573333-45.013333 98.773333-58.88 152.106666zM512 851.84c-35.413333-51.2-63.146667-108.16-81.493333-169.173333h162.986666c-18.346667 61.013333-46.08 117.973333-81.493333 169.173333zM611.84 597.333333h-199.68c-4.053333-27.946667-6.826667-56.32-6.826667-85.333333 0-29.013333 2.773333-57.386667 6.826667-85.333333h199.68c4.053333 27.946667 6.826667 56.32 6.826667 85.333333 0 29.013333-2.773333 57.386667-6.826667 85.333333z m10.88 237.226667c25.6-47.573333 45.013333-98.56 58.88-151.893333h125.866667a343.189333 343.189333 0 0 1-184.746667 151.893333zM698.026667 597.333333c3.413333-27.946667 5.973333-56.32 5.973333-85.333333 0-29.013333-2.346667-57.386667-5.973333-85.333333h144c7.04 27.306667 11.306667 55.893333 11.306666 85.333333s-4.053333 58.026667-11.306666 85.333333h-144z" p-id="4593" fill="#13227a"></path></svg>
          </template>
        </q-select>
        <q-select color="orange"   v-model="status" :options="statusList" style="max-width: 20rem; min-width: 12rem"
        >
          <template v-slot:selected >
            <div :class="status" style="font-size: 1.2rem">
              {{status}}
            </div>
          </template>
          <template v-slot:prepend>
            <svg t="1586059684202" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7021" width="32" height="32"><path d="M544 832H64V384h704v192c0 17.066667 14.933333 32 32 32S832 593.066667 832 576V160c0-17.066667-14.933333-32-32-32h-768C14.933333 128 0 142.933333 0 160v704c0 17.066667 14.933333 32 32 32h512c17.066667 0 32-14.933333 32-32s-14.933333-32-32-32zM64 192h704v128H64V192z" fill="#13227a" p-id="7022"></path><path d="M704 480c0-17.066667-14.933333-32-32-32h-512c-17.066667 0-32 14.933333-32 32S142.933333 512 160 512h512c17.066667 0 32-14.933333 32-32zM160 576c-17.066667 0-32 14.933333-32 32S142.933333 640 160 640h256c17.066667 0 32-14.933333 32-32s-14.933333-32-32-32h-256zM128 224h64v64H128zM256 224h64v64h-64zM384 224h64v64h-64zM1015.466667 535.466667c-12.8-12.8-32-12.8-44.8 0L699.733333 804.266667l-96-96c-12.8-12.8-32-12.8-44.8 0-12.8 12.8-12.8 32 0 44.8l119.466667 117.333333c6.4 6.4 14.933333 8.533333 23.466667 8.533333s17.066667-2.133333 23.466666-8.533333l292.266667-290.133333c8.533333-10.666667 8.533333-32-2.133333-44.8z" fill="#13227a" p-id="7023"></path></svg>
          </template>
        </q-select>
        <Button class="q-ml-md" :loading="sloading" type="info" shape="circle" icon="ios-search" style="margin-top:2rem" @click="search">查找</Button>
        <Button class="q-ml-md" :loading="floading" type="error" shape="circle" @click="fresh" style="margin-top:2rem"> 刷新 </Button>
      </div>
      <q-space />
      <div style="font-size: 1.3rem; margin-top: 1.5rem">
        <span style="margin-right: 15px">第{{nowPage}}页</span>
        <router-link to="#" style="margin-right: 1rem;font-size: 0.8rem;" v-if="nowPage==1"> {{prevPage}} </router-link>
        <router-link to="#" style="margin-right: 1rem" v-else> <strong @click="changePage(-1)">{{prevPage}}</strong> </router-link>
        <router-link to="#" style="margin-right: 1rem" v-if="data.length==siz">  <strong @click="changePage(1)">{{nextPage}}</strong> </router-link>
        <router-link to="#" style="margin-right: 1rem;font-size: 0.8rem;" v-else> {{nextPage}} </router-link>
      </div>
    </div>
    <div class="submissiontable">
      <Table :columns="columns" :data="data" :row-class-name="rowClassName" style="margin: 0 auto;" >
        <template slot-scope="{row}" slot="id">
                     <span v-if="$store.state.user.username == row.author">
                         <router-link tag="a" target="_blank" :to="{name:'code',params:{'id':row.id}}"> {{row.id}} </router-link>
                    </span>
          <span v-else>
                        {{row.id}}
                   </span>
        </template>
        <template slot-scope="{row}" slot="author">
          <router-link :to="{name:'userinfo',params:{'username':row.author}}"> {{row.author}}</router-link>
        </template>
        <template slot-scope="{row}" slot="status">
          <span v-if="$store.state.user.username == row.author">
               <router-link tag="a" target="_blank" :to="{name:'code',params:{'id':row.id}}"> <span :class="row.status"> {{row.status}} </span> </router-link>
          </span>
          <span v-else><span :class="row.status"> {{row.status}} </span> </span>
        </template>
        <template slot-scope="{row}" slot="problem">
          <router-link :to="{name:'problem',params:{'index':row.index}}"> {{row.index}} </router-link>
        </template>
      </Table>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        prevPage: "<< 上一页",
        nextPage: "下一页 >>",
        nowPage: 1,
        siz: 20,
        columns: [
          {
            title:'Run ID',
            slot : "id",
            align: "center",
            width: 100,
          },
          {
            title:'Author',
            slot:'author',
            align: 'center',
            width: 300,
          },
          {
            title:'Status',
            slot:'status',
            align: "center",
            width: 200,
          },
          {
            title:'Problem',
            slot:'problem',
            align: "center",
          },
          {
            title:'Time(MS)',
            key:'time',
            align: "center",

          },
          {
            title:'Memory(MB)',
            key:'memory',
            align: "center",

          },
          {
            title:'Length',
            key:'length',
            align: "center",

          },
          {
            title:'Lang',
            key:'lang',
            align: "center",
          },
          {
            title:'SubmitTime',
            key:'created_at',
            align: "center",
            width: 220,
          },
        ],
        data: [],

        index: "",
        author : "",
        langList: ["All","C11","C++11","C++14","C++17","Python2","Python3","Java"],
        statusList: ["All","Queueing","Running","Accepted","WrongAnswer","CompileError","RuntimeError","TimeLimitExceeded","MemoryLimitExceeded","OutputLimitExceeded","SystemError"],
        lang:"All",
        status:"All",
        sloading: false,
        floading: false,
      }
    },
    methods: {
      get_rules() {
        let rules = {}
        if (this.lang!="All") {
          rules.lang = this.lang
        }
        if (this.status!="All") {
          rules.status = this.status
        }
        let c = this.index.trim()
        if (c!="") {
          if (c[0]=='p') {
            c = "P" + c.substr(1)
          } else if(c[0]!='P') {
            c = "P"+c
          }
          rules.index = c
        }
        c = this.author.trim()
        if(c!="") {
          rules.author = c
        }
        return rules
      },
      changePage(change) {
        this.nowPage += change
        let l = (this.nowPage-1)*this.siz+1
        let r = this.nowPage*this.siz
        this.searchSubmissions(l,r,this.get_rules())
      },
      search() {
        this.sloading = true
        this.nowPage = 1
        setTimeout(()=>{
          this.searchSubmissions(1,this.siz,this.get_rules())
        },600)
      },
      fresh() {
        this.floading = true
        setTimeout(()=>{
          this.searchSubmissions(1,this.siz,this.get_rules())
        },600)
      },
      searchSubmissions(l=1,r=20,rules={}) {
        let form = new FormData()
        form.append("l",l)
        form.append("r",r)
        form.append("rules",JSON.stringify(rules))
        this.$req.post("searchSubmissions",form)
          .then(res => {
            if(res.errno == undefined) {
              this.data = res.data
            }
            this.floading = this.sloading = false
          })
      },
      rowClassName(row,index) {
        if(row.author == this.$store.state.user.username) return "myRow"
        return ""
      }
    },
    mounted() {
      this.searchSubmissions(1,this.siz,{})
    }
  }
</script>

<style scoped>

</style>

<style>
  .ivu-table .myRow td{
    background-color: #FFFFE0;
  }
  .submissiontable .ivu-table-header th{
    background-color:#19be6b;
    color: #fff;
    font-size: 16px;
    padding: 5px 0px;
  }
  .submissiontable .ivu-table td{
    font-size: 14px;
  }
  .submissiontable .ivu-table-cell{
    padding: 0px 0px;
  }
</style>
