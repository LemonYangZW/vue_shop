import Vue from 'vue'
import { Checkbox, Button, message } from 'ant-design-vue'

Vue.component(Button.name, Button)
Vue.use(Checkbox)
Vue.prototype.$messageAntd = message
