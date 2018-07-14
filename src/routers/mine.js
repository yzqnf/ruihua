//个人中心
const myCenter = resolve => require.ensure([], () => resolve(require('../components/mine/MyCenter.vue')), 'myCenter')
  //个人资料
const myProfile = resolve => require.ensure([], () => resolve(require('../components/mine/MyProfile.vue')), 'myProfile')
  //身份认证
const idAuthentication = resolve => require.ensure([], () => resolve(require('../components/mine/IdAuthentication.vue')), 'idAuthentication')
  //邮箱认证
const emailAuthentication = resolve => require.ensure([], () => resolve(require('../components/mine/EmailAuthentication.vue')), 'emailAuthentication')
  //常住地址
const myAddress = resolve => require.ensure([], () => resolve(require('../components/mine/MyAddress.vue')), 'myAddres')
  //修改密码
const changePassword = resolve => require.ensure([], () => resolve(require('../components/mine/ChangePassword.vue')), 'changePassword')
  //我的订单
const myOrderList = resolve => require.ensure([], () => resolve(require('../components/mine/MyOrderList.vue')), 'myOrderList')
  //订单详情
const orderDetails = resolve => require.ensure([], () => resolve(require('../components/mine/OrderDetails.vue')), 'orderDetails')
  //我的保单
const myInsuranceList = resolve => require.ensure([], () => resolve(require('../components/mine/MyInsuranceList.vue')), 'myInsuranceList')
  //保单详情
const insuranceDetails = resolve => require.ensure([], () => resolve(require('../components/mine/InsuranceDetails.vue')), 'insuranceDetails')
  //常见问题
const faq = resolve => require.ensure([], () => resolve(require('../components/mine/Faq.vue')), 'faq')
  //投诉建议
const feedback = resolve => require.ensure([], () => resolve(require('../components/mine/Feedback.vue')), 'feedback')
  //联系我们
const contactUs = resolve => require.ensure([], () => resolve(require('../components/mine/ContactUs.vue')), 'contactUs')
  //尊享权益
const myPrivilege = resolve => require.ensure([], () => resolve(require('../components/mine/privilege/MyPrivilege.vue')), 'myPrivilege')
  //牙齿健康套餐详情
const teethPackDetail = resolve => require.ensure([], () => resolve(require('../components/mine/privilege/TeethPackDetail.vue')), 'teethPackDetail')
  //家庭医生套餐详情
const healthPackDetail = resolve => require.ensure([], () => resolve(require('../components/mine/privilege/HealthPackDetail.vue')), 'healthPackDetail')
  //洁牙卡
const teethCard = resolve => require.ensure([], () => resolve(require('../components/mine/privilege/TeethCard.vue')), 'teethCard')
  //超级家庭医生健康卡
const healthCard = resolve => require.ensure([], () => resolve(require('../components/mine/privilege/HealthCard.vue')), 'healthCard')
  //实名认证（临时）
const temporaryAuth = resolve => require.ensure([], () => resolve(require('../components/mine/privilege/TemporaryAuth.vue')), 'temporaryAuth')

export default [{
    name: 'myCenter',
    path: 'myCenter',
    component: myCenter,
    meta: {
      login: false,
      title: '个人中心',
    }
  },
  {
    name: 'myProfile',
    path: 'myProfile',
    component: myProfile,
    meta: {
      login: true,
      title: '个人资料',
    }
  },
  {
    name: 'idAuthentication',
    path: 'idAuthentication',
    component: idAuthentication,
    meta: {
      login: true,
      title: '身份认证',
    }
  },
  {
    name: 'emailAuthentication',
    path: 'emailAuthentication',
    component: emailAuthentication,
    meta: {
      login: true,
      title: '邮箱认证',
    }
  },
  {
    name: 'myAddress',
    path: 'myAddress',
    component: myAddress,
    meta: {
      login: true,
      title: '常住地址',
    }
  },
  {
    name: 'changePassword',
    path: 'changePassword',
    component: changePassword,
    meta: {
      login: true,
      title: '修改密码',
    }
  },
  {
    name: 'myOrderList',
    path: 'myOrderList',
    component: myOrderList,
    meta: {
      login: true,
      title: '我的订单',
    }
  },
  {
    name: 'orderDetails',
    path: 'orderDetails/:orderCode/:isShare',
    component: orderDetails,
    meta: {
      login: false,
      title: '我的订单',
      share: true,
    }
  },
  {
    name: 'myInsuranceList',
    path: 'myInsuranceList',
    component: myInsuranceList,
    meta: {
      login: true,
      title: '我的保单',
    }
  },
  {
    name: 'insuranceDetails',
    path: 'insuranceDetails/:insuranceCode/:isShare',
    component: insuranceDetails,
    meta: {
      login: false,
      title: '我的保单',
      share: true,
    }
  },
  {
    name: 'faq',
    path: 'faq',
    component: faq,
    meta: {
      login: false,
      title: '常见问题',
    }
  },
  {
    name: 'feedback',
    path: 'feedback',
    component: feedback,
    meta: {
      login: false,
      title: '用户反馈',
    }
  },
  {
    name: 'contactUs',
    path: 'contactUs',
    component: contactUs,
    meta: {
      login: false,
      title: '联系我们',
    }
  },
  {
    name: 'myPrivilege',
    path: 'myPrivilege',
    component: myPrivilege,
    meta: {
      login: true,
      title: '尊享权益',
    }
  },
  {
    name: 'teethPackDetail',
    path: 'teethPackDetail',
    component: teethPackDetail,
    meta: {
      login: true,
      title: '牙齿健康套餐详情',
    }
  },
  {
    name: 'healthPackDetail',
    path: 'healthPackDetail',
    component: healthPackDetail,
    meta: {
      login: true,
      title: '家庭医生套餐详情',
    }
  },
  {
    name: 'teethCard',
    path: 'teethCard',
    component: teethCard,
    meta: {
      login: true,
      title: '洁牙卡',
    }
  },
  {
    name: 'healthCard',
    path: 'healthCard',
    component: healthCard,
    meta: {
      login: true,
      title: '超级家庭医生健康卡',
    }
  },
  {
    name: 'temporaryAuth',
    path: 'temporaryAuth',
    component: temporaryAuth,
    meta: {
      login: true,
      title: '实名认证（实名）',
    }
  },
]