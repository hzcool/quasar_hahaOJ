<template>
  <div>
    <show-post :post_id="blog_id"/>
  </div>
</template>

<script>
    import showPost from "../../components/showPost";
    export default {
        name: "Blog",
        components: {showPost},
        data () {
          return {
            blog_id:0
          }
        },
        mounted() {
            this.blog_id = this.$route.params.blog_id
            if (this.blog_id == undefined) {
              this.$router.push({name: 'home'})
            }
        }
    }
</script>

<style scoped>

</style>
