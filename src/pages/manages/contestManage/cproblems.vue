<template>
  <div v-if="loaded" class="q-pa-md" style="margin-left: 20px">
    <div class="text-h4 text-black">比赛:<span style="color: #C10015">{{this.id}}</span></div>
    <br>
    <div class="text-black">
      <div class="text-h5 text-red">说明</div>
      <div class="text-h6 q-gutter-sm q-mt-md q-mb-md">
        <div>1. 比赛题目数量不能超过26 </div>
        <div>2. 题目会自动生成连续标号,移除时也会自动跳整标号. 操作完之后提交方能生效</div>
        <div>3. 建议不要用公共题库的题目</div>
      </div>


      <div v-for="cnt in num" v-bind:key="cnt" class="row text-h6 q-gutter-md">
          <div class="q-gutter-md row">
              <div>
                <strong> <span style="color: red">*</span>题目标号:{{labels[cnt-1]}}</strong>
              </div>
              <div >
                <Input v-model="problems[cnt-1]" placeholder="Like U1000" style="width: 300px" @on-blur="searchProbelmTitle(cnt-1)"/>
              </div>
              <div >
                <div v-if="err[cnt-1]==0" style="color: red"> 请输入题号 </div>
                <div v-else-if="err[cnt-1]==1" style="color: red"> 找不到该题 </div>
                <div v-else style="color: green"> {{titles[cnt-1]}} </div>
              </div>
            <div v-if="($store.state.user.privilege&512)>0">
              <Button type="error" @click="removeProblem(cnt-1)"> 移除 </Button>
            </div>
          </div>
        <br>
      </div>
      <div class="row q-mt-lg" v-if="($store.state.user.privilege&512)>0">
        <Button type="success" @click="addProblem"> 添加题目 </Button>
        <Button type="error" @click="removeAllProblem" style="margin-left: 20px"> 移除全部 </Button>
      </div>

      <Button type="primary" size="large" @click="submit" class="q-mt-lg" v-if="($store.state.user.privilege&512)>0"> 提交 </Button>
    </div>
  </div>

</template>

<script>
  export default {
    data() {
      return {
        id:0,
        problems: [],
        labels: ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"],
        titles: [],
        err:[], //0未输入题目, 1找不到该题
        num: 0,
        loaded: false,
      }
    },
    methods: {
      addProblem() {
        if(this.num>=26) {
          alert("题目数量超出限制")
          return
        }
        this.problems.push("")
        this.titles.push("")
        this.err.push(0)
        this.num++
      },
      removeProblem(idx) {
        if(this.num==0) {
          this.$message("error","题目为空，无法移除")
          return
        }
        this.problems.splice(idx,1)
        this.titles.splice(idx,1)
        this.err.splice(idx,1)
        this.num--;
      },
      removeAllProblem() {
        this.num=0;
        this.problems = []
        this.titles = []
        this.err = []
      },
      searchProbelmTitle(idx) {
       if((this.$store.state.user.privilege&512)==0) return
        this.problems[idx] = this.problems[idx].trim()
        if(this.problems[idx] == '') {
          this.$set(this.err,idx,0)
          return
        }
        this.$req.get("searchProbelmTitle",{"index":this.problems[idx]})
          .then(res => {
            if(res.exist) {
              console.log(res.title)
              this.$set(this.titles,idx,res.title)
              this.$set(this.err,idx,2)
            } else {
              this.$set(this.titles,idx,"")
              this.$set(this.err,idx,1)
            }
          })
      },
      validate() {
        for(let i=0;i<this.num;i++) {
          if (this.err[i]==0 || this.err[i]==1) return "请修正题目错误"
        }
        return ""
      },
      submit() {
        let msg = this.validate()
        if(msg) {
          alert(msg)
          return
        }
        let formdata = new FormData()
        formdata.append("id",this.id)
        formdata.append("problems",JSON.stringify(this.problems))
        formdata.append("labels",JSON.stringify(this.labels.slice(0,this.num)))
        this.$req.post("addCproblems",formdata)
          .then(res => {
            if(res.errno==undefined) {
              this.$notify("success","提交成功")
            }
          })
      }
    },
    mounted() {
      if(this.$route.params.id) {
        this.id = this.$route.params.id
        this.$req.get("getCproblems",{id:this.id})
          .then(res => {
            if(res.errno == undefined) {
              this.num = res.num
              if (this.num) {
                this.problems = res.problems
                this.titles = res.titles
                for (let i = 0; i < this.num; i++)
                  this.err.push(2)
              }
              this.loaded = true
            }
          })
      } else {
        this.$router.push({name:"contestManage"})
      }
    }
  }
</script>
