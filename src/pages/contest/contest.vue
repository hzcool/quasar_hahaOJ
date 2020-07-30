<template>
  <div v-if="loaded"  class="row" style="width: 1801px">
    <div style="width: 160px;">
      <q-tabs
        v-model="pane"
        vertical
        class="text-teal q-mt-md"
        indicator-color="purple"
        active-color="primary"
      >
        <q-tab name="contestInfo" icon="event" label="比赛说明" />
        <q-tab name="cproblems" icon="help" label="题目列表" />
        <q-tab name="csubmissions" icon="list" label="提交列表" />
        <q-tab name="ranklist"  icon="assessment" label="排行榜"/>
        <div class="q-mt-lg">
          <div class="text-h6 text-center text-black  " >
            <q-icon color="blue" name="alarm" size="1.5rem" class="q-mb-xs"/>{{countdownMsg}}
          </div>
          <div style="font-size: 1.2rem;color: red;text-align: center" v-if="!isEnded">
            <count-down
              @start_callback="toStart"
              @end_callback="toEnd"
              :startTime="contest.begin.getTime()"
              :endTime="contest.end.getTime()"
              :currentTime="contest.now"
              :tipText="'开始倒计时'"
              :tipTextEnd="'结束倒计时'"
              :endText="'比赛已结束'"
              :dayTxt="'天'"
              :hourTxt="':'"
              :minutesTxt="':'"
              :secondsTxt="''"
            />
          </div>
        </div>
      </q-tabs>

    </div>

    <div class="row justify-center" style="width: 1640px">
      <q-tab-panels v-model="pane" animated @transition="changeTab" style="background-color: #f1f3f6">
        <q-tab-panel name="contestInfo" >
          <ContestBaseInfo :contest="contest"/>
        </q-tab-panel>
        <q-tab-panel name="cproblems" style="width: 1400px;">
            <Cproblems :contest_id="contest.id" @getOneCproblem="getOneCproblem" v-if="canShow"/>
        </q-tab-panel>

        <q-tab-panel name="csubmissions" style="width: 1500px">
          <Csubmissions :contest="contest" ref="cs" :data="cs" @getCS="getCS" @gotoProblem="getOneCproblem" :canShow="canShow"/>
        </q-tab-panel>
        <q-tab-panel name="ranklist" style="width: 1500px;">
          <RankList :data="rankList" :columns="rankListColumn" v-if="canShow"/>
        </q-tab-panel>
        <q-tab-panel name="problem"  v-if="choose_problem">
            <Cproblem :id="contest.id" :label="choose_problem.label"/>
        </q-tab-panel>
      </q-tab-panels>
    </div>

  </div>

</template>

<script>
  import CountDown from 'vue2-countdown'
  import ContestBaseInfo from "./contestComponent/ContestBaseInfo"
  import Cproblems from "./contestComponent/Cproblems"
  import Csubmissions from "./contestComponent/Csubmissions"
  import Cproblem from "./contestComponent/Cproblem"
  import RankList from "./contestComponent/RankList"
  export default {
    components: {
      CountDown,
      ContestBaseInfo,
      Cproblems,
      Csubmissions,
      Cproblem,
      RankList
    },
    data() {
      return {
        contest: {
          begin: null,
          end: null,
          id: 0,
          title: '',
          length: 0,
          desc: '',
          author: '',
          type: '',
          format: '',
          status: '',
          now: 0
        },
        pane: 'contestInfo',
        loaded : false,

        labelList: [],

        canShow: false,
        isEnded : false,
        countdownMsg:"开始倒计时",

        problems: [],
        choose_problem: null,

        cs: [],
        lastGetCS:0,

        rankListColumn: [
          {
            title: 'Rank',
            key: 'rank',
            align : 'center',
            width : 50,
          },
          {
            title: 'Team',
            key: 'team',
            align: 'center',
          },
          {
            title: 'Score',
            key: 'score',
            align : 'center',
            width: 70,
          },
          {
            title: 'Solved',
            key: 'solved',
            align : 'center',
            width: 70,
          },
          {
            title: 'Penalty',
            key: 'penalty',
            align : 'center',
            width: 70,
          },
        ],
        rankList:[],
        lastGetRankList: 0,
      }
    },
    methods: {
      toStart() {
        this.canShow = true
        this.countdownMsg = "结束倒计时"
      },
      toEnd() {
        this.canShow = true
        this.isEnded = true
        this.countdownMsg = "比赛已结束"
      },
      changeTab(newValue,oldValue) {
        if(this.canShow) {
          let now = (new Date()).getTime()
          if (newValue=='csubmissions') {
            if (now - this.lastGetCS >= 30000) { this.lastGetCS = now;this.$refs.cs.searchCsubmissions() }
          }
          else if (newValue=='ranklist') {
            if (this.lastGetRankList==0) this.loadRankList()
            else if (now - this.lastGetRankList >= 60000) this.getRankList()
            this.lastGetRankList=now
          }
          if (newValue!='problem') this.choose_problem = null
        }
      },
      getContestContent() {
        this.$req.get('getContestContent',{'id':this.contest.id})
          .then(res => {
            if(res.errno == undefined){
              this.contest = res.contest
              this.contest.begin = new Date(this.contest.begin)
              this.contest.end = new Date(this.contest.end)
              this.loaded = true
            } else {
                this.$router.push({name:'home'})
            }
          })
      },

      loadRankList() {
        if (this.contest.format != "ACM") this.rankListColumn.splice(4,1)
        else this.rankListColumn.splice(2,1)
        this.$req.get('getCproblemLabels',{'id':this.contest.id})
          .then(res => {
            if(res.errno == undefined){
              for(let label of res.labels) {
                let obj = {}
                obj.title = label
                obj.key = label
                obj.width = 70
                obj.align = 'center'
                this.rankListColumn.push(obj)
              }
              this.getRankList()
            }
          })
      },

      getOneCproblem(problem) {
        this.choose_problem = problem
        this.pane = "problem"
      },
      getCS(data) {
        if(data) this.cs = data; else this.cs = []
      },
      getRankList() {
        this.$req.get("getRankList",{'id':this.contest.id})
          .then (res=>{
            if(res.errno==undefined) {
                this.rankList = res.data
                for (let row of this.rankList) {
                    let cellObj = {}
                    for(let key in row) {
                      let item = row[key]
                      if(item.minutes == undefined) continue
                      cellObj[key] = row[key+"_"]
                      let msg = ""
                      if(this.contest.format=="ACM") {
                         if (item.score == 100)  msg = (item.fail_times+1) + "/" + item.minutes
                          else msg = "(-"+item.fail_times+")"
                      } else {
                        if (item.score == 100) msg = 100 + "("+(item.fail_times+1)+")"
                        else msg = item.score + "(-"+item.fail_times+")"
                      }
                      row[key] = msg
                    }
                    row.cellClassName = cellObj
                }
            }
          })
      },
    },

    mounted() {
      setTimeout(()=>{
        this.contest.id = this.$route.params.id
        if(this.contest.id) {
          this.getContestContent()
        } else {
          this.$router.push({name:'contestset'})
        }
      },300)
    }
  }
</script>

<style scoped>
  .container {
    display: flex;
    align-items: center;        /* 垂直居中 */
    justify-content: center;    /* 水平居中 */
  }
</style>
