import Vue from 'vue'
import Vuex from 'vuex'

import snackbar from './modules/snackbar'
import cities from './modules/cities'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    
  },
  mutations: {

  },
  actions: {
  },
  modules: {
    snackbar : snackbar,
    cities : cities
  }
})
