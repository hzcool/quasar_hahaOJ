<template>
  <div class="q-pa-lg">
    <div class="text-black">
      <div class="text-h6">文章类型:</div>
        <div class="q-gutter-lg" style="font-size: 16px">
          <q-radio v-model="kind" val="blog" label="博客" color="teal" keep-color />
          <q-radio v-model="kind" val="puzzle" label="求助(讨论)" color="orange" keep-color />
          <q-radio v-model="kind" val="solution" label="题解" color="red" keep-color />
        </div>
    </div>
    <q-separator />

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
          <q-input v-model="problem" dense outlined style="width: 200px"
               lazy-rules
               :rules="[
                 val => kind=='puzzle' || val.length > 0 || '请输入题目',
              ]"
          />
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
          <Tags :prop_tags="prop_tags" ref="tags"/>
        </div>
        <q-separator class="q-mt-md"/>
        <div class="q-mt-md">
          <mavon-editor v-model="value" ref="editor" @imgAdd="imgAdd" @imgDel="imgDel"/>
        </div>
        <q-btn type="submit" class="q-mt-md" color="primary" label="提 交" />
    </q-form>
  </div>
</template>

<script>
  import Tags from "../../components/Tags";
  export default {
    name: "NewPost",
    components: {Tags},
    data() {
      return{
        value:"",
        kind: 'blog',
        head:'',
        can_reply:true,
        is_open:true,
        problem: '',
        prop_tags: [],
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
        form.set("kind",this.kind)
        form.set("is_open",this.is_open)
        form.set("can_reply",this.can_reply)
        if (this.kind!='blog') {
          this.problem = this.problem.trim()
          if (this.problem!="") form.set("problem",this.problem)
        }
        form.set("content",this.value)
        form.set("html_content",this.get_html())
        if (this.kind!='solution') form.set("head",this.head)
        form.set("tags",JSON.stringify(this.$refs.tags.get_select_tags()))
        return form
      },
      submit() {
        this.$req.post("newPost",this.getForm())
        .then(res => {
          if(res.errno == undefined) {
            this.$notify("success","提交成功")
            this.$router.push({name:"onePost",params:{post_id:res.post_id}})
          }
        })
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
  }
</script>

<style scoped>

</style>
