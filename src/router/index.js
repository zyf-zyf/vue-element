import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/commonComponents/home'
import Login from '../components/commonComponents/login'
/** 商品管理 */
import GoodsList from '../components/goodsManagement/goods/goodsList'
import AttributeMaintenance from '../components/goodsManagement/attributes/attributeMaintenance'
import CategoryList from '../components/goodsManagement/category/categoryList'

/** 库存管理 */
import UniqueCodeList from '../components/stockManagement/uniqueCode/uniqueCodeList'

/** 系统管理 */
import ModulesList from '../components/systemManagement/systemModules/modulesList'
import RolesList from '../components/systemManagement/systemRoles/rolesList'
import UsersList from '../components/systemManagement/systemUsers/usersList'


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
      path: '/login',
      name: 'login',
      component: Login,
      meta: {}
    },
    /** 商品管理 */
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
    /** 库存管理 */
        /**唯一码 */
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
    },
        /**盘点列表 */
    // {
    //   path: '/stockManagement/inventory/inventoryList',
    //   name: 'inventoryList',
    //   component: InventoryList,
    //   meta: {
    //     parentName: '库存管理',
    //     title: '盘点列表',
    //     name: '盘点列表',
    //   }
    // },
    //     /**盘点问题 */
    // {
    //   path: '/stockManagement/inventory/inventoryProblem',
    //   name: 'inventoryProblem',
    //   component: InventoryProblem,
    //   meta: {
    //     parentName: '库存管理',
    //     title: '盘点问题',
    //     name: '盘点问题',
    //   }
    // },
    /**系统管理 */
    {
      path: '/systemManagement/systemModules/modulesList',
      name: 'modulesList',
      component: ModulesList,
      meta: {
        parentName: '系统管理',
        title: '模块列表',
        name: '模块管理',
      }
    },
    {
      path: '/systemManagement/systemRoles/rolesList',
      name: 'rolesList',
      component: RolesList,
      meta: {
        parentName: '系统管理',
        title: '角色列表',
        name: '角色管理',
      }
    },
    {
      path: '/systemManagement/systemUsers/usersList',
      name: 'usersList',
      component: UsersList,
      meta: {
        parentName: '系统管理',
        title: '用户列表',
        name: '用户管理',
      }
    },

  ]
})
