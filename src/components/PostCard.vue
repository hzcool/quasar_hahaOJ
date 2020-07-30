<template>
  <div  class="q-gutter-sm text-center text-black">
    <div v-if="post_list.length == 0">
      <q-img src="https://www.helloimg.com/images/2020/07/27/sad68860b1448aa374e.jpg"   style="width: 300px; height: 400px;"/>
      <div class="text-h5">还没有发表过呢</div>
    </div>
    <div class="row justify-center q-gutter-md">
      <q-card v-for="(item,idx) in post_list" :key="idx" class="row" style="width: 70rem" >
        <q-item class="col-6">
          <div class="inline text-h6 text-red">
            <q-chip v-if="item.index" color="teal" text-color="white" > {{item.index}} </q-chip>
            <q-btn v-if="item.kind=='solution'" flat :label="item.title" size="20px" @click="$emit('enter',item)"> <q-tooltip> 前台查看</q-tooltip> </q-btn>
            <q-btn v-else flat :label="item.head" size="20px" @click="$emit('enter',item)"> <q-tooltip> 前台查看</q-tooltip> </q-btn>

            <Tag v-for="(tag,idx) in item.tags" :key="idx" :color="tag.color"> {{tag.label}} </Tag>
          </div>
        </q-item>
        <q-item class="col-4">
          <q-item-section>
            <q-item-label caption>创建于 {{item.created_at}}</q-item-label>
          </q-item-section>
          <q-item-section>
            <q-item-label > <q-btn flat label="修改" color="orange" @click="$router.push({name:'onePost',params:{'post_id':item.post_id}})"/> </q-item-label>
          </q-item-section>
        </q-item>
        <q-item class="col-2">
          <q-item-section>
            <q-item-label> <q-btn flat color="black" icon="thumb_up" dense /> </q-item-label>
            <q-item-label> {{item.good_count}} </q-item-label>
          </q-item-section>
          <q-item-section >
            <q-item-label> <q-btn flat color="black" icon="thumb_down" dense /></q-item-label>
            <q-item-label> {{item.bad_count}} </q-item-label>
          </q-item-section>
          <q-item-section >
            <q-item-label> <q-btn flat color="black" icon="chat" dense /> </q-item-label>
            <q-item-label> {{item.reply_count}} </q-item-label>
          </q-item-section>
        </q-item>
      </q-card>
    </div>
  </div>
</template>
<script>
    export default {
        name: "PostCard",
        props: ['post_list'],
        data() {
          return {
            my_avatar:"",
          }
        },
    }
</script>

<style scoped>

</style>
