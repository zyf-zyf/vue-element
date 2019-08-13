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
    }
]

export default Menu;