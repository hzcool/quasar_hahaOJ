import Vue from 'vue'
import 'view-design/dist/styles/iview.css'


import {
  Table,
  Row,
  Input,
  Select,
  Button,
  Option,
  Page,
  Time,
  Tag,
  Icon,
  Upload,
  InputNumber,
  Modal,
  DatePicker,
  CheckboxGroup,
  Checkbox,
} from 'view-design'
// iview基础模块
const components = {
  Table,
  Row,
  Input,
  Select,
  Button,
  Option,
  Page,
  Time,
  Tag,
  Icon,
  Upload,
  InputNumber,
  Modal,
  DatePicker,
  CheckboxGroup,
  Checkbox,
}

const iviewModule = {
  ...components,
  iTable: Table,
  iTime: Time,
}
// 循环注册全局组件
Object.keys(iviewModule).forEach(key => {
  Vue.component(key, iviewModule[key])
})

