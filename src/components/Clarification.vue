<template>
  <div v-if="clarifications.length>0">
    <div class="q-mt-md text-h6 text-black"> 通告 </div>
    <q-card flat bordered v-for="(item,idx) in clarifications" :key="idx" class="q-mt-lg q-pa-md">
      <div class="row">
        <span class="text-h6 text-red col-6">{{item.head}}</span>
        <span class="text-orange"> {{item.created_at}} </span>
      </div>
      <div class="q-pl-md">
        <div v-html="item.content_html" class="q-mt-md text-black" style="font-size: 18px"> </div>
      </div>
    </q-card>
  </div>
</template>

<script>
    export default {
        name: "Clarification",
        props:['clarifications'],
    }
</script>

<style scoped>

</style>
