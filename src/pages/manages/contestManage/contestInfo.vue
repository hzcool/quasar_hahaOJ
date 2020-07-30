<template>
  <div class="q-pa-md text-black" v-if="loaded">
    <div class="text-h4">比赛ID :<span>{{contest.id}}</span></div>
    <div class="q-mt-lg">
      <div class="desc" > 是否创建公开赛 </div>
      <div class="q-gutter-md q-mt-sm">
        <q-radio v-model="contest.is_public" :val="false" label="不公开" color="Orange" dense/>
        <q-radio v-model="contest.is_public" :val="true" label="公开" color="cyan" dense />
        <Button type="primary" ghost class="q-ml-md" @click="update(['is_public'],[contest.is_public])"> 确认修改 </Button>
      </div>
      <div v-if="!contest.is_public" class="row q-mt-md">
        <div class="col-2">
          <span style="color: red">*</span><strong>比赛密码</strong>

        </div>
        <Input  placeholder="输入比赛密码" type="password" password style="width: 300px" v-model="contest.password"/>
        <Button type="primary" ghost class="q-ml-md" @click="update(['is_public','password'],[contest.is_public,contest.password])"> 确认修改 </Button>
      </div>
      <q-separator class="q-mt-md"/>
    </div>
    <div class="desc q-mt-md" > 赛制 </div>
    <div class="q-gutter-md q-mt-sm">
      <q-radio v-model="contest.format" val="OI" label="OI" color="Orange" dense disable/>
      <q-radio v-model="contest.format" val="ACM" label="ACM" color="cyan" dense disable/>
    </div>
    <q-separator class="q-mt-md"/>
    <div class="desc q-mt-md" > 比赛信息 </div>
    <div class="row q-mt-md">
      <div class="col-2">
        <span style="color: red">*</span><strong>作者</strong>
      </div>
      <Input  placeholder="输入作者" style="width: 300px" v-model="contest.author"/>
      <Button type="primary" ghost class="q-ml-md" @click="update(['author'],[contest.author])"> 确认修改 </Button>
    </div>
    <q-separator class="q-mt-md"/>
    <div class="row q-mt-md">
      <div class="col-2">
        <span style="color: red">*</span><strong>比赛标题</strong>
      </div>
      <Input  placeholder="输入标题" style="width: 300px" v-model="contest.title"/>
      <Button type="primary" ghost class="q-ml-md" @click="update(['title'],[contest.title])"> 确认修改 </Button>
    </div>
    <q-separator class="q-mt-md"/>
    <div class="row q-mt-md">
      <div class="col-2">
        <strong>比赛描述</strong>
      </div>
      <Input  style="width: 600px" type="textarea" placeholder="输入比赛描述" :autosize="{minRows: 4,maxRows: 6}" v-model="contest.desc"/>
      <Button type="primary" ghost class="q-ml-md" @click="update(['`desc`'],[contest.desc])"> 确认修改 </Button>
    </div>
    <q-separator class="q-mt-md"/>
    <div class="row q-mt-md">
      <div class="col-2">
        <span style="color: red">*</span><strong>开始时间</strong>
      </div>
      <DatePicker :value="contest.begin" @on-change="beginChange" format="yyyy-MM-dd HH:mm:ss" type="datetime" ></DatePicker>
    </div>
    <div class="row q-mt-md">
      <div class="col-2">
        <span style="color: red">*</span><strong>结束时间</strong>
      </div>
      <DatePicker :value="contest.end" @on-change="endChange" format="yyyy-MM-dd HH:mm:ss" type="datetime" ></DatePicker>
      <Button type="primary" ghost class="q-ml-md" @click="updateTime()"> 确认修改 </Button>
    </div>
    <q-separator class="q-mt-md"/>
  </div>

</template>

<script>
  export default {
    name: "newContest",
    data() {
      return {
        contest: {
          id:0,
          is_public: false,
          password: '',
          format: 'OI',
          title: '',
          author: 'super_admin',
          desc: '',
          begin: '',
          end: '',
          status:'Pending',
        },
        begin :"",
        end:"",
        loaded:false,
      }
    },
    methods: {
      // 2020-03-09T18:10:00+08:00
      beginChange(datetime) {
        this.begin = datetime
        this.contest.begin = new Date(datetime)
      },
      endChange(datetime) {
        this.end = datetime
        this.contest.end = new Date(datetime)
      },
      updateTime() {
          if (this.begin!="" && this.end!=""){
              this.update(["begin","end"],[this.begin,this.end])
          } else if(this.begin!="") {
            this.update(["begin"],[this.begin])
          } else if(this.end!="") {
            this.update(["end"],[this.end])
          }
      },
      validate() {
        if (this.contest.is_public == false && this.contest.password=='') return "密码不能为空"
        if (this.contest.author == '') return  "作者不能为空"
        if (this.contest.title == '') return  "标题不能为空"
        if (this.contest.end <= this.contest.begin) return "考试结束时间必须晚于开始时间"
        return  ""
      },
      update(keys,values) {
        let err=this.validate()
        if(err != "") {
            this.$notify("error",err)
            return
        }
        let form = new FormData()
        form.set("id",this.contest.id)
        let obj = {}
        for (let i =0;i<keys.length;i++)
            obj[keys[i]] = values[i]
        form.set("update",JSON.stringify(obj))
        this.$req.post("updateContest",form)
        .then(res=>{
            if(res.errno==undefined) {
              this.$notify("success","修改成功")
            }
        })
      }
    },
    mounted() {
        if (this.$route.params.id == undefined) this.$router.push({name:"contestManage"})
        else {
          this.contest.id = this.$route.params.id
          this.$req.get("getContestInfo",{id:this.contest.id})
          .then(res=>{
              if(res.errno==undefined) {
                  this.contest = res.contest
                  this.loaded = true
              }
          })
        }
    }
  }

</script>

<style scoped>
  .desc {
    background-color: #2db7f5;
    font-size: 18px;
    color: white;
    padding-left: 10px;
  }
</style>
