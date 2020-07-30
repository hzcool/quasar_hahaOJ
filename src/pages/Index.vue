<template>
  <q-page class="row justify-center q-mt-md" style="min-height: 2000px;">
    <div style="width:1400px; height:500px;">
      <ImageBar  />
      <div class="q-mt-lg row justify-between">
        <q-card flat  style="width: 600px">
          <q-card-section>
            <div class="text-h6 text-black"> 本站公告 </div>
          </q-card-section>
          <q-separator dark inset />
          <q-card-section v-if="task.length==0">
            暂无作业
          </q-card-section>
        </q-card>

        <q-card flat  style="width: 600px">
          <q-card-section>
            <div class="text-h6 text-black"> 作业通知 </div>
          </q-card-section>
          <q-separator dark inset />
          <q-card-section v-if="announcement.length==0">
              暂无公告
          </q-card-section>
        </q-card>

      </div>

    </div>
  </q-page>
</template>

<script>
  import ImageBar from "../components/ImageBar";
export default {
  name: 'PageIndex',
  components:{ImageBar},
  data() {
    return {
      announcement:[],
      task:[],
    }

  },
}
</script>
