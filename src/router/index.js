import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/login.vue'
import '../assets/css/global.css'
import Home from '../views/Home.vue'
import WelCome from '../views/WelCome.vue'
import Users from '../views/Users.vue'
Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: Login },
  {
    path: '/home',
    component: Home,
    redirect: '/welcome',
    children: [{ path: '/welcome', component: WelCome }, { path: '/users', component: Users }
    ]
  }

]

const router = new VueRouter({
  routes
})
router.beforeEach((to, form, next) => {
  if (to.path === '/login') return next()
  const tokenStr = window.sessionStorage.getItem('token')
  if (!tokenStr) return next('/login')
  next()
})
export default router
