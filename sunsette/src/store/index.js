import Vue from 'vue'
import Vuex from 'vuex'

import snackbar from './modules/snackbar'
import cities from './modules/cities'
import autocomplete from './modules/autocomplete'

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
    cities : cities,
    autocomplete : autocomplete
  }
})
