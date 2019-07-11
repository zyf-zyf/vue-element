import Vue from 'vue'
import Router from 'vue-router'
import GoodsList from '../components/goodsTpl/goodsList'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
    
    },
    {
      path: '/goodsManagement/goodsList',
      name: 'goodsList',
      component: GoodsList,
      meta: {
        parentName: '商品管理',
        title: '商品列表',
        name: '商品资料'
      }
    }
  ]
})
