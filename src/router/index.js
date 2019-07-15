import Vue from 'vue'
import Router from 'vue-router'
import GoodsList from '../components/goodsManagement/goodsList'
import Upload from '../components/commonComponents/Upload'

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
    },
    {
      path: '/upload',
      name: 'upload',
      component: Upload,
      meta: {
        parentName: '组件',
        title: '上传',
        name: '上传'
      }
    }
  ]
})
