<template>
    <div class="q-pa-md text-black">
      <div class="text-h4">创建比赛</div>
      <div class="q-mt-lg">
        <div class="desc" > 是否创建公开赛 </div>
        <div class="q-gutter-md q-mt-sm">
          <q-radio v-model="contest.is_public" :val="false" label="不公开" color="Orange" dense/>
          <q-radio v-model="contest.is_public" :val="true" label="公开" color="cyan" dense />
        </div>
        <div v-if="!contest.is_public" class="row q-mt-md">
          <div class="col-2">
              <span style="color: red">*</span><strong>比赛密码</strong>
          </div>
          <Input  placeholder="输入比赛密码" type="password" password style="width: 300px" v-model="contest.password"/>
        </div>
        <q-separator class="q-mt-md"/>
      </div>
      <div class="desc q-mt-md" > 赛制 </div>
      <div class="q-gutter-md q-mt-sm">
        <q-radio v-model="contest.format" val="OI" label="OI" color="Orange" dense/>
        <q-radio v-model="contest.format" val="ACM" label="ACM" color="cyan" dense />
      </div>
      <q-separator class="q-mt-md"/>
      <div class="desc q-mt-md" > 比赛信息 </div>
      <div class="row q-mt-md">
        <div class="col-2">
          <span style="color: red">*</span><strong>作者</strong>
        </div>
          <Input  placeholder="输入作者" style="width: 300px" v-model="contest.author"/>
      </div>
      <q-separator class="q-mt-md"/>
      <div class="row q-mt-md">
        <div class="col-2">
          <span style="color: red">*</span><strong>比赛标题</strong>
        </div>
          <Input  placeholder="输入标题" style="width: 300px" v-model="contest.title"/>
      </div>
      <q-separator class="q-mt-md"/>
      <div class="row q-mt-md">
        <div class="col-2">
          <strong>比赛描述</strong>
        </div>
          <Input  style="width: 600px" type="textarea" placeholder="输入比赛描述" :autosize="{minRows: 4,maxRows: 6}" v-model="contest.desc"/>
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
      </div>
      <q-separator class="q-mt-md"/>
      <Button type="primary" size="large" @click="submit" class="q-mt-md "> 提交 </Button>
    </div>

</template>

<script>
    export default {
        name: "newContest",
        data() {
          return {
            contest: {
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
          }
        },
      methods: {
        // 2020-03-09T18:10:00+08:00
        beginChange(datetime) {
          this.contest.begin = new Date(datetime)
        },
        endChange(datetime) {
          this.contest.end = new Date(datetime)
        },

        seTimetDefault() {
          let tmp = new Date();
          tmp.setDate(tmp.getDate()+1);
          this.contest.begin = new Date(tmp.getFullYear(),tmp.getMonth(),tmp.getDate());
          this.contest.end = new Date(this.contest.begin);
          this.contest.end.setHours(this.contest.end.getHours()+5);
        },

        validate() {
          if (this.contest.is_public == false && this.contest.password=='') return "密码不能为空"
          if (this.contest.author == '') return  "作者不能为空"
          if (this.contest.title == '') return  "标题不能为空"
          let now = new Date()
          if (this.contest.begin <= now) return "考试开始时间必须大于当前时间"
          if (this.contest.end <= this.contest.begin) return "考试结束时间必须晚于当前时间"
          return  ""
        },
        submit() {
          let err = this.validate()
          if(err) {
            this.$notify("error",err)
            return
          }
          let form = new FormData()
          form.set("contest",JSON.stringify(this.contest))
          this.$req.post("newContest",form)
            .then(res => {
              if(res.errno==undefined) {
                  this.$notify("success","提交成功")
              }
            })
        }
      },
      mounted() {
        this.seTimetDefault()
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
