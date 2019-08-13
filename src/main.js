// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'

import App from './App'
import router from './router'
import server from './api/servers/index.js'
import md5 from 'md5'
import paramsError from './api/commonJs/paramsError'

import promise from 'es6-promise';
import store from './store/index'
import './assets/font/iconfont.css'

promise.polyfill();


Vue.config.productionTip = false
// api
Vue.prototype.$server= server
Vue.prototype.$paramsError= paramsError
// md5
Vue.prototype.$md5= md5
console.log(store, 'store')

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
}).$mount('#app')
