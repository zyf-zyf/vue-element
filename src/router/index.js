import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/commonComponents/home'
import GoodsList from '../components/goodsManagement/goods/goodsList'
import AttributeMaintenance from '../components/goodsManagement/attributes/attributeMaintenance'
import CategoryList from '../components/goodsManagement/category/categoryList'
import UniqueCodeList from '../components/stockManagement/uniqueCode/uniqueCodeList'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: {}
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
        name: '属性维护',
        tabList: [
          {
            id: 'first',
            label: '基础属性'
          },
          {
            id: 'second',
            label: '自定义属性'
          }
        ]
      }
    },
    {
      path: '/goodsManagement/category/categoryList',
      name: 'categoryList',
      component: CategoryList,
      meta: {
        parentName: '商品管理',
        title: '类目列表',
        name: '类目管理'
      }
    },
    {
      path: '/stockManagement/uniqueCode/uniqueCodeList',
      name: 'uniqueCodeList',
      component: UniqueCodeList,
      meta: {
        parentName: '库存管理',
        title: '唯一码管理',
        name: '唯一码管理',
        tabList: [
          {
            id: 'first',
            label: '入库单'
          },
          {
            id: 'second',
            label: '采购单'
          }
        ]
      }
    }
    

  ]
})
