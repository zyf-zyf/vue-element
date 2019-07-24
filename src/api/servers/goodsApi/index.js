import httpRequest from '../../commonJs/http'

const getGoodsList= 'ddaigo-platform/goods/getStockGoodsList' // 获取商品列表

const goodsControlApi = {
    /** 商品列表api */
    getGoodsList: async (params) => { 
        let data= await httpRequest.post(getGoodsList, params) 
        return data;
    }

    // 其他接口…………
}

export default goodsControlApi;
