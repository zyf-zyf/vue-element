// 模块引入
import Vuex from 'vuex'
import goods from './modules/goods'

// 根目录初始值
const state= {
    isOpen: false,
    isactiviteAttribute: 'first',
    isactiviteUniqueCode: 'first',
    imageArr: [],
    progress: 0,
    isLogin: false
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
        state.imageArr=data 
    },
    // excel下载进度
    CHANGE_PROGRESS: (state, data) => {
        state.progress= data
    },
    //登录
    IS_LOGIN: (state, data) => {
        state.isLogin= data
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
    },
    changeProgress({commit}, data) {
        commit('CHANGE_PROGRESS', data)
    },
    isLogin({commit}, data) {
        commit('IS_LOGIN', data)
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