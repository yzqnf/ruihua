export default [{
  name: 'customer',
  path: 'customer',
  component(resolve) {
    require.ensure([], () => resolve(require('../components/demo/Customer.vue')), 'customer')
  }
}, {
  name: 'about',
  path: 'about',
  component(resolve) {
    require.ensure([], () => resolve(require('../components/demo/About.vue')), 'about')
  }
}, {
  name: 'list',
  path: 'list',
  component(resolve) {
    require.ensure([], () => resolve(require('../components/demo/List.vue')), 'list')
  },
  meta: {
    hasFooter: true
  }
}, {
  name: 'chart',
  path: 'chart',
  component(resolve) {
    require.ensure([], () => resolve(require('../components/demo/Chart.vue')), 'chart')
  }
}, {
  name: 'contact',
  path: 'contact',
  component(resolve) {
    require.ensure([], () => resolve(require('../components/demo/Contact.vue')), 'contact')
  }
}, {
  name: 'form',
  path: 'form',
  component(resolve) {
    require.ensure([], () => resolve(require('../components/demo/Form.vue')), 'form')
  }
}, {
  name: 'loading',
  path: 'loading',
  component(resolve) {
    require.ensure([], () => resolve(require('../components/demo/Loading.vue')), 'form')
  }
}, {
  name: 'map',
  path: 'map',
  component(resolve) {
    require.ensure([], () => resolve(require('../components/demo/Map.vue')), 'map')
  }
}, {
  name: 'demo',
  path: 'demo',
  component(resolve) {
    require.ensure([], () => resolve(require('../components/demo/Demo.vue')), 'demo')
  },
  meta: {
    login: false
  }
}, {
  name: 'wechat',
  path: 'wechat',
  component(resolve) {
    require.ensure([], () => resolve(require('../components/demo/Wechat.vue')), 'wechat')
  },
  meta: {
    login: false
  }
}]