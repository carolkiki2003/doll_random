import Vue from 'vue'
import Router from 'vue-router'
import Root from './pages/Root'
Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'root',
      component: Root
    }
  ]
})
export default router
