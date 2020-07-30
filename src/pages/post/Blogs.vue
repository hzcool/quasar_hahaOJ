<template>
    <div  class="q-pa-md row justify-center q-mt-lg">
      <GlobalPostCard :post_list="blog_list" @getPosts="get_posts" @enter="enter"/>
    </div>
</template>

<script>
    import GlobalPostCard from "../../components/GlobalPostCard";
    export default {
        name: "BlogIndex",
        components:{GlobalPostCard},
        data() {
          return{
            blog_list:[],
          }
        },
        methods:{
            get_posts(l,r) {
              this.$req.get("getPostList",{"kind":"blog","l":l,"r":r})
              .then(res=> {
                if(res.errno == undefined) {
                    this.blog_list = res.data
                    for(let item of  this.blog_list) {
                      if(item.tags!="") item.tags = JSON.parse(item.tags)
                      else item.tags = []
                    }
                }
              })
            },
            enter(post) {
                this.$router.push({name:'blog',params:{blog_id:post.post_id}})
            },
        },
        mounted() {
          setTimeout(this.get_posts(1,10),500)
        }
    }
</script>

<style scoped>

</style>
