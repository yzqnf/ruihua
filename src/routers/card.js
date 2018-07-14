export default [{
  name: 'creditCard',
  path: 'creditCard',
  component(resolve) {
    require.ensure([], () => resolve(require('../components/card/creditCard.vue')), 'creditCard')
  },
  meta: {
    title: '瑞华保险信用卡',
    login: false,
    hasFooter: false
  }
},{
  name: 'teethPack',
  path: 'teethPack',
  component(resolve) {
    require.ensure([], () => resolve(require('../components/card/TeethPack.vue')), 'teethPack')
  },
  meta: {
    title: '瑞华保险信用卡',
    login: false,
    hasFooter: false
  }
},{
  name: 'healthPack',
  path: 'healthPack',
  component(resolve) {
    require.ensure([], () => resolve(require('../components/card/HealthPack.vue')), 'healthPack')
  },
  meta: {
    title: '瑞华保险信用卡',
    login: false,
    hasFooter: false
  }
},{
  name: 'cardRules',
  path: 'cardRules',
  component(resolve) {
    require.ensure([], () => resolve(require('../components/card/cardRules.vue')), 'cardRules')
  },
  meta: {
    title: '交通银行联名信用卡',
    login: false,
    hasFooter: false
  }
}]