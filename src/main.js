// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
//import Image from './components/Image.vue'

Vue.config.productionTip = false
//Vue.component('app-images', Image);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {
    App,
    // Image
  },
  template: '<App/>'
})
