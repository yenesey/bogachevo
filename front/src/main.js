import Vue from 'vue'
import App from './app'
import router from './router'

import vueSmoothScroll from 'vue-smooth-scroll'
// import Popover from './components/common/popover'
import Popover from 'vue-js-popover'
Vue.use(vueSmoothScroll)
Vue.use(Popover)

Vue.config.productionTip = false

Vue.directive('scroll', { // v-scroll
  inserted: function (el, binding) {
    const f = function (evt) {
      if (binding.value(evt, el)) {
        window.removeEventListener('scroll', f)
      }
    }
    window.addEventListener('scroll', f)
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
