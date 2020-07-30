<template>
  <div>
    <show-post :post_id="puzzle_id"/>
  </div>
</template>

<script>
  import showPost from "../../components/showPost";
  export default {
    name: "oneDiscussion",
    components: {showPost},
    data () {
      return {
          puzzle_id : 0,
      }
    },
    mounted() {
       if (this.$route.params.puzzle_id == undefined) {
          this.$router.push({name:'home'})
       }
       this.puzzle_id = this.$route.params.puzzle_id
    },
  }
</script>

<style scoped>

</style>
