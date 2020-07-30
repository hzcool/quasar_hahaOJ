import Vue from 'vue'
import { Notify } from 'quasar'

//成功和错误的通知
function notify(type,msg){
  if (msg==undefined) {
    return
  }
  if (type=="error") {
    Notify.create({
      color:'negative',
      message: msg,
      icon: 'error',
      timeout: 2000,
      position: 'top',
    })
  } else {
    Notify.create({
      color:'positive',
      message: msg,
      icon: 'done',
      timeout: 2000,
      position: 'top',
    })
  }
}
Vue.prototype.$notify = notify

export default notify
