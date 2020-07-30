<template>
  <div class="row justify-center">
    <div style="width: 1600px">
      <h1 style="text-align: center"> 测评记录 </h1>
      <br>
      <Row>
        <div style="float: left">
          <div style="font-size: 15px;color: black">
            Problem <Input v-model="problem_index" style="width: 150px; margin-right: 20px;" placeholder="search like P1000" @on-enter="search"/>
            Author <Input v-model="author" style="width: 150px;margin-right: 20px;" @on-enter="search"/>

            Lang
            <Select v-model="lang" style="width:150px;margin-right: 20px;">
              <Option v-for="item in langList" :value="item.value" :key="item.value"> {{item.label}}</Option>
            </Select>

            Status
            <Select v-model="status" style="width:200px">
              <Option v-for="item in statusList" :value="item.value" :key="item.value" :class="item.label"> {{item.label}} </Option>
            </Select>
            <Button :loading="sloading" type="info" shape="circle" icon="ios-search" style="margin-left:20px" @click="search">查找</Button>
            <Button :loading="floading" type="error" shape="circle" @click="fresh" style="margin-left:20px"> 刷新 </Button>
          </div>
        </div>
        <div style="float: right;font-size: 20px">
          <span style="margin-right: 15px">第{{nowPage}}页</span>
          <router-link to="#" style="margin-right: 10px;font-size: 12px;" v-if="nowPage==1"> {{prevPage}} </router-link>
          <router-link to="#" style="margin-right: 10px" v-else> <strong @click="changePage(-1)">{{prevPage}}</strong> </router-link>
          <router-link to="#" style="margin-right: 10px" v-if="data.length==siz">  <strong @click="changePage(1)">{{nextPage}}</strong> </router-link>
          <router-link to="#" style="margin-right: 10px;font-size: 12px;" v-else> {{nextPage}} </router-link>
        </div>
      </Row>
      <br>
      <div class="submissiontable">
        <Table :columns="columns" :data="data">
          <template slot-scope="{row}" slot="author">
            <router-link tag="a" target="_blank" :to="{name:'userinfo',params:{'username':row.author}}"> {{row.author}}</router-link>
          </template>
          <template slot-scope="{row}" slot="status">
                <span>
                    <span :class="row.status"> {{row.status}} </span>
               </span>
          </template>
          <template slot-scope="{row}" slot="problem">
            <router-link :to="{name:'problemInfo',params:{'index':row.index}}"> {{row.index}} </router-link>
          </template>
          <template slot-scope="{row}" slot="action">
            <Button type="primary" @click="lookUp(row)">查看</Button>
            <Button type="error" style="margin-left: 10px" @click="$notify('error','暂不支持')">重判</Button>
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
        prevPage: "<< 上一页",
        nextPage: "下一页 >>",
        nowPage: 1,
        siz: 20,
        columns: [
          {
            title:'Run ID',
            key : "id",
            align: "center",
            width: 65,
          },
          {
            title:'Author',
            slot:'author',
            align: "center",
          },
          {
            title:'Status',
            slot:'status',
            align: "center",
            width: 180,
          },
          {
            title: 'Score',
            key: 'score',
            align: "center",
            width: 100,
          },
          {
            title:'Problem',
            slot:'problem',
            align: "center",
            width: 100,
          },
          {
            title:'Time(MS)',
            key:'time',
            align: "center",
            width: 120
          },
          {
            title:'Memory(MB)',
            key:'memory',
            align: "center",
            width: 120
          },
          {
            title:'Length',
            key:'length',
            align: "center",
            width: 100
          },
          {
            title:'Lang',
            key:'lang',
            align: "center",
            width: 100
          },
          {
            title:'SubmitTime',
            key:'created_at',
            align: "center",
            width:200,
          },
          {
            title: "Action",
            slot: 'action',
            align: 'center',
            width: 200
          }
        ],
        data: [],

        problem_index: "",
        author : "",
        langList: [
          {
            value:'All',
            label:'All',
          },
          {
            value:'C11',
            label:'C11',
          },
          {
            value:'C++11',
            label:'C++11',
          },
          {
            value:'C++14',
            label:'C++14',
          },
          {
            value:'C++17',
            label:'C++17',
          },
          {
            value:'Python2',
            label:'Python2',
          },
          {
            value:'Python3',
            label:'Python3',
          },
          {
            value:'Java',
            label:'Java',
          },
        ],
        lang:"All",
        statusList:[
          {
            value: 'All',
            label: 'All',
          },
          {
            value: 'Queueing',
            label: 'Queueing',
          },
          {
            value: 'Running',
            label: 'Running',
          },
          {
            value: 'Accepted',
            label: 'Accepted',
          },
          {
            value: 'WrongAnswer',
            label: 'WrongAnswer',
          },
          {
            value: 'CompileError',
            label: 'CompileError',
          },
          {
            value: 'RuntimeError',
            label: 'RuntimeError',
          },
          {
            value: 'TimeLimitExceeded',
            label: 'TimeLimitExceeded',
          },
          {
            value: 'MemoryLimitExceeded',
            label: 'MemoryLimitExceeded',
          },
          {
            value: 'OutputLimitExceeded',
            label: 'OutputLimitExceeded',
          },
          {
            value: 'SystemError',
            label: 'SystemError',
          },
        ],
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
        let c = this.problem_index.trim()
        if (c!="") {
          if (c[0]=='p') {
            c = "P" + c.substr(1)
          } else if(c[0]!='P') {
            c = "P"+c
          }
          rules.problem_index = c
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
      lookUp(row) {
        let routeUrl = this.$router.resolve({
          name: "code",
          params: {id:row.id}
        })
        window.open(routeUrl .href, '_blank')
      },
      searchSubmissions(l=1,r=this.siz,rules={}) {
        let form = new FormData()
        form.set("l",l)
        form.set("r",r)
        form.set("rules",JSON.stringify(rules))
        this.$req.post("searchSubmissions",form)
          .then(res => {
            if(res.errno==undefined) {
              this.data = res.data
            }
            this.floading = this.sloading = false
          })
      }
    },
    mounted() {
      this.searchSubmissions(1,this.siz,{})
    }
  }
</script>

<style>
  .submissiontable .ivu-table-header th{
    background-color:#19be6b;
    color: #fff;
    font-size: 14px;
    padding: 5px 0px;
  }
  .submissiontable .ivu-table td{
    font-size: 14px;
  }
  .submissiontable  .ivu-table-cell {
    padding: 0px 0px;
  }
  .onesubmissiontable .ivu-table-header th{
    background-color:#2db7f5;
    color: #fff;
  }
  .onesubmissiontable .ivu-table-cell {
    padding: 0px 0px;
  }

</style>

<style scoped>
  .All{
    color: black;
  }
  .Queueing {
    color: green;
  }
  .Running{
    color: #000080;
  }
  .Accepted {
    color :	#00FF00;
  }
  .WrongAnswer{
    color: red;
  }
  .CompileError{
    color: blue;
  }
  .RuntimeError{
    color: Fuchsia;
  }
  .TimeLimitExceeded {
    color: 	DeepPink;
  }
  .MemoryLimitExceeded {
    color: Crimson;
  }
  .OutputLimitExceeded{
    color: DarkViolet;
  }
  .SystemError{
    color: Gold;
  }
</style>
