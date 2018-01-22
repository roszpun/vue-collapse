// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueHighlightJS from 'vue-highlightjs'
Vue.config.productionTip = false

import VueCollapse from 'vue2-collapse'

Vue.use(VueCollapse);
Vue.use(VueHighlightJS);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>'
})
