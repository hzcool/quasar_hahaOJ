<template>
  <div class="row justify-center q-pa-lg">
    <div style="width: 1600px">
    <br>
    <Row>
      <span style="font-size: 20px;color: black"> ID <Input v-model="id"  placeholder="Search By ID" style="width: 200px;margin-left: 2px;" /> </span>
      <span style="margin-left: 30px;font-size: 20px;color: black">
                Contest Name
                <Input v-model="contestName"  placeholder="Search By Contest Name" style="width: 200px;margin-left: 2px;" />
            </span>
      <span style="margin-left: 30px;font-size: 20px;color: black">
                Status
                <Select v-model="select" style="width:200px;margin-left: 2px;">
                    <Option v-for="item in statusList" :value="item.value" :key="item.value" :class="item.value">{{ item.label }}</Option>
                </Select>
            </span>
      <Button type="primary" style="margin-left: 20px;" @click="search"> 查找 </Button>
    </Row>
    <br>
    <Row>
      <Page :total="total" :page-size="pageSize"  show-total show-elevator @on-change="changePage" style="float: left"/>
      <Button type="info" @click="$router.push({name:'newContest'})" style="float: right" v-if="($store.state.user.privilege&256)>0"> 创建比赛 </Button>
      <div style="clear: both"> </div>
    </Row>
    <br>
    <div class="contesttable">
      <Table border :columns="columns" :data="data">
        <template slot-scope="{ row }" slot="status">
          <span :class="row.status"> {{row.status}} </span>
        </template>
        <template slot-scope="{ row }" slot="length">
          <span> {{row.length.toFixed(2)}} </span>
        </template>
        <template slot-scope="{ index,row }" slot="action">
          <Button type="primary" @click="$router.push({name:'contestInfo',params:{id:row.id}})" v-if="($store.state.user.privilege&512)>0"> 修改 </Button>
          <Button type="error" style="margin-left: 10px" @click="deleteContest(index,row)" v-if="($store.state.user.privilege&1024)>0"> 删除 </Button>
          <Button type="info" style="margin-left: 10px" @click="$router.push({name:'ranklist',params:{id:row.id,format:row.format}})"> 比赛榜单 </Button>
          <Button type="warning" style="margin-left: 10px" @click="$router.push({name:'csubmissions',params:{'id':row.id}})" v-if="($store.state.user.privilege&8)>2048">提交记录</Button>
          <Button type="success" style="margin-left: 10px" @click="$router.push({name:'cproblems',params:{'id':row.id}})"> 比赛题目 </Button>
          <Button  style="margin-left: 10px;background-color: orange;color:white" @click="$router.push({name:'clarifications',params:{'id':row.id}})"> 通告 </Button>
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
        columns: [
          {
            title:'ID',
            key: 'id',
            width: 60,
            align: 'center',
          },
          {
            title: 'Contest Name',
            key: 'title',
            align: 'center',
          },
          {
            title: 'Type',
            key: 'type',
            width: 100,
            align: 'center',
          },
          {
            title: 'Format',
            key: 'format',
            width: 100,
            align: 'center',
          },
          {
            title: 'Status',
            slot: 'status',
            align:'center',
            width: 100,
          },
          {
            title: 'Length(Hours)',
            slot: 'length',
            align: 'center',
            width: 130,
          },
          {
            title: 'Begin Time',
            key: 'begin',
            align: 'center',
            width: 200,
          },
          {
            title: 'Action',
            slot: 'action',
            align: "center",
            width: 500,
          }
        ],
        data: [],
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
        this.searchContests(1,this.pageSize,this.getRules())
      },
      changePage(page) {
        let l = (page-1)*this.pageSize + 1
        let r = page*this.pageSize
        this.searchContests(l,r,this.getRules())
      },
      create() {
        this.$router.push({name:"contestInfo"})
      },
      deleteContest(index,row) {
        this.$q.dialog({
          dark: true,
          title: '确认框',
          message: '你确定要删除该场比赛吗',
          cancel: true,
          persistent: true
        }).onOk(() => {
          this.$req.get("deleteContest",{'id':row.id})
            .then(res => {
              if(res) {
                this.data.splice(index,1)
                this.$notify("success","删除成功")
              }
            })
        })
      },
      searchContests(l,r,rules) {
        let form = new FormData()
        form.set("l",l)
        form.set("r",r)
        form.set("rules",JSON.stringify(rules))
        this.$req.post("searchContests",form)
          .then(res => {
            if(res.errno==undefined) {
              this.total = res.total
              this.data = res.data
            }
          })
      }
    },
    mounted() {
      this.searchContests(1,this.pageSize,{})
    }
  }
</script>

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
<style>
  .contesttable .ivu-table-header th{
    background-color:#9c27b0;
    color: #fff;
  }
  .contesttable .ivu-table td{
    font-size: 16px;
  }
  .contesttable .ivu-table-cell{
    padding: 0px 0px;
  }
</style>
