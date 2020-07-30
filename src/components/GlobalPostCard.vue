<template>
  <div  class="row justify-center">
    <div  flat bordered>
      <div v-if="post_list.length<=0">
        <q-card flat bordered style="width: 1100px">
          <q-card-actions class="row justify-center">
            <q-img src="https://www.helloimg.com/images/2020/07/27/no_commentc6a51e149a2749bb.jpg"   style="width:500px; height: 350px;"/>
          </q-card-actions>
          <q-card-actions class="row justify-center">
            <div class="text-h4"> 空空如也 </div>
          </q-card-actions>
        </q-card>
      </div>

      <div class="row justify-center q-gutter-md" v-else>
        <q-card v-for="(item,idx) in post_list" :key="idx" class="row" style="width: 1100px">
          <q-item class="col-2">
            <q-item-section>
              <q-item-label>
                <q-chip>
                  <q-avatar size="40px"> <img :src="item.avatar"> </q-avatar>
                  {{item.author}}
                </q-chip>
              </q-item-label>
              <q-item-label caption class="q-ml-md"> {{item.created_at}}</q-item-label>
            </q-item-section>
          </q-item>
          <q-item class="col-8">
            <div class="inline text-h6 text-red">
              <q-btn flat :label="item.head" size="20px" @click="$emit('enter',item)"> <q-tooltip> 进入 </q-tooltip> </q-btn>
              <Tag v-for="(tag,idx) in item.tags" :key="idx" :color="tag.color"> {{tag.label}} </Tag>
            </div>
          </q-item>
          <q-item class="col-2">
            <q-item-section>
              <q-item-label> <q-btn flat color="black" icon="thumb_up" dense /> </q-item-label>
              <q-item-label class="q-ml-sm"> {{item.good_count}} </q-item-label>
            </q-item-section>
            <q-item-section >
              <q-item-label> <q-btn flat color="black" icon="thumb_down" dense /></q-item-label>
              <q-item-label class="q-ml-sm"> {{item.bad_count}} </q-item-label>
            </q-item-section>
            <q-item-section >
              <q-item-label> <q-btn flat color="black" icon="chat" dense /> </q-item-label>
              <q-item-label class="q-ml-sm"> {{item.reply_count}} </q-item-label>
            </q-item-section>
          </q-item>
        </q-card>
      </div>
      <Page
        :current.sync="current"
        :total = "10000000"
        :page-size="page_size"
        @on-change="get_posts"
        class="float-right q-mt-md"
      >
      </Page>
    </div>
  </div>
</template>

<script>
  export default {
    name: "GlobalPostCard",
    props:['post_list'],
    data() {
      return{
        page_size: 10,
        current:1,
      }
    },
    methods:{
      get_posts() {
        let l = this.page_size*(this.current-1) + 1
        let r = l + this.page_size -1
        this.$emit("getPosts",l,r)
      }
    },
  }
</script>

<style scoped>

</style>
