//产品list
const productNav = resolve => require.ensure([], () => resolve(require('../components/product/ProductNav.vue')), 'productNav')

//产品list
const product = resolve => require.ensure([], () => resolve(require('../components/product/Product.vue')), 'product')

//产品详情
const productDetail = resolve => require.ensure([], () => resolve(require('../components/product/ProductDetail.vue')), 'productDetail')

//条款列表
const clauseList = resolve => require.ensure([], () => resolve(require('../components/product/ClauseList.vue')), 'clauseList')

//条款详情
const clauseDetail = resolve => require.ensure([], () => resolve(require('../components/product/ClauseDetail.vue')), 'clauseDetail')

//投保须知
const insureNotes = resolve => require.ensure([], () => resolve(require('../components/product/InsureNotes.vue')), 'insureNotes')

//微信分享中转页面
const wxSharePage = resolve => require.ensure([], () => resolve(require('../components/product/WXSharePage.vue')), 'wxSharePage')

export default [{
  path: 'productNav',
  component: productNav,
  children: [{
    name: 'product',
    path: 'product',
    component: product,
    meta: {
      login: false,
      title: '瑞华保险'
    }
  }, {
    name: 'productDetail',
    path: 'productDetail/:productId',
    component: productDetail,
    meta: {
      login: false,
      title: '保险详情',
      share: true,
    }
  }, {
    name: 'clauseList',
    path: 'clauseList/:productId',
    component: clauseList,
    meta: {
      login: false,
      title: '产品条款'
    }
  }, {
    name: 'clauseDetail',
    path: 'clauseDetail/:productId',
    component: clauseDetail,
    meta: {
      login: false,
      title: '条款详情',
      zoom: true
    }
  }, {
    name: 'insureNotes',
    path: 'insureNotes/:productId',
    component: insureNotes,
    meta: {
      login: false,
      title: '投保须知',
      zoom: true
    }
  }]
}, {
  name: 'wxSharePage',
  path: 'wxSharePage/:productId',
  component: wxSharePage,
  meta: {
    login: false,
    title: '',
  }
}]