import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue';
import swal from 'sweetalert2';
import CKEditor from '@ckeditor/ckeditor5-vue';
import axios from './api/goaxios';
import App from './App.vue';
import router from './router';
import store from './store';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

Vue.use(BootstrapVue);
Vue.use(CKEditor);

Vue.prototype.$axios = axios;
Vue.prototype.$swal = swal;

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
