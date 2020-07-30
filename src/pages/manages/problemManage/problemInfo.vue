<template>
<div>
  <div class="q-ma-md" v-if="loaded">
    <h3 class="q-ma-md">题号: <span style="color: #C10015">{{index}}</span></h3>
    <div class="q-mt-md q-gutter-md">
      <div class="desc" > 版权信息 </div>
      <div class="row">
        <div class="col-2 item"> 作者 </div>
        <Input  style="width: 300px" v-model="problem.author"/>
        <Button type="primary" ghost class="q-ml-md" @click="update('author',problem.author)"> 确认修改 </Button>
      </div>
      <q-separator />
      <div class="row">
        <div class="col-2 item"> 来源 </div>
        <Input  style="width: 300px" v-model="problem.source" />
        <Button type="primary" ghost class="q-ml-md" @click="update('source',problem.source)"> 确认修改 </Button>
      </div>
      <q-separator />
    </div>
    <div class="desc q-mt-md"> 是否公开 </div>
    <div class="text-black q-gutter-md q-mt-sm " style="font-size: 18px;margin-left: 0px">
      <q-radio v-model="problem.is_open" :val="false" label="隐藏" color="orange" dense disable/>
      <q-radio v-model="problem.is_open" :val="true" label="公开" color="cyan" dense disable/>
      <q-separator />
    </div>

    <div class="q-mt-md q-gutter-md">
      <div class="desc" > 题目信息 </div>
      <div class="text-black q-gutter-md" style="font-size: 18px">
        <q-radio v-model="problem.is_spj" :val="false" label="正常题" color="orange" dense />
        <q-radio v-model="problem.is_spj" :val="true" label="特判题" color="cyan" dense />
        <Button type="primary" ghost class="q-ml-md" @click="spjUpdate"> 确认修改 </Button>
      </div>
      <div v-if="problem.is_spj">
        <div class="row">
          <Upload action="#" :before-upload = "before_upload" type="drag"  class="col-2">
            <Button icon="ios-cloud-upload-outline" type="success" style="float: left" size="large" long>上传(spj.c, spj.cpp, spj.py)</Button>
          </Upload>
          <div class="q-ml-lg text-orange" v-if="problem.spj_type!=''"> 后台存在特判文件 </div>

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
        <Button type="primary" ghost class="q-ml-md" @click="update('title',problem.title)"> 确认修改 </Button>
      </div>
      <q-separator />
      <div class="row">
        <div class="col-2 item"> <span style="color: red">*</span>时间限制(MS) </div>
        <InputNumber :max="40000"  v-model="problem.time_limit"  style="width: 150px"></InputNumber>
        <Button type="primary" ghost class="q-ml-md" @click="update('time_limit',problem.time_limit)"> 确认修改 </Button>
      </div>
      <q-separator />
      <div class="row">
        <div class="col-2 item"> <span style="color: red">*</span>空间限制(MB) </div>
        <InputNumber :max="2048"  v-model="problem.memory_limit"  style="width: 150px"></InputNumber>
        <Button type="primary" ghost class="q-ml-md" @click="update('memory_limit',problem.memory_limit)"> 确认修改 </Button>
      </div>
      <q-separator />
      <div class="row">
        <div class="col-2">
          <div class="item">背景说明</div>
          <Button type="primary" ghost class="q-ml-md q-mt-md" @click="updateKeys(['background','background_html'],[problem.background,$refs.bg.d_render])"> 确认修改 </Button>
        </div>
        <mavon-editor v-model="problem.background" class="col-10" ref="bg"/>
      </div>
      <q-separator />
      <div class="row">
        <div class="col-2">
            <div class="item">题面说明</div>
            <Button type="primary" ghost class="q-ml-md q-mt-md" @click="updateKeys(['statement','statement_html'],[problem.statement,$refs.st.d_render])"> 确认修改 </Button>
        </div>
        <mavon-editor v-model="problem.statement" class="col-10" ref="st"/>
      </div>
      <q-separator />
      <div class="row">
        <div class="col-2">
          <div class="item">输入说明</div>
          <Button type="primary" ghost class="q-ml-md q-mt-md" @click="updateKeys(['input','input_html'],[problem.input,$refs.input.d_render])"> 确认修改 </Button>
        </div>
        <mavon-editor v-model="problem.input" class="col-10" ref="input"/>
      </div>
      <q-separator />
      <div class="row">
        <div class="col-2">
          <div class="item">输出说明</div>
          <Button type="primary" ghost class="q-ml-md q-mt-md" @click="updateKeys(['output','output_html'],[problem.output,$refs.output.d_render])"> 确认修改 </Button>
        </div>
        <mavon-editor v-model="problem.output" class="col-10" ref="output"/>
      </div>
      <q-separator />
      <div class="row">
        <div class="col-2">
          <div class="item">提示</div>
          <Button type="primary" ghost class="q-ml-md q-mt-md" @click="updateKeys(['hint','hint_html'],[problem.hint,$refs.hint.d_render])"> 确认修改 </Button>
        </div>
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
        <Button size="large" type="error"  class="q-ml-md" @click="removeExample"> 减少样例 </Button>
        <Button size="large" type="primary" ghost class="q-ml-md" @click="updateKeys(['examples_in','examples_out'],[JSON.stringify(examples_in),JSON.stringify(examples_out)])"> 确认修改 </Button>
      </div>
    </div>
    <q-separator class="q-mt-md"/>
  </div>
