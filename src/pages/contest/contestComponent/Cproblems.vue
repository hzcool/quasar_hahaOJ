<template>
  <q-card v-if="cproblems.length>0">

    <q-list separator class="q-ma-md q-mt-md">
      <q-item>
        <q-item-section> <div class="text-h6 text-purple"> Solved </div> </q-item-section>
        <q-item-section> <div class="text-h6 text-purple"> Label </div> </q-item-section>
        <q-item-section> <div class="text-h6 text-purple"> Title </div> </q-item-section>
        <q-item-section> <div class="text-h6 text-purple"> Ratio(AC/ALL) </div> </q-item-section>
      </q-item>
      <q-item v-if="cproblems.length == 0">
        <q-item-section class="text-h6"> <div class="row justify-center"> <span>暂无数据</span> </div></q-item-section>
      </q-item>
      <q-item v-else v-for="(row,idx) in cproblems" :key="idx">
        <q-item-section>
          <div v-if="row.solved==1"> <svg t="1594202140480" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3859" width="32" height="32"><path d="M758.616 315.112a29.36 29.36 0 0 0-45.736-9.488L437.416 544.816a2.896 2.896 0 0 1-3.968-0.168L335.264 443.44a29.376 29.376 0 0 0-47 6.624l-28.224 52.808a29.304 29.304 0 0 0 3.072 32.32l147.512 182.344a29.272 29.272 0 0 0 22.84 10.904h0.032a29.28 29.28 0 0 0 22.848-10.968l298.648-371.256a29.096 29.096 0 0 0 3.624-31.104z" fill="#AECD42" p-id="3860"></path><path d="M433.496 740.44h-0.08a41.064 41.064 0 0 1-32.136-15.384l-147.496-182.32a41.2 41.2 0 0 1-4.328-45.528l28.224-52.8c2.04-3.816 4.624-7.248 7.688-10.208a41.136 41.136 0 0 1 28.8-11.672c11.296 0 21.84 4.464 29.704 12.568l92.176 95.016 268.96-233.552a40.88 40.88 0 0 1 9.248-6.072 40.992 40.992 0 0 1 17.848-4.072 41.6 41.6 0 0 1 37.328 23.512 41.2 41.2 0 0 1-5.152 43.872L465.696 724.992a41.04 41.04 0 0 1-32.2 15.448z m-119.328-293.92a17.296 17.296 0 0 0-15.328 9.2l-28.224 52.808a17.248 17.248 0 0 0 1.808 19.088l147.528 182.368a17.2 17.2 0 0 0 13.464 6.456v12l0.032-12a17.2 17.2 0 0 0 13.528-6.472l298.664-371.28c4.24-5.192 5.08-12.368 2.176-18.336-4.032-8.416-14.728-12.272-23.192-8.216a16.928 16.928 0 0 0-3.856 2.536l-275.488 239.2c-5.864 5.024-15.136 4.552-20.408-0.832L326.656 451.8a17.24 17.24 0 0 0-12.488-5.28z" fill="#809626" p-id="3861"></path></svg> </div>
          <div  v-if="row.solved==2">  <svg t="1594202100000" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2962" width="32" height="32"><path d="M638.296 461L751.304 348a39.36 39.36 0 0 0 0-55.664L708.16 249.2a39.36 39.36 0 0 0-55.656 0L539.504 362.192 426.488 249.184a39.36 39.36 0 0 0-55.664 0.008l-43.136 43.128a39.352 39.352 0 0 0 0 55.664l113.008 113.008-113.008 113.016a39.352 39.352 0 0 0 0 55.664l43.136 43.152a39.384 39.384 0 0 0 55.664 0l113.008-113.016 113 113.016a39.392 39.392 0 0 0 55.672 0l43.144-43.152a39.376 39.376 0 0 0 0-55.672L638.296 461z" fill="#E22D2D" p-id="2963"></path><path d="M680.336 692.336a47.12 47.12 0 0 1-33.496-13.856L539.504 571.12l-107.36 107.36c-8.944 8.936-20.832 13.856-33.488 13.856s-24.544-4.92-33.488-13.856l-43.144-43.152a47.04 47.04 0 0 1-13.872-33.496c0-12.648 4.928-24.544 13.872-33.488l107.352-107.36-107.344-107.344a47.04 47.04 0 0 1-13.872-33.488c0-12.656 4.928-24.544 13.872-33.496l43.136-43.128a47.024 47.024 0 0 1 33.496-13.872c12.648 0 24.536 4.928 33.48 13.864l107.36 107.36 107.344-107.336c8.936-8.944 20.832-13.864 33.488-13.864s24.544 4.92 33.488 13.864l43.152 43.136a47.416 47.416 0 0 1 0 66.976L649.608 461l107.36 107.344a47.408 47.408 0 0 1 0 66.984l-43.144 43.152a47.088 47.088 0 0 1-33.488 13.856z m-140.832-143.84L658.16 667.168c11.84 11.832 32.512 11.832 44.36 0l43.144-43.152a31.416 31.416 0 0 0 0-44.36L626.984 461l118.664-118.656a31.408 31.408 0 0 0 0-44.352l-43.152-43.136c-11.832-11.84-32.512-11.84-44.344 0L539.504 373.504 420.832 254.84c-11.848-11.848-32.504-11.848-44.352 0.008l-43.136 43.128a31.144 31.144 0 0 0-9.184 22.176c0 8.376 3.264 16.248 9.184 22.168l118.664 118.664-118.664 118.68a31.12 31.12 0 0 0-9.184 22.168c0 8.384 3.264 16.256 9.184 22.176l43.136 43.152c11.84 11.832 32.504 11.832 44.352 0l118.672-118.664z" fill="#AF3737" p-id="2964"></path></svg> </div>
        </q-item-section>
        <q-item-section>
          <q-item-label>
            <q-btn style="font-size: 1rem"  flat rounded color="primary" :label="row.label" no-caps @click="$emit('getOneCproblem',row)"/>
          </q-item-label>
        </q-item-section>
        <q-item-section>
          <q-item-label>
            <q-btn style="font-size: 1rem"  dense flat rounded color="primary" :label="row.title" no-caps @click="$emit('getOneCproblem',row)"/>
          </q-item-label>
        </q-item-section>
        <q-item-section>
          <q-item-label>
            <q-chip :color="colorForRatio(row.ratio)" text-color="white" dense style="font-size: 1rem;width: 7.5rem" >
              {{100*row.ratio.toFixed(2)}}% ({{row.ac}}/{{row.all}})
            </q-chip>
          </q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </q-card>
</template>
<script>
  export default {
    props :['contest_id'],
    data() {
      return {
        cproblems:[],
        head: [
          {
            title:'Solved',
            slot : 'solved',
            width : '120px',
            align : 'center',
          },
          {
            title: 'Label',
            slot : 'label',
            width: '120px',
            align : 'center',
          },
          {
            title: 'Title',
            slot: 'title',
          },
          {
            title: 'Ratio(AC/ALL)',
            slot: 'ratio',
            align: 'center',
            width: '150px',
          }
        ],
        loading: false,
      }
    },
    methods:{
      colorForRatio(ratio) {
        if (ratio<=0.2)  return "red";
        if (ratio<=0.6)  return "orange";
        if (ratio<=0.8)  return "blue";
        return "green";
      },
    },
    mounted() {
      this.$req.get('loadCproblems',{'id':this.contest_id})
        .then(res => {
          if(res.errno==undefined) {
            this.cproblems = res.data;
          }
        })
    }
  }
</script>
<style>
  .problemtable .ivu-table-header th{
    background-color:#2db7f5;
    color: #fff;
  }
</style>
