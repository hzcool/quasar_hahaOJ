<template>
  <div class="q-pa-lg">
    <Row class="q-mt-md">
      <span style="font-size: 15px;color: black"> 用户名 <Input v-model="username"  placeholder="Search By username" style="width: 200px;margin-left: 2px;" @on-enter="search"/> </span>
      <Button  type="info" shape="circle" icon="ios-search" style="margin-left:20px" @click="search">查找</Button>
      <Page :total="total" :page-size="page_size"  show-total show-elevator @on-change="changePage" style="float: right"/>
      <div style="clear: both"> </div>
    </Row>
    <br>
    <Table border :columns="columns" :data="data">
      <template slot-scope="{ row }" slot="action" >
        <div class="q-gutter-xs"  >
          <Button type="primary" @click="modifyUserInfo(row)"> 修改信息 </Button>
          <Button type="warning" @click="forPrivilege(row)"> 添加管理员权限 </Button>
          <Button type="error" @click="deleteUser(row)"> 删除 </Button>
        </div>
      </template>
    </Table>
    <Modal
      v-if="($store.state.user.privilege&16384)>0"
      v-model="privilegeModal"
      title="用户权限"
      width="800px"
      @on-ok="updatePrivilege"
      >
      <CheckboxGroup v-model="had_pri_list" class="q-gutter-md">
        <Checkbox v-for="(item,idx) in pri_value_list" :key="idx" :label="item" border>
          <span style="color: black">{{pri_desc_list[idx]}} </span>
        </Checkbox>
      </CheckboxGroup>
    </Modal>

  </div>
</template>

<script>
  export default {
    name: "userIndex",
    data() {
      return {
        columns: [
          {
            title:"标号",
            key: 'id',
            width: 70,
            align:'center'
          },
          {
            title: '用户名',
            key: 'username',
          },
          {
            title: '创建时间',
            key: 'created_at',
          },
          {
            title:'学校',
            key:'school'
          },
          {
            title:'邮箱',
            key:'email',
          },
          {
            title:'用户身份',
            key:'status',
            width: 120,
            align: 'center',
          },
          {
            width: 400,
            title:'操作',
            slot:'action',
          },
        ],
        data:[],
        page_size:50,
        total:0,
        username:"",
        privilegeModal:false,
        choose_row:null,

        pri_desc_list: [],
        pri_value_list:[],
        had_pri_list: [],
      }
    },
    methods: {
      changePage(page) {
        let l = (page-1)*this.page_size + 1
        let r = page*this.page_size
        this.getUsers(l,r)
      },
      search() {
        this.getUsers(1,this.page_size)
      },
      getUsers(l=1,r=this.page_size) {
        let params = {'l':l,'r':r}
        this.username = this.username.trim()
        if (this.username!="") params["username"] = this.username
        this.$req.get("getUsers",params)
          .then(res=> {
            if(res.errno == undefined) {
              this.data = res.data
              this.total = res.total
            }
          })
      },
      modifyUserInfo(row) {
          this.$notify("error","暂未实现")
      },
      deleteUser(row) {
        this.$notify("error","暂未实现")
      },
      forPrivilege(row) {
          this.$req.get("getPrivileges", {"id":row.id})
          .then(res=> {
            if(res.errno == undefined) {
              this.pri_desc_list = res.pri_desc_list
              this.pri_value_list = res.pri_value_list
              this.had_pri_list = res.had_pri_list
              this.choose_row = row
              this.privilegeModal = true
            }
          })
      },
      updatePrivilege() {
          this.$q.dialog({
            dark: true,
            title: '确认框',
            message: '你确定要修改 <strong style="font-size:18px;color:red">' + this.choose_row.username +'</strong>'+ '的权限吗',
            cancel: true,
            persistent: true,
            html: true
          }).onOk(() => {
            let form = new FormData()
            form.set("id",this.choose_row.id)
            form.set("privileges",JSON.stringify(this.had_pri_list))
            this.$req.post("updatePrivileges",form)
              .then(res=> {
                if(res.errno==undefined) {
                  this.choose_row.status = res.status
                  this.$notify("success","修改用户权限成功")
                }
              })
          })

      },

    },
    mounted() {
      setTimeout(()=>{
        this.getUsers()
      },300)
    }
  }
</script>

<style scoped>

</style>
