import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/home/home'
import About from '../components/about/about'
import Contract from '../components/contract/contract'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      component: Home
    },
    {
      path: '/about',
      component: About
    },
    {
      path: '/contract',
      component: Contract
    }
  ],
  linkActiveClass: 'active'
})
