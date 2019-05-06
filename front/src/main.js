import Vue from 'vue'
import App from './app'
import router from './router'

import vueSmoothScroll from 'vue-smooth-scroll'
import Popover from './components/common/popover'
Vue.use(vueSmoothScroll)
Vue.use(Popover)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
