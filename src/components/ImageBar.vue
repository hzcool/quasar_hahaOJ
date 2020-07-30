<template>
  <q-card style="width: 100%; height:100%;" class="q-pa-md" flat>
    <q-slide-transition :duration="1000" >
      <q-img
        :src="images[selectedIdx].src"
        spinner-color="white"
        class="rounded-borders"
        @mouseenter="enter()"
        @mouseleave="leave()"
        style="height: 100%;width: 100%"
      >
        <div class="absolute-bottom text-subtitle1 " v-if="is_hover">
          <div class="row justify-between">
            <q-btn @click="updateImage(-1)">
              <svg t="1594883098433" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6167" width="32" height="32"><path d="M274.510074 461.204104c130.168642-125.846196 260.332167-251.684206 390.490575-377.400442 53.595662-51.864228 133.49848 32.354895 79.653131 84.346013-115.838262 112.008027-231.6755 223.893256-347.450317 335.904353C513.596358 619.888196 629.989251 735.852324 746.444567 851.690586c52.978609 52.733015-26.921139 136.953162-79.712483 84.282568C535.946388 805.873074 405.233348 675.710572 274.510074 545.546024 252.90194 523.93789 252.342192 482.563574 274.510074 461.204104L274.510074 461.204104zM274.510074 461.204104" p-id="6168" fill="#1296db"></path></svg>
            </q-btn>
            <div> {{images[selectedIdx].caption}}</div>
            <q-btn @click="updateImage(1)">
              <svg t="1594883039995" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5376" width="32" height="32"><path d="M782.8 511.1 351.9 942c-22.8 22.8-59.8 22.8-82.6 0-22.8-22.8-22.8-59.8 0-82.6L617.5 511.1 269.2 162.8c-22.8-22.8-22.8-59.8 0-82.6 22.8-22.8 59.8-22.8 82.6 0L782.8 511.1 782.8 511.1zM782.8 511.1" p-id="5377" fill="#1296db"></path></svg>
            </q-btn>
          </div>
        </div>
      </q-img>
    </q-slide-transition>
  </q-card>
</template>

<script>
  export default {
    name:"ImageBar",
    data() {
      return {
        selectedIdx: 0,
        // images: [  { src:"5.jpg", caption:"我是程序员鼓励师"},{src:"6.jpg", caption:"我是程序员鼓励师"},{src:"7.jpg", caption:"我是程序员鼓励师"}],
        images: [
          {src:"https://www.helloimg.com/images/2020/07/27/13ac6912cfd8f6057.jpg",caption:"我是程序员鼓励师"},
          {src:"https://www.helloimg.com/images/2020/07/27/5fde26b51bfef4aac.jpg",caption:"坐车过来叮嘱你敲代码"},
          {src:"https://www.helloimg.com/images/2020/07/27/69173e35264f9c0de.jpg",caption:"你不敲代码我就将你一箭穿心"},
          {src:"https://www.helloimg.com/images/2020/07/27/70f4d975720588b68.jpg",caption:"你敲代码的样子真帅"},
          {src:"https://www.helloimg.com/images/2020/07/27/v2-cc1b824c4f68c46ff91ede0d2ff6d507_r48e446caf5213428.jpg",caption:"这棵树是线段树还是平衡树"},
          {src:"https://www.helloimg.com/images/2020/07/27/202362aeda60c113f.jpg",caption:"我好看还是代码好看"},
        ],
        is_hover:false,
      };
    },
    methods: {
      updateImage(d) {
        this.selectedIdx += d
        if (this.selectedIdx==-1) this.selectedIdx = this.images.length-1
        else if (this.selectedIdx==this.images.length) this.selectedIdx = 0
      },
      enter() {
        clearInterval(this.timer);
        this.is_hover = true
      },
      leave() {
        this.is_hover = false
        this.timer = setInterval(()=>{
          this.selectedIdx +=1
          if (this.selectedIdx>=this.images.length) this.selectedIdx = 0
        },3000);
      },
    },
    mounted() {
      this.timer = setInterval(()=>{
        this.selectedIdx +=1
        if (this.selectedIdx>=this.images.length) this.selectedIdx = 0
      },3000);
    },
    beforeDestroy:function(){
      if(this.timer){
        clearInterval(this.timer);
      }
    }
  };
</script>

<style>


</style>
