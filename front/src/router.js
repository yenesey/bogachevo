import Vue from 'vue'
import Router from 'vue-router'
import Index from './pages/index'
import Demos from './pages/demos'
import DemosMenu from './pages/demos/menu'
import Tc from './pages/demos/telegram-contest'
import Articles3D from './pages/demos/3d-graphics/index.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index
    },
    {
      path: '/demos',
      component: Demos,
      children: [
        {
          path: '',
          name: 'demos',
          component: DemosMenu
        },
        {
          path: 'telegram-contest',
          component: Tc
        },
        {
          path: '3d-graphics/:part',
          component: Articles3D
        }
      ]
    }
  ],
  mode: 'history',
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    var isIe = (window.navigator.userAgent.indexOf('Trident') !== -1)
    var top = 0

    if (to.hash) {
      top = document.querySelector(to.hash).offsetTop
      // return { selector: to.hash }
    }

    return isIe ? window.scrollTo(0, top) : window.scrollTo({ top: top, behavior: 'smooth' })
    // return { x: 0, y: 0 }
  }
})
