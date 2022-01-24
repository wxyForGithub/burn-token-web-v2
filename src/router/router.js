import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/pages/home/home';
import Team from '@/pages/team/Team';
Vue.use(Router);

export default new Router({
  routes: [{
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'home',
    component: Home
  },
  {
    path: '/team',
    name: 'team',
    component: Team
  },
  ]
})