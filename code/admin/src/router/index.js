import Vue from 'vue'
import Router from 'vue-router'
import { getToken } from '../utils/auth'

import Login from '../components/Login/login.vue'
import Manage from '../components/manage.vue'
import Post from '../components/Post/post.vue'
import Tag from '../components/Tag/tag.vue'
import Me from '../components/Me/me.vue'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      name: 'login',
      path: '/login',
      component: Login
    },
    {
      name: 'manage',
      path: '/manage',
      redirect: '/manage/posts',
      component: Manage,
      children: [
        {
          path: 'posts',
          component: Post
        },
        {
          path: 'tags',
          component: Tag
        },
        {
          path: 'me',
          component: Me
        }
      ]
    }
  ],
  linkActiveClass: 'active'
})


// 全局路由钩子，进行路由鉴权
router.beforeEach((to, from, next) => {
  if (from.path !== undefined && to.path === '/login') {
    next() 
  } else {
    if (getToken()) {
      next()
    } else {
      next({
        path: '/login',
        replace: true
      })
    }
  }
})

export default router

