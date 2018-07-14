import Vue from 'vue'
import Vuex from 'vuex'
import common from './modules/common'
import policyStore from './modules/policyStore'
import privilege from './modules/privilege'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    common: common,
    policyStore: policyStore,
    privilege:privilege,
  }
})