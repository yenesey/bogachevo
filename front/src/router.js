import Vue from 'vue'
import Router from 'vue-router'
import Index from './pages/index'
import Other from './pages/other'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index
    },
    {
      path: '/other',
      name: 'other',
      component: Other
    }
  ],
  mode: 'history',
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    if (to.hash) {
      // return window.scroll({ top: document.querySelector(to.hash).offsetTop, behavior: 'smooth' })
      return { selector: to.hash }
    }
    // return window.scrollTo({ top: 0, behavior: 'smooth' })
    return { x: 0, y: 0 }
  }
})
