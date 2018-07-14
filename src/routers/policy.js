//路由父路由
const policy = r => require.ensure([], () => r(require('../components/policy/Policy.vue')), 'policy')
//健康告知
const health = r => require.ensure([], () => r(require('../components/policy/Health.vue')), 'health')
// 投保首页
const policyInfo = r => require.ensure([], () => r(require('../components/policy/PolicyInfo.vue')), 'policyInfo')
//确认信息
const policyMsg = r => require.ensure([], () => r(require('../components/policy/PolicyMsg.vue')), 'policyMsg')
//支付
const policyPay = r => require.ensure([], () => r(require('../components/policy/PolicyPay.vue')), 'policyPay')
//支付状态
const policyPayState = r => require.ensure([], () => r(require('../components/policy/PolicyPayState.vue')), 'policyPayState')
//反洗钱声明
const moneyLaundering = r => require.ensure([], () => r(require('../components/policy/MoneyLaundering.vue')), 'moneyLaundering')

export default [{
	name: 'policy',
	path: 'policy',
	component: policy,
	children: [{
		name: 'health',
		path: 'health',
		component: health,
		meta: {
			title: '健康告知'
		}
	}, {
		name: 'policyInfo',
		path: 'policyInfo',
		component: policyInfo,
		meta: {
			title: '填写投保信息'
		}
	}, {
		name: 'policyMsg',
		path: 'policyMsg',
		component: policyMsg,
		meta: {
			title: '确认投保信息'
		}
	}, {
		name: 'policyPay',
		path: 'policyPay',
		component: policyPay,
		meta: {
			title: '确认订单'
		}
	}, {
		name: 'policyPayState',
		path: 'policyPayState/:pay/:result/:policyNo',
		component: policyPayState,
		meta: {
			title: '支付结果'
		}
	}, {
		name: 'moneyLaundering',
		path: 'moneyLaundering',
		component: moneyLaundering,
		meta: {
			title: '反洗钱声明'
		}
	}]
}]