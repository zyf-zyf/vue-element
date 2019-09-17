const Modules= [
    {
        moduleId: 1,
        moduleCode: 'PC',
        moduleLevel: 1,
        moduleName: 'P C 管理',
        gmtCreate: '2019-09-17',
        gmtModified: null,
        isDeleted: 0,
        isLocked: 1,
        moduleUrl: null,
        children: [
            {
                moduleId: 101,
                moduleCode: 'goodsManagement',
                moduleLevel: 2,
                moduleName: '商品管理',
                gmtCreate: '2019-09-17',
                gmtModified: null,
                isDeleted: 0,
                isLocked: 1,
                moduleUrl: null,
                children: [
                    {
                        moduleId: 10101,
                        moduleCode: 'goodsList',
                        moduleUrl: '/goodsManagement/goods/goodsList',
                        moduleLevel: 3,
                        moduleName: '商品资料',
                        gmtCreate: '2019-09-17',
                        gmtModified: null,
                        isDeleted: 0,
                        isLocked: 1, 
                    },
                    {
                        moduleId: 10102,
                        moduleCode: 'categoryList',
                        moduleUrl: '/goodsManagement/category/categoryList',
                        moduleLevel: 3,
                        moduleName: '类目管理',
                        gmtCreate: '2019-09-17',
                        gmtModified: null,
                        isDeleted: 0,
                        isLocked: 1, 
                    },
                    {
                        moduleId: 10103,
                        moduleCode: 'attributeMaintenance',
                        moduleUrl: '/goodsManagement/attributes/attributeMaintenance',
                        moduleLevel: 3,
                        moduleName: '属性维护',
                        gmtCreate: '2019-09-17',
                        gmtModified: null,
                        isDeleted: 0,
                        isLocked: 1, 
                    }
                ]
            },
            {
                moduleId: 102,
                moduleCode: 'stockManagement',
                moduleLevel: 2,
                moduleName: '库存管理',
                gmtCreate: '2019-09-17',
                gmtModified: null,
                isDeleted: 0,
                isLocked: 1,
                children: [
                    {
                        moduleId: 10201,
                        moduleCode: 'uniqueCodeList',
                        moduleUrl: '/stockManagement/uniqueCode/uniqueCodeList',
                        moduleLevel: 3,
                        moduleName: '入库管理',
                        gmtCreate: '2019-09-17',
                        gmtModified: null,
                        isDeleted: 0,
                        isLocked: 1, 
                    } 
                ]
            },
            {
                moduleId: 103,
                moduleCode: 'systemManagement',
                moduleLevel: 2,
                moduleName: '系统管理',
                gmtCreate: '2019-09-17',
                gmtModified: null,
                isDeleted: 0,
                isLocked: 1,
                children: [
                    {
                        moduleId: 10301,
                        moduleCode: 'modulesList',
                        moduleUrl: '/systemManagement/systemModules/modulesList',
                        moduleLevel: 3,
                        moduleName: '模块管理',
                        gmtCreate: '2019-09-17',
                        gmtModified: null,
                        isDeleted: 0,
                        isLocked: 1, 
                    },
                    {
                        moduleId: 10302,
                        moduleCode: 'rolesList',
                        moduleUrl: '/systemManagement/systemRoles/rolesList',
                        moduleLevel: 3,
                        moduleName: '角色管理',
                        gmtCreate: '2019-09-17',
                        gmtModified: null,
                        isDeleted: 0,
                        isLocked: 1, 
                    },
                    {
                        moduleId: 10304,
                        moduleCode: 'usersList',
                        moduleUrl: '/systemManagement/systemUsers/usersList',
                        moduleLevel: 3,
                        moduleName: '用户管理',
                        gmtCreate: '2019-09-17',
                        gmtModified: null,
                        isDeleted: 0,
                        isLocked: 1, 
                    } 
                ]
            },
        ]
    },
    {
        moduleId: 2,
        moduleCode: 'MOBILE',
        moduleLevel: 1,
        moduleName: '优爆助手',
        gmtCreate: '2019-09-17',
        gmtModified: null,
        isDeleted: 0,
        isLocked: 1,
        moduleUrl: null,
        children: [
            {
                moduleId: 201,
                moduleCode: 'boss',
                moduleLevel: 1,
                moduleName: '老板看板',
                gmtCreate: '2019-09-17',
                gmtModified: null,
                isDeleted: 0,
                isLocked: 1,
                moduleUrl: null,
                children: [
                    
                ] 
            }
        ]
    },
]

export default Modules;