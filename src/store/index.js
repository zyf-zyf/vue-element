// 模块引入
import Vuex from 'vuex'
import goods from './modules/goods'

// 根目录初始值
const state= {
    isOpen: false,
   // isCollapse: false
}
const mutations= {
    OPEN_MENU:(state, data) => {
		state.isOpen = data
    },
    // ISCOLLAPSE:(state, data) => {
	// 	state.isCollapse = data
    // },
}
const actions= {
    openMenu({
        commit
    }, data) {
        commit('OPEN_MENU', data)
    },
    // openMenu({
    //     commit
    // }, data) {
    //     commit('OPEN_MENU', data)
    // },
}
export default new Vuex.Store({
    modules: {
        goods
    },
    state,
    mutations,
    actions

})