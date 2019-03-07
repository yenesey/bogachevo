import Vue from 'vue'
import App from './app'
import router from './router'
import '@/assets/styles/base-global.scss'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
