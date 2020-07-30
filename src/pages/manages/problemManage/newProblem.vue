<template>
  <div class="q-ma-md">
    <div class="q-mt-md q-gutter-md">
        <div class="desc" > 版权信息 </div>
        <div class="row">
          <div class="col-2 item"> 作者 </div>
          <Input  style="width: 300px" v-model="problem.author"/>
        </div>
      <q-separator />
        <div class="row">
          <div class="col-2 item"> 来源 </div>
          <Input  style="width: 300px" v-model="problem.source"/>
        </div>
        <q-separator />
    </div>
    <div class="desc q-mt-md"> 是否公开 </div>
    <div class="text-black q-gutter-md q-mt-sm " style="font-size: 18px;margin-left: 0px">
      <q-radio v-model="problem.is_open" :val="false" label="隐藏" color="orange" dense />
      <q-radio v-model="problem.is_open" :val="true" label="公开" color="cyan" dense />
      <q-separator />
    </div>

    <div class="q-mt-md q-gutter-md">
      <div class="desc" > 题目信息 </div>
      <div class="text-black q-gutter-md" style="font-size: 18px">
        <q-radio v-model="problem.is_spj" :val="false" label="正常题" color="orange" dense/>
        <q-radio v-model="problem.is_spj" :val="true" label="特判题" color="cyan" dense/>
      </div>
      <div v-if="problem.is_spj">
        <div class="row">
          <Upload action="#" :before-upload = "before_upload" type="drag"  class="col-2">
            <Button icon="ios-cloud-upload-outline" type="success" style="float: left" size="large" long>上传(spj.c, spj.cpp, spj.py)</Button>
          </Upload>
        </div>
        <div v-if="spj_file">
          {{spj_file.name}}
          <Button type="error" style="margin-left: 20px" @click="spj_file=null"> 移除 </Button>
        </div>
      </div>
      <q-separator />
      <div class="row">
        <div class="col-2 item"> 题目 </div>
        <Input  style="width: 300px" v-model="problem.title"/>
      </div>
      <q-separator />
      <div class="row">
        <div class="col-2 item"> <span style="color: red">*</span>时间限制(MS) </div>
         <InputNumber :max="40000"  v-model="problem.time_limit"  style="width: 150px"></InputNumber>
      </div>
      <q-separator />
      <div class="row">
        <div class="col-2 item"> <span style="color: red">*</span>空间限制(MB) </div>
       <InputNumber :max="2048"  v-model="problem.memory_limit"  style="width: 150px"></InputNumber>
      </div>
      <q-separator />
      <div class="row">
        <div class="col-2"> <div class="item">背景说明</div> </div>
        <mavon-editor v-model="problem.background" class="col-10" ref="bg"/>
      </div>
      <q-separator />
      <div class="row">
        <div class="col-2"> <div class="item">题面说明</div> </div>
        <mavon-editor v-model="problem.statement" class="col-10" ref="st"/>
      </div>
      <q-separator />
      <div class="row">
        <div class="col-2"> <div class="item">输入说明</div> </div>
        <mavon-editor v-model="problem.input" class="col-10" ref="input"/>
      </div>
      <q-separator />
      <div class="row">
        <div class="col-2"> <div class="item">输出说明</div> </div>
        <mavon-editor v-model="problem.output" class="col-10" ref="output"/>
      </div>
      <q-separator />
      <div class="row">
        <div class="col-2"> <div class="item">提示</div> </div>
        <mavon-editor v-model="problem.hint" class="col-10" ref="hint"/>
      </div>
      <q-separator />
    </div>
    <div class="q-mt-md q-gutter-md">
      <div class="desc" > 输入输出样例 </div>
      <div v-for="(item,idx) in examples_in"  :key="idx" class="q-mt-md row text-black">
            <div class="col-5">
                <div>输入样例{{idx+1}}</div>
                <div>
                  <Input type="textarea" :rows="4" placeholder="Enter something..." style="width: 400px;" v-model="examples_in[idx]"/>
                </div>
            </div>
            <div class="col-5">
                <div>输出样例{{idx+1}}</div>
                <div>
                  <Input type="textarea" :rows="4" placeholder="Enter something..." style="width: 400px;" v-model="examples_out[idx]"/>
                </div>
            </div>
      </div>
      <div>
        <Button size="large" type="success" @click="addExample"> 增加样例 </Button>
        <Button size="large" type="error" @click="removeExample" class="q-ml-md"> 减少样例 </Button>
      </div>
    </div>
    <q-separator class="q-mt-md"/>
    <Button type="primary" size="large" @click="submit" class="q-mt-md"> 提交 </Button>
  </div>
</template>

<script>
    export default {
        name: "newProblem",
        data() {
          return {
              problem: {
                author: this.$store.state.user.username,
                source:"Happy Online Judge",
                title:"",
                is_open:false,
                is_spj: false,
                spj_type:"",
                time_limit:1000,
                memory_limit:128,
                background:"",
                statement:"",
                input:"",
                output:"",
                hint:"",
                background_html:"",
                statement_html:"",
                input_html:"",
                output_html:"",
                hint_html:"",
                examples_in:"",
                examples_out:"",
              },
              spj_file:null,
              examples_in: [],
              examples_out:[],
          }
        },
        methods: {
          before_upload(file) {
            this.spj_file = file
            return false
          },
          addExample() {
            this.examples_in.push("")
            this.examples_out.push("")
          },
          removeExample() {
              if(this.examples_in.length > 0) {
                this.examples_in.pop()
                this.examples_out.pop()
              }
          },
          validate() {
            if(this.problem.time_limit < 200) return "时间限制不能低于200MS"
            if(this.problem.memory_limit < 20) return "空间限制不能低于20MB"
            if (this.problem.is_spj) {
              if (this.spj_file == null && this.problem.spj_type == '') return "特判文件不能为空"
              if (this.spj_file) {
                let name = this.spj_file.name
                if (name == "spj.c") this.problem.spj_type = "C";
                else if (name == "spj.cpp") this.problem.spj_type = "C++";
                else if (name == "spj.py") this.problem.spj_type = "Python3";
                else return "特判文件名或类型不对"
              }
            }
            return ''
          },
          submit() {
            let err = this.validate()
            if (err!="") {
                this.$notify("error",err)
                return
            }
            this.problem.background_html = this.$refs.bg.d_render
            this.problem.statement_html = this.$refs.st.d_render
            this.problem.input_html = this.$refs.input.d_render
            this.problem.output_html = this.$refs.output.d_render
            this.problem.hint_html = this.$refs.hint.d_render
            this.problem.examples_in = JSON.stringify(this.examples_in)
            this.problem.examples_out = JSON.stringify(this.examples_out)
            let form = new FormData()
            form.set("problem",JSON.stringify(this.problem))
            if(this.spj_file) form.set("spj_file",this.spj_file)
            this.$req.post("newProblem",form)
            .then(res=>{
                if(res.errno==undefined) {
                  this.$notify("success","新建成功")
                  this.$router.push({name:'problemInfo',params:{'index':res.index}})
                }
            })
          }
        },
    }
</script>

<style scoped>
.desc {
    background-color: #2db7f5;
    font-size: 20px;
    color: white;
    padding-left: 10px;
}
.item{
    color:black;
    font-size: 18px;
    margin-left: 20px;
}
</style>
