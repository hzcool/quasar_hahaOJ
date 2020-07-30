<template>
  <div>
    <div v-if="clarifications.length>0" class="q-ma-md">
      <div class="q-mt-md text-h6 text-black"> 通告 </div>
      <q-card flat bordered v-for="(item,idx) in clarifications" :key="idx" class="q-mt-lg q-pa-md">
        <div class="row">
          <span class="text-h6 text-red col-6">{{item.head}}</span>
          <span class="text-orange"> {{item.created_at}} </span>
        </div>
        <div class="q-pl-md">
          <div v-html="item.content_html" class="q-mt-md text-black" style="font-size: 18px"> </div>
        </div>
      </q-card>
    </div>
    <div v-else class="q-ma-md q-mt-md text-h6 text-black">
       暂无公告
    </div>
    <div class="q-ma-md">
      <q-separator class="q-mt-md"/>
      <div class="row q-mt-md">
          <div style="width: 100px"> <div class="text-red" style="font-size:18px">标题</div> </div>
          <Input style="width: 300px" v-model="clarify.head"> </Input>
      </div>
      <div class="row q-mt-md">
        <div style="width: 100px"> <div class="text-red" style="font-size:18px">内容</div> </div>
        <mavon-editor v-model="clarify.content" style="width: 1500px" ref="clarify"/>
      </div>

      <Button type="primary" class="q-mt-md" @click="addClarification"> 添加通告 </Button>
    </div>

  </div>
</template>

<script>

    export default {
        name: "clarifications",
        data() {
          return {
            contest_id : 0,
            clarify:{
                head:"",
                created_at:"",
                content:"",
                content_html:"",
            },
            clarifications : [],
          }
        },
      methods:{

          addClarification() {
              this.clarify.head = this.clarify.head.trim()
              if (this.clarify.head=="") {
                  this.$notify("error","标题不能为空")
                  return
              }
              this.clarify.created_at = (new Date()).Format("yyyy-MM-dd HH:mm:ss")
              this.clarify.content_html = this.$refs.clarify.d_render
              let form = new FormData()
              form.set("id",this.contest_id)
              form.set("clarification",JSON.stringify(this.clarify))
              this.$req.post("updateClarification",form)
              .then(res=> {
                  if(res.errno==undefined) {
                      this.$notify("success","发布成功")
                      this.clarifications.unshift(JSON.parse(JSON.stringify(this.clarify)))
                      this.clarify.head = this.clarify.content = ""
                  }
              })
          },
          updateClarifications(index=-1,kind="") {

          },

      },

        mounted() {
          if (this.$route.params.id == undefined) this.$router.push({name:"contestManage"})
          else {
            this.contest_id = this.$route.params.id
            this.$req.get("getClarification",{id:this.contest_id})
              .then(res=>{
                if(res.errno==undefined) {
                    this.clarifications = res.data
                    for(let i=0;i<this.clarifications.length;i++) {
                      this.clarifications[i] = JSON.parse(this.clarifications[i])
                    }
                }
              })
          }
        }
    }
</script>

<style scoped>

</style>
