<template>
  <q-layout view="hHh lpR fFf" style="background:  #f1f3f6">

    <q-header elevated class="bg-primary text-white" height-hint="98">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="left = !left" />
        <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo/svg/quasar-logo.svg">
          </q-avatar>
          <span class="q-ml-md">Happy Online Judge </span>
        </q-toolbar-title>
        <div v-if="$store.state.user.is_login" class="q-gutter-md">
          <q-btn dense flat color="white" round icon="email" @click="$router.push({name:'message'})">
            <q-badge color="red" floating v-if="$store.state.user.message_count">
              {{$store.state.user.message_count}}
            </q-badge>
            <q-tooltip>私信</q-tooltip>
          </q-btn>
          <q-btn round dense  flat color="white" icon="notifications">
            <q-badge color="red" text-color="white" floating v-if="$store.state.user.notification_count">
              {{$store.state.user.notification_count}}
            </q-badge>
            <q-tooltip>通知</q-tooltip>
          </q-btn>
          <q-chip>
            <q-avatar>
              <img :src="$store.state.user.avatar" />
            </q-avatar>
            <q-btn-dropdown color="primary" :label="$store.state.user.username" flat dense no-caps>
              <q-list>
                <q-item clickable v-close-popup>
                  <q-item-section>
                    <q-item-label><router-link :to="{name:'userinfo',params:{'username':$store.state.user.username}}"> 查看信息 </router-link></q-item-label>
                  </q-item-section>
                </q-item>
                <q-item clickable v-close-popup @click="to_personal_center">
                  <q-item-section>
                    <q-item-label><router-link to="#"> 修改信息 </router-link></q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-btn-dropdown>
          </q-chip>
          <q-btn color="purple" label="退 出" @click="logout"/>
        </div>
        <div class="q-gutter-md" v-else>
          <q-btn style="background: #FF0080; color: white" label="登 陆" @click="$router.push({name:'login'})"/>
          <q-btn color="purple" label="注 册" @click="$router.push({name:'register'})"/>
        </div>
      </q-toolbar>

      <q-tabs align="left">
        <q-route-tab :to="{name:'home'}" label="首页" />
        <q-route-tab :to="{name:'problemset'}" label="题库" />
        <q-route-tab :to="{name:'contests'}" label="比赛" />
        <q-route-tab :to="{name:'users'}" label="用户" />
        <q-route-tab :to="{name:'submissions'}" label="测评记录" />
        <q-route-tab :to="{name:'describe'}" label="网站说明" />
      </q-tabs>
    </q-header>

    <q-drawer
      v-model="left"
      show-if-above

      :mini="miniState"
      @mouseover="miniState = false"
      @mouseout="miniState = true"

      :width="200"
      :breakpoint="500"
      bordered
      content-class="bg-grey-3"
    >
      <q-scroll-area class="fit">
        <q-list padding>


          <q-item clickable v-ripple>
            <q-item-section avatar>
              <svg t="1592978214280" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="10575" width="32" height="32"><path d="M530.944 77.312c6.712889 0 13.141333 2.702222 17.863111 7.480889 4.750222 4.807111 7.395556 11.292444 7.395556 18.090667v818.232888a25.713778 25.713778 0 0 1-7.395556 18.090667 25.144889 25.144889 0 0 1-17.863111 7.480889 20.992 20.992 0 0 1-6.826667 0l-231.822222-226.304-6.286222-6.371556-7.850667-5.632a125.297778 125.297778 0 0 0-64.199111-17.379555H101.205333a25.429333 25.429333 0 0 1-25.258666-25.6V358.599111c0-14.108444 11.292444-25.571556 25.258666-25.571555h112.753778a125.297778 125.297778 0 0 0 64.199111-17.351112l7.850667-4.636444 6.314667-6.371556 231.537777-227.328a20.992 20.992 0 0 1 7.111111 0z m0-76.714667a97.991111 97.991111 0 0 0-50.545778 14.307556L240.241778 249.400889c-7.68 4.579556-16.384 7.054222-25.287111 7.168H101.205333c-55.836444 0-101.12 45.795556-101.12 102.257778v306.602666c0 27.107556 10.666667 53.134222 29.639111 72.305778a100.522667 100.522667 0 0 0 71.480889 29.952h112.753778c8.903111 0.113778 17.635556 2.56 25.287111 7.168l241.152 234.24c15.246222 9.272889 32.711111 14.222222 50.545778 14.307556 55.836444 0 101.12-45.795556 101.12-102.286223V102.883556C632.035556 46.364444 586.780444 0.568889 530.944 0.568889z m341.248 460.259556H745.813333a38.115556 38.115556 0 0 0-37.916444 38.371555 38.115556 38.115556 0 0 0 37.916444 38.343112h126.378667a38.115556 38.115556 0 0 0 37.944889-38.343112 38.115556 38.115556 0 0 0-37.944889-38.371555zM863.601778 173.226667c-6.542222 0.056889-12.999111 1.820444-18.688 5.12l-109.710222 63.914666c-14.933333 8.704-22.186667 26.453333-17.692445 43.292445 4.522667 16.810667 19.683556 28.444444 36.892445 28.302222 6.570667-0.056889 12.999111-1.820444 18.716444-5.12l109.710222-63.914667c14.933333-8.704 22.186667-26.453333 17.664-43.292444-4.494222-16.810667-19.655111-28.444444-36.892444-28.302222z m-109.198222 511.402666a37.973333 37.973333 0 0 0-36.892445 28.302223 38.542222 38.542222 0 0 0 17.692445 43.292444l109.710222 63.914667c5.688889 3.299556 12.145778 5.063111 18.688 5.12a37.973333 37.973333 0 0 0 36.892444-28.302223 38.542222 38.542222 0 0 0-17.664-43.292444l-109.710222-62.634667a38.087111 38.087111 0 0 0-18.716444-5.12v-1.28z" p-id="10576" fill="#1296db"></path></svg>
            </q-item-section>
            <q-item-section>
              <div class="text-black"> 系统公告 </div>
            </q-item-section>
          </q-item>

          <q-item clickable v-ripple @click="$router.push({name:'blogs'})">
            <q-item-section avatar>
              <svg t="1592978625849" class="icon" viewBox="0 0 1025 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="13803" width="32" height="32"><path d="M384 0l0 96c73.472 0 144.704 14.368 211.712 42.72 64.768 27.392 122.944 66.624 172.96 116.608s89.216 108.192 116.64 172.96c28.352 67.008 42.72 138.24 42.72 211.712l96 0c0-353.472-286.528-640-640-640z" p-id="13804" fill="#1296db"></path><path d="M384 192l0 96c94.016 0 182.432 36.608 248.896 103.104s103.104 154.88 103.104 248.896l96 0c0-247.424-200.576-448-448-448z" p-id="13805" fill="#1296db"></path><path d="M480 384l-64 64-224 64-192 416 25.376 25.376 232.8-232.8c-1.408-5.28-2.176-10.848-2.176-16.576 0-35.36 28.64-64 64-64s64 28.64 64 64-28.64 64-64 64c-5.728 0-11.296-0.768-16.576-2.176l-232.8 232.8 25.376 25.376 416-192 64-224 64-64-160-160z" p-id="13806" fill="#1296db"></path></svg>
            </q-item-section>
            <q-item-section>
              <div class="text-black"> 博客 </div>
            </q-item-section>
          </q-item>

          <q-item clickable v-ripple @click="$router.push({name:'discussions'})">
            <q-item-section avatar>
              <svg t="1592978699634" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="14628" width="32" height="32"><path d="M501.221053 695.242105c-43.115789 0-75.452632 32.336842-75.452632 75.452632v5.389474c0 37.726316 37.726316 70.063158 75.452632 70.063157h5.389473c37.726316 0 70.063158-32.336842 70.063158-75.452631v-5.389474c0-37.726316-32.336842-70.063158-75.452631-70.063158z" fill="#1296db" p-id="14629"></path><path d="M512 0C231.747368 0 0 231.747368 0 512S231.747368 1024 512 1024 1024 792.252632 1024 512 792.252632 0 512 0z m0 970.105263C258.694737 970.105263 53.894737 765.305263 53.894737 512S258.694737 53.894737 512 53.894737 970.105263 258.694737 970.105263 512 765.305263 970.105263 512 970.105263z" fill="#1296db" p-id="14630"></path><path d="M517.389474 199.410526c-70.063158 0-140.126316 32.336842-188.631579 91.621053l53.894737 53.894737c26.947368-37.726316 75.452632-59.284211 123.957894-64.673684h16.168421c43.115789 0 80.842105 43.115789 75.452632 86.231579 0 91.621053-161.684211 129.347368-140.126316 264.08421h86.231579c-16.168421-123.957895 150.905263-145.515789 150.905263-274.863158 0-97.010526-75.452632-156.294737-177.852631-156.294737z" fill="#1296db" p-id="14631"></path></svg>
            </q-item-section>
            <q-item-section>
              <div class="text-black"> 讨论贴 </div>
            </q-item-section>
          </q-item>

          <q-separator />

          <q-item clickable v-ripple @click="to_personal_center">
            <q-item-section avatar>
              <svg t="1592979214986" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="15486" width="32" height="32"><path d="M1009.158986 66.316476L889.662378 943.696842c-0.019961 0-0.039922 0.009981-0.059883 0.009981a28.937481 28.937481 0 0 1-40.640624 25.41037l-0.029941 0.029942-325.594074-137.960546-64.474074 132.750721a28.904546 28.904546 0 0 1-54.475603-0.179649L324.865497 787.461988l39.810246-45.70074L796.913528 242.219914 225.66924 705.052943 21.37625 618.482027c0.03094-0.089825 0.058885-0.179649 0.088826-0.269473a29.867665 29.867665 0 0 1 0.424172-54.952671L966.681949 33.494581c0.059883 0.077848 0.109786 0.152702 0.169669 0.23055a28.904546 28.904546 0 0 1 42.307368 32.591345z" fill="#d81e06" p-id="15487"></path></svg>
            </q-item-section>
            <q-item-section>
              <div class="text-black"> 个人首页 </div>
            </q-item-section>
            <q-item-section v-if="gg">
              <mavon-editor
                :boxShadow="false"
                :subfield="false"
                :editable="false"
                :toolbarsFlag="false"
                defaultOpen="preview">
              </mavon-editor>
            </q-item-section>
          </q-item>

          <q-item clickable v-ripple v-if="$store.state.user.is_admin" @click="$router.push({name:'admin'})">
            <q-item-section avatar>
              <svg t="1594051958221" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1328" width="32" height="32"><path d="M819.182933 955.716267a34.1504 34.1504 0 0 1 0 68.283733H204.8a34.1504 34.1504 0 0 1 0-68.283733H819.2z m34.133334-955.716267C947.5072 0 1024 71.406933 1024 159.232v568.951467c-0.136533 87.842133-76.629333 159.232-170.683733 159.232H170.666667C76.6464 887.432533 0 816.042667 0 728.200533V159.249067C0 71.406933 76.629333 0 170.683733 0H853.333333z m0 68.283733H170.666667c-56.507733 0-102.4 40.789333-102.4 90.965334v568.9344c0 50.158933 45.892267 90.965333 102.4 90.965333h682.615466c56.5248 0 102.417067-40.8064 102.417067-90.965333V159.249067C955.733333 109.090133 909.824 68.266667 853.333333 68.266667zM578.816 310.442667l6.2464 3.584c11.52 7.0144 15.633067 22.528 9.233067 34.8672l-98.986667 184.098133c-5.9904 11.52-19.182933 16.1792-30.378667 11.144533l-2.7136-1.4336h0.068267l-6.314667-3.584c-11.52-7.031467-15.633067-22.528-9.233066-34.884266l98.986666-184.081067c6.724267-12.202667 21.4016-16.520533 33.092267-9.728z m-298.103467 4.676266a23.944533 23.944533 0 0 1 33.6384-1.877333l2.286934 2.218667c9.079467 9.898667 9.591467 25.463467 1.604266 36.010666l-1.8432 2.184534L248.32 426.666667l68.5568 73.045333a28.672 28.672 0 0 1-0.034133 38.4512c-9.216 9.898667-23.773867 10.5472-33.6896 1.9456l-2.048-1.979733-85.896534-91.767467a29.781333 29.781333 0 0 1-1.860266-37.137067l1.877333-2.269866 85.504-91.869867z m426.461867 0.034134a23.944533 23.944533 0 0 1 33.672533-1.928534l2.048 1.979734 85.879467 92.3136c4.949333 4.898133 7.68 11.8784 7.458133 19.114666 0.1024 6.365867-1.877333 12.509867-5.495466 17.442134l-1.962667 2.3552-85.879467 91.648c-9.2672 10.052267-23.671467 10.717867-33.6896 2.013866l-2.218666-2.184533a28.535467 28.535467 0 0 1-1.6896-35.976533l1.8432-2.184534 68.0448-73.1136-68.0448-73.0112a28.689067 28.689067 0 0 1 0.034133-38.468266z" fill="#d4237a" p-id="1329"></path></svg>
            </q-item-section>
            <q-item-section>
              <div class="text-black"> 后台管理 </div>
            </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer elevated class="bg-grey-8 text-white" align="center">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo/svg/quasar-logo.svg">
          </q-avatar>
          {{date}}
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>

  </q-layout>
</template>

<script>
  export default {
    data () {
      return {
        left: false,
        miniState: true,
        gg:true,
        date: new Date(), //实时时间
      }
    },
    methods: {
        logout() {
          this.$req.get("logout")
          .then(res => {
              if(res.errno==undefined) {
                this.$store.commit("logout")
                this.$notify("success","退出成功")
                this.$router.push({name:"home"})
              }
          })
        },
        to_personal_center() {
          if (!this.$store.state.user.is_login) {
            this.$notify("error","请先登陆")
            this.$router.push({name:"login"})
          } else {
            this.$router.push({path:"/personalCenter"})
          }
        }
    },
    mounted() {
      if (!this.$store.state.user.is_login) {
         this.$req.autologin()
      }
      var _this = this;
      this.timer = setInterval(function(){
        _this.date = new Date();
      },1000);
      setTimeout(() => {
        this.gg = false
      },  500)
    },
    beforeDestroy:function(){
      if(this.timer){
        clearInterval(this.timer);
      }
    }
  }
</script>
