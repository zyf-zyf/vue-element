import Vue from 'vue'
import Router from 'vue-router'
import GoodsList from '../components/goodsManagement/goods/goodsList'
import AttributeMaintenance from '../components/goodsManagement/attributes/attributeMaintenance'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
    
    },
    {
      path: '/goodsManagement/goods/goodsList',
      name: 'goodsList',
      component: GoodsList,
      meta: {
        parentName: '商品管理',
        title: '商品列表',
        name: '商品资料'
      }
    },
    {
      path: '/goodsManagement/attributes/attributeMaintenance',
      name: 'attributeMaintenance',
      component: AttributeMaintenance,
      meta: {
        parentName: '商品管理',
        title: '属性列表',
        name: '属性维护'
      }
    },

  ]
})
