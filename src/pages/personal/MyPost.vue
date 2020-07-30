<template>
  <div>
    <div class="text-center q-pa-lg q-gutter-lg text-h5 text-black" >
        <q-radio v-model="kind" val="blog" label="博客" color="orange" @input="get_blog_list"/>
        <q-radio v-model="kind" val="puzzle" label="求助(讨论)贴" color="red" @input="get_puzzle_list"/>
        <q-radio v-model="kind" val="solution" label="题解" color="cyan" @input="get_solution_list"/>
    </div>

    <div v-if="kind=='blog'" class="q-gutter-sm text-center text-black">
      <PostCard :post_list="blog_list" @enter="enterBlog"/>
    </div>

    <div v-else-if="kind=='puzzle'" class="q-gutter-sm text-center text-black">
      <PostCard :post_list="puzzle_list" @enter="enterPuzzle"/>
    </div>

    <div v-else>
      <PostCard :post_list="solution_list" @enter="enterSolution"/>
    </div>
  </div>
</template>

<script>
    import PostCard from "../../components/PostCard"
    export default {
        name: "MyPost",
      components:{PostCard},
        data() {
          return {
            blog_list: [],
            puzzle_list: [],
            solution_list: [],
            kind: 'blog',
            loaded_blog : false,
            loaded_puzzle: false,
            loaded_solution : false,
            my_avatar: '',
          }
        },
        methods: {
            get_blog_list() {
              if(this.loaded_blog) return
              this.$req.get("getUserPostList",{'kind':'blog'})
              .then(res=> {
                  if(res.errno == undefined) {
                      this.blog_list = res.data
                      for(let item of  this.blog_list) {
                        item.tags = JSON.parse(item.tags)
                      }
                  }
              })
              this.loaded_blog = true
            },

            get_puzzle_list() {
              if(this.loaded_puzzle) return
              this.$req.get("getUserPostList",{'kind':'puzzle'})
                .then(res=> {
                  if(res.errno == undefined) {
                    this.puzzle_list = res.data
                    for(let item of  this.puzzle_list) {
                      item.tags = JSON.parse(item.tags)
                    }
                  }
                })
              this.loaded_puzzle = true
            },

            get_solution_list() {
              if (this.loaded_solution) return
              this.$req.get("getUserPostList",{'kind':'solution'})
                .then(res=> {
                  if(res.errno == undefined) {
                    this.solution_list = res.data
                    console.log(this.solution_list )
                    for(let item of  this.solution_list) {
                      item.tags = JSON.parse(item.tags)
                    }
                  }
                })
              this.loaded_solution = true
            },
            enterBlog(blog) {
                this.$router.push({name:'blog',params:{'blog_id':blog.post_id}})
            },
            enterPuzzle(puzzle) {
              this.$router.push({name:'discussion',params:{'puzzle_id':puzzle.post_id}})
            },
            enterSolution(solution) {
                this.$router.push({name:'solutions',params:{'index':solution.index}})
            }
        },
        mounted() {
          this.get_blog_list()
        }

    }
</script>

<style scoped>

</style>
