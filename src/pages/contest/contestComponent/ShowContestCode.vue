<style scoped>
</style>
<template>
  <div v-show="loaded">
    <div style="margin: 10px 20px;">
      <pre v-highlightjs="content"><code :class="lang"></code></pre>
    </div>
  </div>
</template>
<script>

  export default {
    data() {
      return {
        loaded:false,
        lang:"C++",
        run_id: 0,
        contest_id:"",
        content: "",
      }
    },
    mounted() {
      if(this.$route.params.run_id == undefined) return
      if(this.$route.params.contest_id == undefined) return
      this.run_id =  this.$route.params.run_id
      this.contest_id = this.$route.params.contest_id
      this.$req.get("showCsubmission",{"run_id":this.run_id,"id":this.contest_id})
        .then(res => {
          if (res.errno==undefined) {
            res = res.info
            this.content = "run_id: " + this.run_id + '\n' +
              "label: " +  res.label + '\n' +
              "Author: " + res.author + '\n' +
              "Language: " + res.lang + '\n' +
              "Status: " + res.status + '\n' +
              "Time: " + res.time + '\n' +
              'Memory: ' + res.memory + '\n' +
              "Code Length: " + res.length + '\n' +
              "submit time: " + res.created_at + '\n' +
              "compile_info: " + '\n' + res.compile_info + '\n' +
              "********************************************\n\n" +
              res.code
            if (res.lang=="C11") this.lang = "C"
            else if(res.lang.substr(0,6)=="Python") this.lang="Pyhton"
            else if(res.lang=="Java") this.lang="Java"
          }
          this.loaded = true
        })
    }
  }
</script>
