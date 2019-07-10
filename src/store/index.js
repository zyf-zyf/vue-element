// 模块引入
import Vuex from 'vuex'
import goods from './modules/goods'

// 根目录初始值
const state= {
    page: 1
}
export default new Vuex.Store({
    modules: {
        goods
    },
    state

})