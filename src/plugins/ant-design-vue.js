import Vue from 'vue'
import { Button, message } from 'ant-design-vue'

Vue.component(Button.name, Button)
Vue.prototype.$messageAntd = message
