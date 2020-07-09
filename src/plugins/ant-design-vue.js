import Vue from 'vue'
import { Checkbox, Button, message, Input } from 'ant-design-vue'

Vue.component(Button.name, Button)
Vue.use(Checkbox)
Vue.use(Input)
Vue.prototype.$messageAntd = message
