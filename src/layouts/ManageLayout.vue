<template>
  <q-layout view="hHh lpR fFf" v-if="loaded">

    <q-header elevated class="bg-secondary text-white">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo/svg/quasar-logo.svg">
          </q-avatar>
          <span class="q-ml-md"> 后台管理 </span>
        </q-toolbar-title>
        <q-btn flat color="white" label="返回前端" @click="$router.push({name:'home'})"/>
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
        <q-list padding class="q-gutter-md" style="font-size: 18px">

          <q-item clickable v-ripple class="q-mt-lg" @click="changeTo('admin')">
            <q-item-section avatar >
              <Icon type="ios-home-outline" size="32"/>
            </q-item-section>
            <q-item-section class="text-black">
              后台主页
            </q-item-section>
          </q-item>

          <q-item clickable v-ripple class="q-mt-lg" @click="changeTo('userManage')" v-if="($store.state.user.privilege&8192)>0">
            <q-item-section avatar >
              <Icon type="ios-people-outline" size="32"/>
            </q-item-section>
            <q-item-section class="text-black" >
              用户管理
            </q-item-section>
          </q-item>

          <q-item clickable v-ripple class="q-mt-lg" @click="changeTo('postManage')">
            <q-item-section avatar >
              <Icon type="ios-send-outline" size="40"/>
            </q-item-section>
            <q-item-section class="text-black" >
              帖子管理
            </q-item-section>
          </q-item>


          <q-item clickable v-ripple class="q-mt-lg" @click="changeTo('problemManage')">
            <q-item-section avatar >
              <Icon type="ios-help-circle-outline" size="32"/>
            </q-item-section>
            <q-item-section class="text-black" >
              题库管理
            </q-item-section>
          </q-item>
          <q-item clickable v-ripple class="q-mt-lg" @click="changeTo('submissionManage')" v-if="($store.state.user.privilege&1)>0">
            <q-item-section avatar >
              <Icon type="ios-paper-outline" size="32"/>
            </q-item-section>
            <q-item-section class="text-black">
              提交管理
            </q-item-section>
          </q-item>

          <q-item clickable v-ripple class="q-mt-lg" @click="changeTo('contestManage')">
            <q-item-section avatar >
              <Icon type="ios-podium-outline" size="32"/>
            </q-item-section>
            <q-item-section class="text-black" >
              比赛管理
            </q-item-section>
          </q-item>

        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
    <div class="text-center bg-grey-3 text-black q-mt-lg q-pa-md" >author : hzcool <br> {{date}}</div>
  </q-layout>
</template>

<script>
    export default {
        name: "ManageLayout",
        data() {
          return {
              loaded: false,
              drawer : true,
              miniState: true,
              date: new Date(), //实时时间
          }
        },
        methods:{
            changeTo(name) {
              if (this.$route.name == name) {
                  return
              }
              this.$router.push({name:name})
            },
            authAdmin() {
              this.$req.get("forAdminPage")
                .then(res=> {
                  if (res.errno==undefined) {
                    this.loaded = true
                  } else {
                    this.$router.push({name:"home"})
                  }
                })
            }
        },
        mounted() {
            if (!this.$store.state.user.is_login) {
                this.$req.autologin()
                .then(()=>{
                    this.authAdmin()
                })
            } else {
                this.authAdmin()
            }
            let _this = this;
            this.timer = setInterval(function(){
              _this.date = new Date();
            },1000);
        },
        beforeDestroy:function(){
          if(this.timer){
            clearInterval(this.timer);
          }
        }
    }
</script>

<style scoped>

</style>
