import Vue from 'vue'
import axios from 'axios'
import store from '../store/index.js'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-fromurlencodeed'
// axios.defaults.baseURL = '/api'
Vue.prototype.$axios = axios


import notify from './notify'
import { LoadingBar } from 'quasar'
LoadingBar.setDefaults({
  color: 'purple',
  size: '10px',
  position: 'bottom'
})

const requeset = {
  async post (url, form) {
    LoadingBar.start()
    let ret;
    await axios.post(url, form)
      .then(res => {
        ret = res.data
        store.commit("update",ret)
        if (ret.errno) {
          notify("error",ret.errmsg)
        }
      }).catch(err => {
        alert(err.response.data.errmsg)
        ret = {"errno": err.response.status}
      });
    setTimeout(LoadingBar.stop(),500)
    return ret;
  },
  async get(url,params) {
    LoadingBar.start()
    let ret;
    await axios.get(url,{params:params})
      .then(res =>{
        ret = res.data
        store.commit("update",ret)
        if (ret.errno) {
          notify("error",ret.errmsg)
        }
      }).catch(err => {
        alert(err.response.data.errmsg)
        ret = {"errno": err.response.status}
      });
    setTimeout(LoadingBar.stop(),500)
    return ret;
  },

  async autologin() {
    LoadingBar.start()
    await axios.get("autologin")
      .then(res =>{
        if (res.data.errno == undefined) {
            store.commit("login", res.data)
        }
      }).catch(err => {
        console.log(err.response.data)
      })
    setTimeout(LoadingBar.stop(),500)
  },
}
Vue.prototype.$req = requeset
