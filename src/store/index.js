import Vuex from 'vuex';
import Vue from 'vue'
import topic from './topic'

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    topic
  }
})
