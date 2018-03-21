import Vue from 'vue'
import Router from 'vue-router'
import Works from '../components/works/works'
import Tags from '../components/tags/tags'
import About from '../components/about/about'
import post from '../components/post/post'
import ArticleList from '../components/articleList/articleList'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/article/1'
    },
    {
      name: 'article',
      path: '/article/:id',
      component: ArticleList
    },
    {
      path: '/works',
      component: Works
    },
    {
      path: '/tags',
      component: Tags
    },
    {
      path: '/about',
      component: About
    },
    {
      name: 'post',
      path: '/post/:id',
      component: post
    }
  ],
  linkActiveClass: 'active'
})
