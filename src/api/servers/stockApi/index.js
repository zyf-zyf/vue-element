import httpRequest from '../../commonJs/http'

/**入库单查询 */
const stockInListApi= 'stock/api/stockin/orders'
/**入库单详情查询 */
const stockInDetailApi= 'stock/api/stockin/order/'


const stockControlApi= {
    /**入库单列表 */
    getStockInList: async (params) => {
        let data= await httpRequest.get(stockInListApi, {params})
        return data;
    },
    /**入库单详情 */
    getStockInDeatil: async (id, params) => {
        let data= await httpRequest.get(stockInDetailApi+ id+ '/details',{params})
        return data;
    },
}
export default stockControlApi;