</div>
</template>

<script>
    export default {
        name: "ProblemInfo",
        data() {
          return {
              problem:null,
              loaded:false,
              index:"",
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
            spjUpdate() {
              if (this.problem.is_spj) {
                if (this.spj_file == null) {
                  this.$notify("error","特判文件不能为空")
                  return
                }
                let name = this.spj_file.name
                let spj_type = ""
                if (name == "spj.c") spj_type = "C";
                else if (name == "spj.cpp") spj_type = "C++";
                else if (name == "spj.py") spj_type = "Python3";
                else {
                  this.$notify("error","特判文件名或类型不对")
                  return
                }
                let form = new FormData()
                form.set("index",this.index)
                form.set("spj_type",spj_type)
                form.set("spj_file",this.spj_file)
                this.$req.post("addSpjFile",form)
                .then(res=> {
                  if (res.errno==undefined) {
                      this.spj_file = null
                      this.problem.spj_type = spj_type
                  }
                })
              } else {
                this.problem.spj_type = ''
                this.spj_file = null
                let obj = {}
                obj["spj_type"] = ''
                obj["is_spj"] = false
                this.toUpdate(obj)
              }
            },

            updateKeys(keys,values) {
                let obj = {}
                keys.forEach((item,index) => {
                    obj[item] = values[index]
                })
                this.toUpdate(obj)
            },
            update(key,value) {
                let obj = {}
                obj[key] = value
                this.toUpdate(obj)
            },
            toUpdate(obj) {
              let form = new FormData()
              form.set("json",JSON.stringify(obj))
              form.set("index",this.index)
              this.$req.post("updateProblemByJson",form)
                .then(res=> {
                  if(res.errno==undefined) {
                    this.$notify("success","修改成功")
                  }
                })
            }
        },
        mounted() {
            this.index = this.$route.params.index
            if(this.index == undefined) {
              this.$notify("error","错误的题号")
              this.$router.push({name:"admin"})
            }
            setTimeout(()=>{
              this.$req.get("getProblemAllInfo",{"index":this.index})
                .then(res=> {
                  if (res.errno == undefined) {
                    this.problem = res.problem
                    if (this.problem.examples_in) this.examples_in = JSON.parse(this.problem.examples_in)
                    if(this.problem.examples_out) this.examples_out = JSON.parse(this.problem.examples_out)
                    this.loaded = true
                  }
                }),500
            })
          }
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
