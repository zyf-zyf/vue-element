import httpRequest from '../../commonJs/http'

const getGoodsList= 'ddaigo-platform/goods/getStockGoodsList' // 获取商品列表

const goodsControlApi = {
    // 商品列表
    getGoodsList( params) {
        return httpRequest.post(getGoodsList, params);
    }
    // 其他接口…………
}

export default goodsControlApi;
