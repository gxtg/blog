import Vue from 'vue'
import Blog from './blog'
import router from './router/indexBlog.js'
import axios from 'axios'
import './common/stylus/index.styl'
import './common/fonts/style.css'

Vue.config.productionTip = false

Vue.prototype.$http= axios

/* eslint-disable no-new */
new Vue({
  el: '#blog',
  router,
  render: h => h(Blog)
})

