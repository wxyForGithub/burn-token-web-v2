import Vue from 'vue'
import App from './App.vue'
import '@/utils/rem'
import router from '@/router/router';
import './common/common.scss';
import { Toast, List } from 'vant';
import 'vant/lib/toast/style';
import 'vant/lib/list/style';
import i18n from './il8n';
Vue.use(Toast);
Vue.use(List);

Vue.config.productionTip = false

new Vue({
  router,
  i18n,
  render: h => h(App),
}).$mount('#app')
