//回访链接已失效页面
const invalidLink = resolve => require.ensure([], () => resolve(require('../components/visit/InvalidLink.vue')), 'invalidLink')
//回访链接已参与页面
const visitSuccessed = resolve => require.ensure([], () => resolve(require('../components/visit/VisitSuccessed.vue')), 'visitSuccessed')
//回访问卷页面
const questionare = resolve => require.ensure([], () => resolve(require('../components/visit/Questionare.vue')), 'questionare')
//回访判断页面
const returnVisit = resolve => require.ensure([], () => resolve(require('../components/visit/ReturnVisit.vue')), 'returnVisit')


export default [{
  name: 'invalidLink',
  path: 'invalidLink',
  component: invalidLink,
  meta: {
      login: false,
      title: '回访提示'
  }
},{
  name: 'visitSuccessed',
  path: 'visitSuccessed',
  component: visitSuccessed,
  meta: {
      login: false,
      title: '回访提示'
  }
},{
  name: 'returnVisit',
  path: 'returnVisit/:cPlyNo',
  component: returnVisit,
  meta: {
      login: false,
      title: '在线回访'
  }
},{
  name: 'questionare',
  path: 'questionare/:cPlyNo',
  component: questionare,
  meta: {
      login: true,
      title: '在线回访'
  }
}]