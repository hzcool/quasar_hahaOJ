<template>
  <div class="text-black" style="font-size: 1.2rem" v-if="info">
    <div class="text-center">
      <div class="text-h4">{{info.index}} <span style="color: firebrick;margin-left: 20px">{{info.title}}</span></div>
      <div class="text-h5"><span style="color: green">时间限制 </span>{{info.time_limit}}MS <span style="color: green;margin-left: 30px;">空间限制 </span>{{info.memory_limit}}MB</div>
    </div>
    <div v-if="info.background_html && info.background_html!=''">
      <div class="head-color text-h6">背景说明</div>
      <div v-html="info.background_html" class="q-ml-md q-mt-md"> </div>
    </div>
    <br>
    <div class="head-color text-h6">题目描述</div>
    <div v-html="info.statement_html" class="q-ml-md q-mt-md"> </div>
    <br>

    <div class="head-color text-h6">输入说明</div>
    <div v-html="info.input_html" class="q-ml-md q-mt-md"> </div>
    <br>

    <div class="head-color text-h6">输出说明</div>
    <div v-html="info.output_html" class="q-ml-md q-mt-md"> </div>
    <br>

    <div v-for="i in info.examples_in.length" v-bind:key="i" class="row  items-start q-mt-md">
      <div class="col-4">
        <div>
          <span class="head-color text-h6" > 样例输入<span v-if="info.examples_in.length>1">{{i}}</span></span>
          <q-btn flat color="deep-orange" label="复制" @click="copy(info.examples_in[i-1])"/>
        </div>
        <q-input square outlined v-model="info.examples_in[i-1]" readonly autogrow />
      </div>
      <div class="col-4 offset-4">
        <span class="head-color text-h6" > 样例输出<span v-if="info.examples_in.length>1">{{i}}</span> </span>
        <q-btn flat color="deep-orange" label="复制" @click="copy(info.examples_out[i-1])"/>
        <q-input square outlined v-model="info.examples_out[i-1]" readonly autogrow />
      </div>
    </div>
    <br>
    <div v-if="info.hint_html && info.hint_html!='' ">
      <div class="head-color text-h6">提示</div>
      <div v-html="info.hint_html" class="q-ml-md q-mt-md"> </div>
      <br>
    </div>
  </div>
</template>

<script>
  export default {
    name: "ProblemShow",
    props: ['info'],
    methods: {
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
    },
  }
</script>

<style scoped>
  .head-color{
    color: dodgerblue;
  }
  .mdClass{
    color: black;
    font-size: 16px;
  }
</style>
