<template>
  <q-layout view="hHh lpR fFf" v-if="loaded">
    <q-header elevated class="bg-purple text-white">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo/svg/quasar-logo.svg">
          </q-avatar>
          <span class="q-ml-md"> 个人中心 </span>
        </q-toolbar-title>
        <q-btn flat color="white" label="返回网站首页" @click="$router.push({name:'home'})"/>
      </q-toolbar>
    </q-header>

    <q-drawer
      show-if-above
      v-model="drawer"
      :mini="miniState"
      @mouseover="miniState = false"
      @mouseout="miniState = true"

      :width="200"
      :breakpoint="500"
      bordered
      content-class="bg-grey-3"
    >
      <q-scroll-area class="fit">
        <q-list padding class="q-gutter-md">

          <q-item clickable v-ripple class="q-mt-lg"  @click="changeTo('personalHome')">
            <q-item-section avatar>
              <svg t="1593000129721" class="icon" viewBox="0 0 1319 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7108" width="32" height="32"><path d="M1245.645022 582.18759L670.845599 125.598846c-5.910534-5.910534-13.298701-7.388167-17.731602-7.388168s-11.821068 1.477633-17.731602 7.388168l-2.955267 2.955267L76.836941 580.709957l-76.836941-88.658009L554.112554 39.896104C580.709957 14.776335 616.17316 0 653.113997 0s72.40404 13.298701 97.52381 39.896104l568.888889 450.678211-73.881674 91.613275z" p-id="7109" fill="#13227a"></path><path d="M663.457431 175.838384S181.748918 549.679654 181.748918 573.321789v406.349207c0 23.642136 19.209235 42.851371 42.851371 42.851371h325.079365V693.010101H768.369408v330.989899h325.079365c23.642136 0 42.851371-19.209235 42.851371-42.851371V574.799423c1.477633-25.119769-472.842713-398.961039-472.842713-398.961039z" p-id="7110" fill="#13227a"></path></svg>
            </q-item-section>
            <q-item-section class="text-black">
              个人中心主页
            </q-item-section>
          </q-item>

          <q-item clickable v-ripple class="q-mt-lg" @click="changeTo('myPost')">
            <q-item-section avatar>
              <svg t="1592998871568" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4053" width="32" height="32"><path d="M320 864 320 0l480 0 0 192 0 32L1024 224l0 640L320 864zM928 320l-512 0 0 32 512 0L928 320zM928 448l-512 0 0 32 512 0L928 448zM928 576l-512 0 0 32 512 0L928 576zM928 704l-512 0 0 32 512 0L928 704zM832 0l19.2 0L1024 160 1024 192l-192 0L832 0zM288 896l320 0L704 896l0 128L0 1024 0 160l288 0 0 320-192 0L96 512l192 0 0 96-192 0L96 640l192 0 0 96-192 0L96 768l192 0 0 96-192 0L96 896 288 896z" p-id="4054" fill="#13227a"></path></svg>
            </q-item-section>
            <q-item-section class="text-black">
              我的文章
            </q-item-section>
          </q-item>

          <q-item clickable v-ripple @click="changeTo('newPost')">
            <q-item-section avatar>
              <svg t="1592998765085" class="icon" viewBox="0 0 1147 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2322" width="32" height="32"><path d="M0 956.865864 1146.877993 956.865864 1146.877993 1020.7232 0 1020.7232 0 956.865864ZM0 912.775537 300.529213 827.452006 85.868257 614.103613 0 912.775537ZM802.673951 328.370422 588.010209 115.019284 115.744481 584.378491 330.405437 797.708861 802.673951 328.370422ZM902.442885 149.154775 768.272343 15.818629C746.042941-6.277693 708.804076-5.074616 685.091594 18.484019L620.682076 82.476319 835.34721 295.826104 899.75255 231.814349C923.465032 208.254362 924.668109 171.253883 902.442885 149.154775Z" p-id="2323" fill="#13227a"></path></svg>
            </q-item-section>
            <q-item-section class="text-black">
              新建文章
            </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script>
  export default {
    name:"PersonalCenterLayout",
    data () {
      return {
          loaded : false,
          drawer : true,
          miniState: true,
          pane: "personalHome",
      }
    },
    methods: {
      changeTo(name) {
        if(name==this.pane) return
        if(this.pane == "newPost") {
          alert("确定要离开吗,你的修改不会被保存")
        }
        this.pane = name
        this.$router.push({name:name})
      }
    },
    mounted() {
      this.pane = this.$route.name
      if (!this.$store.state.user.is_login) {
        this.$req.autologin()
          .then(() => {
              if (!this.$store.state.user.is_login) this.$router.push({name:"home"})
              this.loaded = true
            })
      } else {
        this.loaded = true
      }
    }
  }
</script>
