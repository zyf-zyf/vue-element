// 模块引入
import Vuex from 'vuex'
import goods from './modules/goods'

// 根目录初始值
const state= {
    isOpen: false,
    isactivite: 'first'
}
const mutations= {
    OPEN_MENU:(state, data) => {
		state.isOpen = data
    },
    ISACTIVITE:(state, data) => {
		state.isactivite = data
    },
}
const actions= {
    openMenu({
        commit
    }, data) {
        commit('OPEN_MENU', data)
    },
    isActivite({
        commit
    }, data) {
        commit('ISACTIVITE', data)
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