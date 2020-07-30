<template>
  <div>
    <div class="bg-black text-white q-pa-md ">
      <div class="text-weight-bold float-left" style="font-size: 1rem">
        {{file}}
      </div>
      <div class="float-right">
        <q-btn style="color: yellow" label="复 制"  @click="copy(code)" dense class="q-ml-sm"/>
        <q-btn style="color: red" label="清 空"  @click="clear()" dense class="q-ml-sm"/>
      </div>
      <div class="float-right bg-grey">
        <q-select filled v-model="lang" :options="langList" dense />
      </div>
      <div style="clear:both"></div>
    </div>
    <codemirror
      v-model="code"
      :options="cmOptions"
    >
    </codemirror>
    <br>
  </div>
</template>

<script>

  import {codemirror} from 'vue-codemirror'
  import "codemirror/theme/colorforth.css"

  require("codemirror/mode/clike/clike.js")
  require("codemirror/mode/python/python.js")

  export default {
    components: {
      codemirror
    },
    data() {
      return {
        lang: "C++11",
        langList: ["C11","C++11","C++14","C++17","Python2","Python3","Java"],
        code: '',
        loading: false,
        file: 'main.cpp'
      }
    },
    methods:
      {
        copy(msg) {
          this.$copyText(msg).then( () => {
              this.$notify("success","复制成功")
              // console.log(e)
            }, () => {
            this.$notify("error","复制失败")
              // console.log(e)
            }
          );
        },
        clear() {
          this.code = ""
        },
      },
    computed: {
      cmOptions() {
        if(this.lang == "C11") this.file = "main.c";else this.file="main.cpp";
        let _mode = 'text/x-c++src';
        if (this.lang.substr(0,6) =="Python") {
          _mode = "python";
          this.file = "solution.py";
        } else if(this.lang.substr(0,4) == "Java") {
          _mode = "text/x-java"
          this.file = "Main.java"
        }
        return {
          tabSize: 4,
          theme: 'colorforth',
          lineNumbers: true,
          indentUnit:4,
          autofocus: true,
          mode: _mode,
        }
      },
    },

  }
</script>


<style>
  .height {
    min-height: 5rem;
  }
</style>
