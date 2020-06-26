import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import './assets/font-awesome/css/font-awesome.min.css'
import axios from 'axios'
import TreeTable from 'vue-table-with-tree-grid'

Vue.component('tree-table', TreeTable)
Vue.prototype.$http = axios
axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1'
axios.interceptors.request.use(config => {
  config.headers.Authorization = window.sessionStorage.getItem('token')
  // console.log(config)
  return config
})
Vue.config.productionTip = false

Vue.directive('title', {
  inserted: function (el, binding) {
    document.title = el.dataset.title
  }
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
