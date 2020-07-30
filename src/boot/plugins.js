import Vue from 'vue'

import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
Vue.use(mavonEditor)


import VueCodeMirror from 'vue-codemirror'
import 'codemirror/lib/codemirror.css'
Vue.use(VueCodeMirror)

import VueClipboard from 'vue-clipboard2'
Vue.use(VueClipboard)

import VueShowdown from 'vue-showdown'
Vue.use(VueShowdown, {
  // set default options of showdown (will override the flavor options)
  options: {
    emoji: true,
  },
})

import VueHighlightJS from 'vue-highlightjs'
Vue.use(VueHighlightJS)


import ECharts from 'vue-echarts/components/ECharts.vue'

// 引入饼图组件
import 'echarts/lib/chart/pie'
// 引入提示框和title组件
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'
import 'echarts/lib/component/legend'

Vue.component('v-chart', ECharts)


Date.prototype.Format = function(fmt) { //author: meizz
  if (this == "Invalid Date") {
    return "";
  }
  var o = {
    "M+" : this.getMonth() + 1, //月份
    "d+" : this.getDate(), //日
    "H+" : this.getHours(), //小时
    "m+" : this.getMinutes(), //分
    "s+" : this.getSeconds(), //秒
    "q+" : Math.floor((this.getMonth() + 3) / 3), //季度
    "S" : this.getMilliseconds()
    //毫秒
  };
  if (/(y+)/.test(fmt))
    fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "")
      .substr(4 - RegExp.$1.length));
  for ( var k in o)
    if (new RegExp("(" + k + ")").test(fmt))
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k])
        : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
}
