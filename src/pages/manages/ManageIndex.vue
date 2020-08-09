

<template>
  <q-page class="row justify-center q-mt-md" style="min-height: 1000px;">
    <div style="width:1400px; height:500px;">
      <ImageBar  />
    </div>
  </q-page>
</template>

<script>
  import ImageBar from "components/ImageBar";
  export default {
    name: "index",
    components:{ImageBar},
  }
</script>

<style scoped>

</style>
