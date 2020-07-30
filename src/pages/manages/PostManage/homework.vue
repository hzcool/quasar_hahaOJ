<template>
<div>
    <div class="q-pa-lg">
      <Button type="primary" size="large" @click="showNewClassModal"> 创建班级 </Button>
      <q-separator class="q-my-md" />
      <div class="row">
            <div class="col-3" v-for="(item,idx) in classes" :key="idx" style="font-size: 22px">
              <Button type="text"> <span class="text-blue" style="font-size: 20px"> {{item.id}}: {{item.name}}  </span></Button>
              <span class="text-orange" style="font-size: 12px"> ({{item.password}}) </span>
              <Button type="info" class="q-ml-md" @click="updateMoalShow(item)">  修改信息 </Button>
            </div>
      </div>
    </div>



  <Modal
    v-model="newClassModal"
    title="创建班级"
   >
    <template>
      <div class="q-gutter-md q-pa-lg" >
         <Input v-model="className" style="width: 400px" >
           <span slot="prepend">班级</span>
         </Input>

        <Input v-model="password" password type="password" style="width: 400px" >
          <span slot="prepend">密码</span>
        </Input>
      </div>
      <div slot="footer">
          <Button type="text" @click="newClassModal=false"> 取消 </Button>
          <Button type="primary" @click="newClass"> 创建 </Button>
      </div>
    </template>
  </Modal>

  <Modal
    v-model="updateClassModal"
    title="修改班级信息"
  >
    <template>
      <div class="q-gutter-md q-pa-lg" >
        <Input v-model="className" style="width: 400px" >
          <span slot="prepend">班级</span>
        </Input>

        <Input v-model="password" password type="password" style="width: 400px" >
          <span slot="prepend">密码</span>
        </Input>
      </div>
      <div slot="footer">
        <Button type="text" @click="updateClassModal=false"> 取消 </Button>
        <Button type="primary" @click="updateClassInfo"> 修改 </Button>
      </div>
    </template>
  </Modal>
</div>
</template>

<script>
    export default {
        name: "homework",
        data() {
          return {
            newClassModal: false,
            updateClassModal: false,
            className:"",
            password:"",
            classes :[],
            choose_class:null,
            // columns: [
            //   {
            //     title:'置顶等级',
            //     key: 'grade',
            //   },
            //   {
            //     title: 'head',
            //     key: '标题',
            //   },
            //   {
            //     title: 'begin',
            //     key: 'begin'
            //   },
            //   {
            //     title: 'end',
            //     key: '结束',
            //   },
            //   {
            //     title: 'Action',
            //     slot: 'action',
            //     width: 450,
            //   }
            // ],
          }
        },
        methods: {
          newClass() {
            this.className =  this.className.trim()
            if ( this.className == "") {
              this.$notify("error","班级名不能为空")
              return
            }
            this.$req.get("newClass",{"name":this.className,"password":this.password})
              .then(res=>{
                if(res.errno == undefined) {
                  this.className = this.password = ""
                  this.newClassModal = false
                  this.classes.push(res.class)
                  this.$notify("success","创建成功")
                }
              })
          },
          showNewClassModal(){
            this.className = ""
            this.password = ""
            this.newClassModal = true
          },
          updateMoalShow(item) {
            this.className = item.name
            this.password = item.password
            this.choose_class = item
            this.updateClassModal = true
          },
          updateClassInfo() {
              this.className =  this.className.trim()
              if ( this.className == "") {
                this.$notify("error","班级名不能为空")
                return
              }
              this.$req.get("updateClassInfo",{"id":this.choose_class.id,"name":this.className,"password":this.password})
                .then(res=>{
                  if(res.errno==undefined) {
                    this.$notify("success","修改成功")
                    this.className = this.password = ""
                    this.updateClassModal = false
                    this.getClass()
                  }
                })
          },
          getClass() {
            this.$req.get("getClasses")
              .then(res=>{
                if(res.errno==undefined) {
                  this.classes = res.data
                }
              })
          }
        },
      mounted() {
          setTimeout(()=>{
            this.getClass()
          },300)
      }
    }
</script>

<style scoped>

</style>
