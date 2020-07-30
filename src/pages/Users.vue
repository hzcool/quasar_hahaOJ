<template>
  <div class="row justify-center" v-if="loaded">
    <div  class="q-py-lg" style="width: 1600px">
    <div class="text-h3 text-center q-mt-md"> 用户列表 </div>
    <br>
    <Row>
      <span style="font-size: 15px;color: black"> 用户名 <Input v-model="username"  placeholder="Search By username" style="width: 200px;margin-left: 2px;" @on-enter="search"/> </span>
      <Button :loading="sloading" type="info" shape="circle" icon="ios-search" style="margin-left:20px" @click="search">查找</Button>
      <Page :total="total" :page-size="pageSize"  show-total show-elevator @on-change="changePage" style="float: right"/>
      <div style="clear: both"> </div>
    </Row>
    <br>
    <div class="usertable">
      <Table stripe :columns="head" :data="data">
        <template slot-scope="{ index }" slot="rank">
          {{index+1}}
        </template>
        <template slot-scope="{ row }" slot="username">
          <router-link :to="{name:'userinfo',params:{'username':row.username}}"> {{row.username}}</router-link>
        </template>
        <template slot-scope="{ row }" slot="ratio">
          <q-chip :color="colorForRatio(row.ratio)" text-color="white" dense style="font-size: 1rem;width: 5rem" >
            {{(row.ratio*100).toFixed(2)}}%
          </q-chip>
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
        password:'',
        head:[
          {
            title: '排名',
            slot: 'rank',
            align: 'center',
            width: 100,
          },
          {
            title: '用户名',
            slot: 'username',
            align: 'center',
          },
          {
            title: '学校',
            key: 'school',
            align: 'center',
          },
          {
            title: '已解决',
            key: 'passed_count',
            align: 'center',
            // width: 100,
          },
          {
              title: "正确提交",
              key : 'passed_sub_count',
              align: 'center',
          },
          {
            title: '总提交',
            key: 'all_sub_count',
            align: 'center',
            // width:100,
          },
          {
            title: '正确率',
            slot: 'ratio',
            align: 'center',
            width:150,
          }
        ],
        data:[],

        total: 0,
        pageSize: 50,

        //查询条件
        username:'',

        loaded: false,

        sloading: false,
      }
    },
    methods: {
      colorForRatio(ratio) {
        if (ratio<=0.2)  return "red";
        if (ratio<=0.6)  return "orange";
        if (ratio<=0.8)  return "blue";
        return "green";
      },
      search() {
        this.sloading = true
        setTimeout(()=>{
          this.searchUsers(1,this.pageSize)
        },600)
      },
      changePage(page) {
        let l = (page-1)*this.pageSize + 1
        let r = page*this.pageSize
        this.searchUsers(l,r)
      },
      searchUsers(l,r) {
        let obj = {l:l,r:r}
        this.username = this.username.trim()
        if (this.username!="") obj.username = this.username
        this.$req.get('searchUsers',obj)
          .then(res=> {
            if(res.errno == undefined) {
              this.total = res.total
              this.data = res.data
              this.loaded = true
              this.sloading = false
            }
          })
      },
    },
    mounted() {
      this.loaded = true
      this.searchUsers(1,this.pageSize,)
    }
  }
</script>
<style>
  .usertable .ivu-table-header th{
    background-color:#EB7347;
    color: #fff;
    font-size: 14px;
    padding: 5px 0px;
  }
  .usertable .ivu-table td{
    font-size: 14px;
  }
</style>

<style scoped>

</style>
