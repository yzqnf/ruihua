import utils from '../../utils'

const types = {
  PRIVILEGESTATUS: 'PRIVILEGESTATUS',
}

const state = {
  privilegeStatus: null,
}

const getters = {
  getPrivilegeStatus: () => {
    return state.privilegeStatus
  },
}

const actions = {

}

const mutations = {
  [types.PRIVILEGESTATUS](state, params) {
    state.privilegeStatus = params.status
  },
}

export default {
  state,
  getters,
  actions,
  mutations
}