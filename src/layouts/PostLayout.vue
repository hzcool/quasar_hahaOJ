<template>
  <q-layout view="hHh lpR fFf" style="background: #eeeeee">
    <q-header elevated class="bg-dark text-white">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo/svg/quasar-logo.svg">
          </q-avatar>
          <router-link :to="{name:indexName}" class="q-ml-md">{{kind}}</router-link>
        </q-toolbar-title>
        <q-btn flat color="white" label="返回网站首页" @click="$router.push({name:'home'})"/>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
    <div style="min-height: 200px">

    </div>
  </q-layout>
</template>

<script>
  export default {
    name:"PostLayout",
    data () {
      return {
          kind : '帖 子',
          indexName : 'blogs',
          pageName: '',
      }
    },
    methods: {
      changeTo(name) {

      }
    },

    mounted() {
      if(this.$route.name[0] == 'b') {
        this.kind = "博 客"
        this.indexName = 'blogs'
      }
      else if(this.$route.name[0] == 'd') {
          this.kind = "讨论提问"
        this.indexName = 'discussions'
      } else if (this.$route.name[0] == 's') {
          this.kind = "题 解"
          this.indexName = 'solutions'
      }
      if (!this.$store.state.user.is_login) {
        this.$req.autologin()
      }
    }
  }
</script>
