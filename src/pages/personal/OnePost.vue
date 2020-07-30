<template>
  <div class="q-pa-lg" v-if="loaded">
    <div class="text-h4 text-red q-mb-lg"> 帖子ID：{{post_id}} </div>
    <div class="text-black">
      <div class="text-h6">文章类型: <span class="text-primary">{{get_kind}} </span> </div>
    </div>
    <q-separator class="q-mt-md" />

    <q-form class="text-black q-mt-md text-h6" @submit="submit">
      <div class="q-gutter-md row items-start"  v-if="kind!='solution'">
        <div>标 题</div>
        <q-input v-model="head" dense outlined style="width: 500px"
                 lazy-rules
                 :rules="[
                   val => val && val.length > 0 || '请输入标题',
                   val => val.length <= 40 || '标题太长',
                ]"
        />
      </div>
      <div class="row items-start q-gutter-md q-mt-md" v-if="kind!='blog'">
        <div >题 目</div>
        <q-input v-model="problem" dense outlined style="width: 200px" disable/>
        <div class="text-blue" v-if="kind=='puzzle'">(可以不设置，如果设置了相关题目，该帖子会放到对应题目的讨论栏，不会出现公共系统的讨论栏中)</div>
      </div>
      <div class="q-gutter-sm row items-start q-mt-md">
        <div >公 开</div>
        <q-toggle v-model="is_open" color="primary"/>
        <div class="text-blue">(未编写完成时，推荐不公开)</div>
      </div>
      <div class="q-gutter-sm row items-start q-mt-md">
        <div>允许评论</div>
        <q-toggle v-model="can_reply" color="primary"/>
      </div>
      <div class="q-mt-md">
        <div>系统标签</div>
        <Tags :prop_tags="prop_tags" ref="tags" />
      </div>
      <q-separator class="q-mt-md"/>
      <div class="q-mt-md">
        <mavon-editor v-model="value" ref="editor" @imgAdd="imgAdd"/>
      </div>
      <q-btn type="submit" class="q-mt-md" color="primary" label="提 交" />
    </q-form>

  </div>
</template>

<script>
  import Tags from "../../components/Tags";
  export default {
    name: "OnePost",
    components: {Tags},
    data() {
      return{
        value:"",
        kind: 'blog',
        head:'',
        can_reply:true,
        is_open:false,

        problem: '',
        post_id : 0,
        prop_tags: [],

        loaded:false,
      }
    },
    methods: {
      get_html() {
        return this.$refs.editor.d_render
      },
      get_text() {
        return value
      },

      getForm() {
        let form = new FormData()
        form.set("post_id",this.post_id)
        form.set("is_open",this.is_open)
        form.set("can_reply",this.can_reply)
        if (this.kind!='blog') {
          this.problem = this.problem.trim()
          if (this.problem!="") form.set("problem",this.problem)
        }
        form.set("content",this.value)
        form.set("html_content",this.get_html())
        form.set("head",this.head)
        form.set("tags",JSON.stringify(this.$refs.tags.get_select_tags()))
        return form
      },
      submit() {
        if (this.post_id != 0) {
          this.$req.post("updatePost",this.getForm())
            .then(res => {
              if(res.errno == undefined) {
                this.$notify("success","修改成功")
              }
            })
        }
      },
      imgAdd(pos,$file) {
        let form = new FormData()
        form.set("file",$file)
        this.$req.post("addImg",form)
          .then(res=> {
            this.$refs.editor.$img2Url(pos,res.url)
          })
      },
    },
    computed: {
      get_kind() {
        if (this.kind=="blog") return "博客"
        else if (this.kind=="puzzle") return "求助(讨论)贴"
        else if (this.kind=="solution") return "题解"
        return ""
      }
    },
    mounted() {
      this.post_id = this.$route.params.post_id
      if(this.post_id==undefined) this.$router.push({name:"personalHome"})
      this.$req.get("onePost",{"post_id":this.post_id})
      .then(res=>{
        if(res.errno == undefined) {
            res = res.post
            this.kind = res.kind
            this.head = res.head
            this.value = res.content
            this.can_reply = res.can_reply
            this.is_open = res.is_open
            this.problem = res.index
            this.prop_tags = JSON.parse(res.tags)
            this.loaded = true
        } else {
          this.$router.push({name:"personalHome"})
        }
      })
    }
  }
</script>

<style scoped>

</style>
