// 模块引入
import Vuex from 'vuex'
import goods from './modules/goods'

// 根目录初始值
const state= {
    isOpen: false,
    isactiviteAttribute: 'first',
    isactiviteUniqueCode: 'first'
}
const mutations= {
    OPEN_MENU:(state, data) => {
		state.isOpen = data
    },
    ISACTIVITEATTRIBUTE:(state, data) => {
		state.isactiviteAttribute = data
    },
    ISACTIVITEUNIQUECODE:(state, data) => {
		state.isactiviteUniqueCode = data
    },
}
const actions= {
    openMenu({
        commit
    }, data) {
        commit('OPEN_MENU', data)
    },
    isActiviteAttribute({
        commit
    }, data) {
        commit('ISACTIVITEATTRIBUTE', data)
    },
    isActiviteUniqueCode({
        commit
    }, data) {
        commit('ISACTIVITEUNIQUECODE', data)
    },
}
export default new Vuex.Store({
    modules: {
        goods
    },
    state,
    mutations,
    actions

})