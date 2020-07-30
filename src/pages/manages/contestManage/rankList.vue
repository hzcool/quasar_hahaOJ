<template>
  <div class="ranktable q-pa-lg" v-if="data.length>0">
    <br>
    <Button type="error" @click="getRankList"> 刷新 </Button>
    <Table :columns="columns"  :data="data" border size="small" class="small-table q-mt-lg"/>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        contest_id:0,
        format:"ACM",
        data:[],
        columns:[
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
            width: 60,
          },
          {
            title: 'Solved',
            key: 'solved',
            align : 'center',
            width: 60,
          },
          {
            title: 'Penalty',
            key: 'penalty',
            align : 'center',
            width: 65,
          },
        ],
      }
    },
    methods:{
      loadRankList() {
        if (this.format != "ACM") this.columns.splice(4,1)
        else this.columns.splice(2,1)
        this.$req.get('forCproblemLabels',{'id':this.contest_id})
          .then(res => {
            if(res.errno == undefined){
              for(let label of res.labels) {
                let obj = {}
                obj.title = label
                obj.key = label
                obj.width = 70
                obj.align = 'center'
                this.columns.push(obj)
              }
              this.getRankList()
            }
          })
      },
      getRankList() {
        this.$req.get("forRankList",{'id':this.contest_id})
          .then (res=>{
            if(res.errno==undefined) {
              this.data = res.data
              for (let row of this.data) {
                let cellObj = {}
                for(let key in row) {
                  let item = row[key]
                  if(item.minutes == undefined) continue
                  cellObj[key] = row[key+"_"]
                  let msg = ""
                  if(this.format=="ACM") {
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
        this.contest_id = this.$route.params.id
        this.format = this.$route.params.format
        if(this.contest_id && this.format) {
          this.loadRankList()
        } else {
          this.$router.push({name:'contestManage'})
        }
    }
  }
</script>

<style scoped>

</style>
<style>
  .ranktable .ivu-table-header th{
    background-color:#85144b;
    color: #fff;
    font-size: 16px;
  }
  .ranktable .ivu-table td{
    color: black;
    font-size: 16px;
  }
  .ranktable .ivu-table .FirstBlood{
    background-color: #006000;
    color: #fff;
  }
  .ranktable .ivu-table .AC{
    background-color: #00BB00;
    color: #fff;
  }
  .ranktable .ivu-table .WA{
    background-color: red;
    color: #fff;
  }
  .ranktable .small-table .ivu-table-cell {
    padding: 0px 0px;
  }

</style>
