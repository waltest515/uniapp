import App from './App'
import req from './utils/main.js'
import uView from 'uview-ui'
Vue.use(uView)
Vue.prototype.$req = req
uni.$u.setConfig({
	// 修改$u.config对象的属性
	config: {
		// 修改默认单位为rpx，相当于执行 uni.$u.config.unit = 'rpx'
		unit: 'rpx'
	}
})

import VueI18n from 'vue-i18n'
import i18n from './static/lang/index.js'
Vue.prototype._i18n = i18n

import abi from "./static/abi/abi.js";
Vue.prototype.$abi = abi;

import heyu from "./static/abi/usdt.js";
Vue.prototype.$heyu = heyu;

import contractData from "./static/abi/contractData.js";
Vue.prototype.$contractData = contractData;

// #ifdef H5
import wx from "weixin-js-sdk"
Vue.prototype.$wx = wx
//#endif

// #ifndef VUE3
import Vue from 'vue'
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
	i18n,
    ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
	i18n
    app
  }
}
// #endif