import Vue from 'vue'
import Root from './pages/Root/index.vue'
import store from './store/index'
import router from './router'
import '@/assets/style/main.scss'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(Root)
}).$mount('#app')
