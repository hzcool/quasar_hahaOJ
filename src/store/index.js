import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const moduleUser= {
  state : {
    is_login: false,
    username : "",
    avatar : "https://cdn.quasar.dev/logo/svg/quasar-logo.svg",
    is_admin: false,
    is_super_admin : false,
    privilege:0,
    message_count: 0, //未读的私信数量
    notification_count: 0, //未读的通知数量
  },
  mutations :{
    update(state, data) {
      if (data.message_count != undefined) {
        state.message_count = data.message_count
      }
      if (data.notification_count != undefined) {
        state.notification_count = data.notification_count
      }
    },
    login(state, info) {
      state.is_login = true
      if(info.username) state.username = info.username
      if (info.avatar) state.avatar =  info.avatar
      if (info.is_admin) state.is_admin = info.is_admin
      if (info.is_super_admin) state.is_super_admin = info.is_super_admin
      if (info.privilege) state.privilege = info.privilege
    },
    logout(state) {
      state.is_login = false
      state.is_admin = false
      state.is_super_admin = false
      state.username = ""
      state.notifications = 0
      state.messages = 0
    }
  },
}
export default new Vuex.Store({
  modules: {
    user : moduleUser,
  }
})
