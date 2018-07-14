import Vue from 'vue'
import Router from 'vue-router'
import store from '../vuex/store'

import login from './login'
import home from './home'
import demo from './demo'
import product from './product'
import policy from './policy'
import mine from './mine'
import visit from './visit'
import card from './card'

Vue.use(Router)
const router = new Router({
  routes: [{
    path: '/',
    redirect: '/page/login'
    // redirect: '/page/access/oqlCiuHrRQWwJkkpgBaXVwVBN-1s&3_wcbFh5BdfxjJprtUJuLNSMUd5JCXHVDIoA_FumW7anvHqmKizCSiA6twdRbBips-zRrmfCs_D9zaqcas_aYC9A&profile'
      // redirect: '/page/access/oM9JHwVfz-aPsdd4gY_GVVtGFsP4&rGddraJr4sgMzTdWN4X5K65NgRZ2RNNQr7VwC0-Xw3ihHwdg2G13D5gparnIVHuUMoy2hbEDIbf1z_yDrJdO1g&profile'
  }, {
    path: '/page',
    component(resolve) {
      require.ensure([], () => resolve(require('../components/common/PageTransition.vue')), 'pageTransition')
    },
    children: [ ...home, ...demo, ...product, ...policy, ...mine,...visit, ...card,...login,]
  }]
})
router.keepAlivePage = 'home,login,forgetPwd'
router.beforeEach((to, from, next) => {
	document.body.className = 'main_vue'
	//修改微信title信息
  utils.wx.wxSetTitle(to.meta.title)
  if (from.meta.zoom) {
    document.querySelector('meta[name=viewport]').setAttribute('content', 'width=device-width, initial-scale=1.0, minimum-scale=1.0, user-scalable=no')
  }

  store.commit('TOGGLE_TAB', to.meta.hasFooter == true)
  console.log(to.meta)

  //微信分享配置
	wxShareConfig(to);
	//关闭页面弹出框
	store.commit('TOGGLE_DIALOG', {
		dialog: false
	})
	//关闭加载框
	store.commit('LOADING', {
    loading: false
  })
	
	if (to.meta.login != false && !store.state.common.user) {
    store.commit('TOGGLE_TOAST', {
      toast: true,
      toastMsg: '请先登录！'
    })
    next('/page/login/wx')
  } else {
    next()
  }
})

//微信分享配置
async function wxShareConfig(to){
  let isShare = to.meta.share ? true : false;

  //如果全局开启隐藏,调试模式不开启
  if(globalConfig.wxHideShare != isShare && !globalConfig.isDebug){
    //配置微信config
    await utils.wx.wxConfig();
    if(isShare){
      //显示微信
      utils.wx.wxShowMenuList();
    }else{
      //隐藏微信
      utils.wx.wxHideMenuList();
    }

    //改变状态
    globalConfig.wxHideShare = isShare;
  }
}

// router.afterEach(route => {
// document.body.scrollTop = 0
// })

Router.prototype.goBack = function(path) {
  this.isBack = true
  if (typeof path == 'string') {
    router.push(path)
  } else {
    window.history.go(-1)
  }
}

export default router