import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import config from './config'
import Axios from 'axios';

Vue.config.productionTip = false
Vue.$axios = Axios;
Vue.$omwKey = config.OMW_KEY;

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
