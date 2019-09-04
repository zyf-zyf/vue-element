// 菜单集合
const Menu=[
    {
        id: '1-1',
        title: '商品管理',
        icon: 'iconfont icon-shangpinguanli-wei',
        path: '/goodsManagement',
        children: [
            {
                id: '1-1-1',
                title: '商品资料',
                path: '/goodsManagement/goods/goodsList'
            },
            {
                id: '1-1-2',
                title: '类目管理',
                path: '/goodsManagement/category/categoryList'
            },
            {
                id: '1-1-3',
                title: '属性维护',
                path: '/goodsManagement/attributes/attributeMaintenance'
            }
        ]
    },
    {
        id: '1-2',
        title: '库存管理',
        icon: 'iconfont icon-kucunguanli-weixuan',
        path: '/stockManagement',
        children: [
            {
                id: '1-2-1',
                title: '唯一码管理',
                path: '/stockManagement/uniqueCode/uniqueCodeList'
            },
            {
                id: '1-2-2',
                title: '库存管理',
                path: '/stockManagement/stockManage/stockList'
            },
        ]
    },
    {
        id: '1-3',
        title: '系统管理',
        icon: 'iconfont icon-xitongshezhi-wei',
        path: '/systemManagement',
        children: [
            {
                id: '1-3-1',
                title: '模块管理',
                path: '/systemManagement/systemModules/modulesList'
            },
            {
                id: '1-3-2',
                title: '角色管理',
                path: '/systemManagement/systemRoles/rolesList'
            },
            {
                id: '1-3-3',
                title: '用户管理',
                path: '/systemManagement/systemUsers/usersList'
            },
        ]
    }
]

export default Menu;