<template>
  <div v-if="loaded">
    <show-post :post_id="puzzle_id" />
  </div>
</template>

<script>
  import showPost from "../../components/showPost";
  export default {
    components: {showPost},
    data () {
      return {
        puzzle_id : 0,
        contest_id : 0,
        label:"",
        loaded:false,
      }
    },
    mounted() {
      if (this.$route.params.puzzle_id == undefined || this.$route.params.id == undefined || this.$route.params.label==undefined) {
        this.$router.push({name:'home'})
      }
      this.puzzle_id = this.$route.params.puzzle_id
      this.contest_id = this.$route.params.id
      this.label = this.$route.params.label
      this.$req.get("checkExistTeam",{"id":this.contest_id})
      .then(res=>{
          if (res.errno==undefined) {
              this.loaded = true
          } else {
            this.$router.push({name:'home'})
          }
      })

    },
  }
</script>

<style scoped>

</style>
