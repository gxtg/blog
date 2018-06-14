import Vue from 'vue'
import App from './App'
import store from './store/index.js'
import router from './router'
import 'babel-polyfill'

import { dateFormat } from './utils/filter'
import './common/style/index.styl'
import './common/font/style.css'

Vue.config.productionTip = false

Vue.filter('dateFormat', dateFormat)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
