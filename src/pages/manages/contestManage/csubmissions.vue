<template>
  <div class="row justify-center">
    <div class="q-pa-lg" style="width: 1700px">
      <br>
      <div v-if="($store.state.user.privilege&4096)>0">
        <CheckboxGroup v-model="rejudgeList">
          <Checkbox v-for="(label,idx) in labels" :key="idx" :label="label" border> {{titles[idx]}} </Checkbox>
        </CheckboxGroup>
        <Button type="warning" @click="rejudge" class="q-mt-md"> Rejudge </Button>
      </div>
      <br>
      <br>
      <Row>
        <div style="float: left">
          <div style="font-size: 15px;color: black">
            Problem <Input v-model="label" style="width: 150px; margin-right: 20px;" placeholder="search like A" @on-enter="search"/>
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
            <Button :loading="floading" type="error" shape="circle" @click="fresh" style="margin-left:20px">刷新</Button>
          </div>
        </div>
        <Page :total="tot" :page-size="siz" show-elevator show-total @on-change="changePage" style="float: right"/>
      </Row>
      <br>
      <div class="submissiontable">
        <Table :columns="columns" :data="data"  :row-class-name="rowClassName" >
          <template slot-scope="{row}" slot="run_id">
                  <span> {{row.run_id}}</span>
          </template>
          <template slot-scope="{row}" slot="author">
            {{row.author}}
          </template>
          <template slot-scope="{row}" slot="status">
                <span :class="row.status"> {{row.status}} </span>
          </template>
          <template slot-scope="{row}" slot="problem">
            <q-btn flat :label="row.label" color="primary" no-caps> </q-btn>
          </template>
          <template slot-scope="{row}" slot="action">
            <Button type="primary" @click="lookCode(row)"> 查看 </Button>
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
        rejudgeList:[],
        columns: [
          {
            title:'Run ID',
            slot : "run_id",
            align: "center",
            width: 70,
          },
          {
            title:'Author',
            slot:'author',
            align: "center",
            width: 250,
          },
          {
            title:'Status',
            slot:'status',
            align: "center",
            width: 200,
          },
          {
            title: 'Score',
            key : 'score',
            align: 'center',
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
            key:'submitTime',
            align: "center",
            width: 200,
          },
          {
              title:"Action",
              slot:"action",
            align: "center",
          },
        ],
        tot: 0,
        siz: 50,
        label: "",
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
        loaded : false,
        sloading: false,
        floading: false,
        data:[],
        contest_id:0,

        labels:[],
        titles:[],
      }
    },
    methods: {
      rejudge() {
        if (this.rejudgeList.length == 0) {
          this.$notify("error","请选择重测的问题")
          return
        }
        this.$q.dialog({
          dark: true,
          title: '确认框',
          message: '你确定要重测吗',
          cancel: true,
          persistent: true
        }).onOk(() => {
          let form = new FormData()
          form.set("id",this.contest_id)
          form.set("labels",JSON.stringify(this.rejudgeList))
          this.$req.post("rejudge",form)
            .then(res => {
              if(res) {
                this.$notify("success","正在重测")
              }
            })
        })
      },
      get_rules() {
        let rules = {}
        if (this.lang!="All") {
          rules.lang = this.lang
        }
        if (this.status!="All") {
          rules.status = this.status
        }
        let c = this.label.trim()
        if (c!="") {
          rules.label = c
        }
        c = this.author.trim()
        if(c!="") {
          rules.author = c
        }
        return rules
      },
      changePage(index) {
        let l = (index-1)*this.siz + 1;
        let r = l + this.siz - 1;
        this.searchCsubmissions(l,r,this.get_rules())
      },
      search() {
        this.sloading = true
        setTimeout(()=>{
          this.searchCsubmissions(1,50,this.get_rules())
        },600)
      },
      fresh() {
        this.floading = true
        setTimeout(()=>{
          this.searchCsubmissions(1,50,this.get_rules())
        },600)
      },
      searchCsubmissions(l=1,r=50,rules={}) {
        let form = new FormData()
        form.set("id",this.contest_id)
        form.set("l",l)
        form.set("r",r)
        form.set("rules",JSON.stringify(rules))
        this.$req.post("forCsubmissions",form)
          .then(res => {
            if(res.errno == undefined) {
              this.data = res.data
              this.tot = res.total
              this.loaded = true
            }
            this.floading = this.sloading = false
          })
      },
      rowClassName(row,index) {
        if (row.author == this.$store.state.user.username) return "myRow"
        return ""
      },
      lookCode(row) {
        let routeData = this.$router.resolve({ name: 'contestCode', params: {  'contest_id': this.contest_id,'run_id':row.run_id } });
        window.open(routeData.href, '_blank');
      }
    },
    mounted() {
        this.contest_id = this.$route.params.id
        if(this.contest_id) {
          this.$req.get("forCproblemTitles",{id:this.contest_id})
          .then(res=> {
              if(res.errno==undefined) {
                  this.labels = res.labels
                  this.titles = res.titles
              }
          })
          this.searchCsubmissions()
        } else {
          this.$router.push({name:'contestManage'})
        }
    }
  }
</script>

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
    font-size: 16px;
  }
  .submissiontable  .ivu-table-cell {
    padding: 0px 0px;
  }
</style>
