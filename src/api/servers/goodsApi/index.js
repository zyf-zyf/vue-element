import httpRequest from '../../commonJs/http'
/**
 * 商品管理 */
const getGoodsList= 'product/api/goods/list/v2' // 获取商品列表
const goodsItemApi= 'product/api/goods' //


/**
 * 基础属性 
*/
/**基础属性列表 */
/**品牌属性 */
const getBrandList= '/product/api/goods/brands' /**品牌列表 */
const addBrandApi= 'product/api/goods/brand' /**品牌添加、编辑、查询、删除 */

/**基础属性列表 */
const getBasicAttribute= 'product/api/goods/property/base/list' /**基础属性列表 */
/**商品属性值管理 */
const getAttributeVal= 'product/api/goods/property/value/list/' /**获取属性值列表 */
const addAttributeVal= 'product/api/goods/property/value' /**属性值添加、删除 、编辑*/
const getAtttributeValueGroupList= 'product/api/goods/property/value/list/group/'


/**自定义属性 */
const getCustomPropertyList= '/product/api/goods/property/custom/list' /**自定义属性列表 */
const addCustomProperty= 'product/api/goods/property' /**添加属性 */

/**商品属性分组管理*/
const getGroupListByPropertyId= 'product/api/goods/property/group/groups' /**属性分组列表 */
const addGroupItem= 'product/api/goods/property/group' /**添加属性分组、 删除、编辑*/

/**
    商品类目管理
 */

const getCategoryList= 'product/api/goods/categories' /**类目列表 */
const addCategory= 'product/api/goods/category' /**类目添加、编辑、删除、 */

const goodsControlApi = {
    /** 商品列表api */
    getGoodsList: async (query, params) => { 
        let data= await httpRequest.post(getGoodsList+ '?page='+query.page +'&size=' +query.size, params) 
        return data;
    },
    /**添加商品 */
    addGoodsApi: async (params) => {
        let data= await httpRequest.post(goodsItemApi, params)
        return data;
    },
    /**商品详情 */
    detailGoodsApi: async (params) => {
        let data= await httpRequest.get(goodsItemApi + '/' +params)
        return data;
    },
    /**商品编辑 */
    editGoodsApi: async (id, params) => {
        let data= await httpRequest.put(goodsItemApi + '/' + id, params)
        return data;
    },
    /**商品删除 */
    delGoodsApi: async (params) => {
        let data= await httpRequest.put(goodsItemApi +'/ids', params)
        return data;
    },
    /**更改商品状态 */
    changeGoodsStatisApi: async (isLocked, params) => {
        let data= await httpRequest.patch(goodsItemApi+ '/' + isLocked, params)
        return data;
    },
    /**生成商品编码 */
    generatingCommodityCode: async (params) => {
        let data= await httpRequest.post(goodsItemApi + '/code', params)
        return data;
    },
 
    /* 商品属性 Api 接口集合*/
    /**基础属性 品牌属性 */
    /**品牌列表 */
    getBrandList: async (params) => {
        let data= await httpRequest.get(getBrandList,{params})
        return data;
    },
    /** 添加品牌 */
    addBrandApi: async (params) => {
        let data= await httpRequest.post(addBrandApi,params)
        return data;
    },  
    /** 删除品牌 */
    delBrandApi: async (params) => {
        console.log(params, '商品delete')
        let data= await httpRequest.delete(addBrandApi+'/'+ params.goodsBrandId)
        return data;
    },
    /** 品牌详情 */
    detailBrandApi: async (params) => {
        let data= await httpRequest.get(addBrandApi + '/' +params)
        return data;
    },
    /** 品牌修改 */
    editBrandApi: async (id, params) => {
        let data= await httpRequest.put(addBrandApi+'/' + id, params)
        return data;
    },

    /** 
     * 商品属性维护
    */
    /**基础属性列表 */
    getBasicAttribute: async (params) => {
        let data= await httpRequest.get(getBasicAttribute)
        return data;
    },
    /**商品属性值管理 */
    /**属性值列表 */
    getAttributeVal: async ( params,query) => {
      
        let data= await httpRequest.get(getAttributeVal+params +'?content='+query.content)
        return data;
    },
    addAttributeVal: async (params) => {
        let data= await httpRequest.post(addAttributeVal, params)
        return data;
    },
    delAttributeVal: async (params) => {
        let data= await httpRequest.delete(addAttributeVal + '/' +params)
        return data;
    },
    editAttributeVal: async (params) => {
        let data= await httpRequest.put(addAttributeVal, params)
        return data;
    },
    /**获取属性值分组列表 */
    getAtttributeValueGroupList: async (params, query) => {
        let data= await httpRequest.get(getAtttributeValueGroupList+ params + '?content='+query.content)
        return data;
    },
    /*
        自定义属性 
    */
    /**自定义属性列表 */
    getCustomPropertyList: async(params) => {
        let data= await httpRequest.get(getCustomPropertyList, params)
        return data;
    },
    addCustomProperty: async (params) => {
        let data= await httpRequest.post(addCustomProperty, params)
        return data;
    },

    /*
      自定义属性分组 
    */

    /**自定义属性分组列表 */
    getGroupListByPropertyId: async (params) => {
        let data= await httpRequest.get(getGroupListByPropertyId +'/'+ params.propertyId)
        return data;
    },
    /**添加属性值 */
    addGroupItem: async (params) => {
        let data= await httpRequest.post(addGroupItem, params)
        return data;
    },
    /**删除属性 */
    delGroupItem: async (params) => {
        let data= await httpRequest.delete(addGroupItem +'/'+params.propertyGroupId)
        return data;
    },
    editGroupItem: async (params)=>{
        let data= await httpRequest.put(addGroupItem, params);
        return data;
    },
    
    /**
        商品类目管理
     */
    getCategoryList: async () => {
        let data= await httpRequest.get(getCategoryList)
        return data;
    },
    addCategory: async (params) => {
        let data= await httpRequest.post(addCategory, params)
        return data;
    },
    detailCategory: async (params) => {
        let data= await httpRequest.get(addCategory+ '/' + params)
        return data;
    },
    editCategory: async (id, params) => {
        let data= await httpRequest.put(addCategory+ '/' + id, params)
        return data;
    },
    delCategory: async (params) => {
        let data= await httpRequest.delete(addCategory+ '/' +params)
        return data;
    },
    getTopCategoryList: async (params) => {
        let data= await httpRequest.get(getCategoryList+ '/top')
        return data;
    },
    getNextCategoryList: async (params) => {
        let data= await httpRequest.get(getCategoryList+'/child'+ '?categoryCode=' +params)
        return data;

    }


}

export default goodsControlApi;
