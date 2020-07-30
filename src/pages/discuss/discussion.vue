<template>
  <div>
    <div class="row justify-center">
      <div class="row q-mt-lg" style="width: 600px">
        <div class="col-6 text-h6 text-purple"> 快速进入某道题的所有讨论</div>
        <Input v-model="index" search enter-button placeholder="输入题目索引 如P1000..." class="col-6" @on-search="search"/>
      </div>
    </div>

    <div  class="q-pa-md row justify-center q-mt-lg">
      <GlobalPostCard :post_list="discuss_list" @getPosts="get_posts" @enter="enter"/>
    </div>

  </div>

</template>

<script>
  import GlobalPostCard from "../../components/GlobalPostCard";
    export default {
        name: "discussIndex",
      components:{GlobalPostCard},
        data() {
          return {
            index:"",
            discuss_list : [],
          }
        },
        methods: {
             search() {
               let v = this.index.trim()
               if (v!="") {
                   if (v[0]=='p') {
                     v = "P" + v.substr(1)
                   } else if(v[0]!='P') {
                     v = "P"+ v
                   }
               } else {
                 this.$notify("error","请输入题目索引")
                 return
               }
               this.$router.push({name:"discussProblem",params:{index:v}})
             },
          get_posts(l,r) {
            this.$req.get("getPostList",{"kind":"puzzle","l":l,"r":r})
              .then(res=> {
                if(res.errno == undefined) {
                  this.discuss_list = res.data
                  for(let item of  this.discuss_list) {
                    if(item.tags!="") item.tags = JSON.parse(item.tags)
                    else item.tags = []
                  }
                }
              })
          },
          enter(post) {
            this.$router.push({name:'discussion',params:{puzzle_id:post.post_id}})
          },

        },
      mounted() {
        setTimeout(this.get_posts(1,10),500)
      }
    }
</script>

<style scoped>

</style>
