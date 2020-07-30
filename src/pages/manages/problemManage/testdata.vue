<template>
<div class="q-ma-lg" v-if="loaded">
  <div class="q-pa-md">
    <div class="text-primary text-h4">{{index}} <span style="color: #C10015">{{title}}</span> </div>
    <div class="text-h5 text-black q-mt-lg">说明</div>
    <div class="text-black text-h6 q-gutter-md q-mt-md">
      <div>1.仅支持<span style="color: red">zip压缩包</span>文件</div>
      <div >2.多次导入,前面导入的文件会被删除</div>
      <div>3.输入输出可以文件名应该匹配,否则无法失败; 合法的输入文件后缀是.in，输出文件的后缀是.ans或者.out;输入输出文件名应该匹配,比如(1.in,1.out)、(data01.in.data01.ans)等, 提交到后台进行处理并重命名为测试号加后缀的文件格式</div>
      <q-separator />
    </div>
    <div class="q-gutter-md q-mt-md" v-if="($store.state.user.privilege&128)>0">
      <Upload

        :before-upload = "before_upload"
        type="drag"
        class="q-mt-md"
        style="width:200px;"
        action="//jsonplaceholder.typicode.com/posts/">
        <div style="padding: 20px 0">
          <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
          <p>选择文件</p>
        </div>
      </Upload>
      <div v-if="choose_file" class="text-black">
        {{choose_file.name}}
        <Button type="success" style="margin-left: 20px" @click="submit"> 上传 </Button>
        <Button type="error" style="margin-left: 20px" @click="remove_file"> 移除 </Button>
      </div>
      <q-separator class="q-mt-md" />
    </div>

    <div v-if="data.length" class="q-mt-md">
      <span style="font-size: 20px;color: black"> <strong>全部测试数据如下</strong></span>
      <Button type="primary" @click="download" style="float: right"> 下载数据 </Button>
      <Button type="error" @click="delTestdatas" style="float: right" class="q-mr-md" v-if="($store.state.user.privilege&8)>0"> 删除数据 </Button>
      <div style="clear: both;margin-top: 10px"></div>
      <Table border :columns="columns" :data="data" class="q-mt-md">
        <template slot-scope="{ row, index }" slot="action">
          <Button type="primary" size="small" style="margin-right: 5px"  :loading="loading" @click="showTestdata(row)">查看</Button>
        </template>
      </Table>
    </div>
    <Modal
      v-model="modal"
      :mask-closable="false"
      draggable scrollable
      style="width: 800px;"
    >
      <p style="color: red"> {{modal_input_name}} </p>
      <Input type="textarea" v-model="modal_input" :autosize="{minRows: 2,maxRows: 10}" readonly/>
      <div class="q-mt-md"> </div>
      <p style="color: red"> {{modal_output_name}} </p>
      <Input type="textarea" v-model="modal_output" :autosize="{minRows: 2,maxRows: 10}" readonly/>
    </Modal>

  </div>
</div>
</template>
<script>
    export default {
        name: "testdata",
        data() {
            return {
              index:"",
              title:"",
              loaded:false,
              data:[],
              choose_file: null,
              loading:false,
              columns: [
                {
                  title:"测试点",
                  key: "case_id",
                },
                {
                  title: "输入文件",
                  key: "input_name",
                },
                {
                  title: "输入文件大小",
                  key: "input_size",
                },
                {
                  title: "输出文件",
                  key: "output_name",
                },
                {
                  title: "输出文件大小",
                  key: "output_size",
                },
                {
                  title: "操作",
                  slot: "action",
                },
              ],
              modal:false,
              modal_input_name:"",
              modal_input:"",
              modal_output_name:"",
              modal_output:"",
            }
        },
        methods:{
          is_zip() {
              let name = this.choose_file.name
              let length = name.length
              if (name.substr(name.length-3,3) != "zip") return false
              return true
          },
          before_upload(file) {
            this.choose_file = file
            return false
          },
          remove_file() {
            this.choose_file = null
          },
           downFile(blob, fileName) {
              if (window.navigator.msSaveOrOpenBlob) {
                navigator.msSaveBlob(blob, fileName);
              } else {
                var link = document.createElement('a');
                link.href = window.URL.createObjectURL(blob);
                link.download = fileName;
                link.click();
                window.URL.revokeObjectURL(link.href);
              }
            },
            download() {
              let url = 'downloadDatas';
              let xhr = new XMLHttpRequest();
              xhr.open('post', url,true);
              xhr.responseType = 'blob';
              xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
              xhr.onreadystatechange = function () {
                if (xhr.readyState == 4 && xhr.status == 200) {
                  let name = xhr.getResponseHeader('Content-disposition');
                  let filename = name.substring(20, name.length);
                  let blob = new Blob([xhr.response]);
                  let link = document.createElement('a');
                  let url = URL.createObjectURL(blob);
                  link.style.display = 'none';
                  link.href = url;
                  link.download = filename;
                  document.body.appendChild(link);
                  link.click();
                }
                else if (xhr.readyState==4 && xhr.status!=200) {
                    this.$notify("error","请求失败")
                }
              }
              xhr.send("index="+this.index)
            },
            getTestdatas() {
              this.$req.get("getTestdatas",{"index":this.index})
              .then(res=>{
                  if(res.errno==undefined) {
                      this.data = res.data
                  }
              })
              this.loaded = true
            },
          delTestdatas() {
            this.$q.dialog({
              dark: true,
              title: '提醒',
              message: '你确定要删除全部测试数据吗?',
              cancel: true,
              ok:"确认",
              cancel:"取消"
            }).onOk(() => {
              this.$req.get("removeTestdatas",{"index":this.index})
                .then( res=> {
                    if(res.errno==undefined) {
                      this.data = []
                    }
                  }
                )
            }).onCancel(() => {
              // console.log('>>>> Cancel')
            })
          },
          showTestdata(row) {
            this.$req.get("showOneTestdata",{"index":this.index,"case_id":row.case_id})
              .then( res=> {
                  if(res.errno==undefined) {
                    this.modal_input_name = row.input_name
                    this.modal_output_name = row.output_name
                    this.modal_input = res.input
                    this.modal_output = res.output
                    this.modal = true
                  }
                }
              )
          },
          submit() {
              if(!this.is_zip()) {
                this.$notify("error","只能上传zip压缩包")
                  return
              }
              let form = new FormData()
              form.set('index',this.index)
              form.set('zip',this.choose_file)
              this.$req.post("uploadTestdatas",form)
              .then(res=> {
                  if(res.errno==undefined) {
                      this.getTestdatas()
                      this.remove_file()
                      this.$notify("success","上传成功")
                  }
              })
          },
        },
        mounted() {
          this.index = this.$route.params.index
          if(this.index == undefined) {
            this.$notify("error","错误的题号")
            this.$router.push({name:"admin"})
          }
          let form = new FormData()
          form.set("index",this.index)
          form.set("json",JSON.stringify(["title"]))
          this.$req.post("getOneProblemInfoByJson",form)
          .then(res=> {
              if(res.errno==undefined) {
                  this.title = res.data.title
                  this.getTestdatas()
              } else {
                this.$router.push({name:"admin"})
              }
          })
        }
    }
</script>

<style scoped>

</style>
