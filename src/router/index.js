import Vue from 'vue';
import Router from 'vue-router';

import Home from '../components/Home.vue';
import Topic from '../components/Topic';
import User from '../components/User';
import Login from '../components/Login.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/topic/:id',
      name: 'topic',
      component: Topic
    },
    {
      path: '/user/:loginname',
      name: 'user',
      component: User
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    }
  ]
})
