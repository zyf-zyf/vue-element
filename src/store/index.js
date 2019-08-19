// 模块引入
import Vuex from 'vuex'
import goods from './modules/goods'

// 根目录初始值
const state= {
    isOpen: false,
    isactiviteAttribute: 'first',
    isactiviteUniqueCode: 'first',
    imageArr: []
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
    UPLOADIMAGES: (state, data) => {
        state.imageArr.push(data) 
    }
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
    uploadImages({commit}, data) {
        commit ('UPLOADIMAGES', data)
    }
}
export default new Vuex.Store({
    modules: {
        goods
    },
    state,
    mutations,
    actions

})