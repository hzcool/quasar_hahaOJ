<template>
  <div class="ranktable">
    <br>
    <Table :columns="columns"  :data="data" border size="small" class="small-table" />
  </div>
</template>

<script>
    export default {
        name: "RankList",
        props:['data','columns'],
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
