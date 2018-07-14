export default [{
  name: 'home',
  path: 'home',
  component(resolve) {
    require.ensure([], () => resolve(require('../components/home/Home.vue')), 'home')
  },
  meta: {
    title: '首页',
    login: false,
    hasFooter: true
  }
}]