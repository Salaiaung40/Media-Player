import Vue from 'vue'
import Router from 'vue-router'
//import HelloWorld from '@/components/HelloWorld'
import musicplayer from '@/components/musicplayer'
import Image from '@/components/Image.vue'

Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      name: 'MusicPlayer',
      component: musicplayer
    },
    {
      path: '/imag',
      name: 'Image',
      component: Image
    }
  ]
})
