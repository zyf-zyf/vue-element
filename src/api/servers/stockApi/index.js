import httpRequest from '../../commonJs/http'

/**入库单查询 */
const stockInListApi= 'stock/api/stockin/orders'
/**入库单详情查询 */
const stockInDetailApi= 'stock/api/stockin/order/'


const stockControlApi= {
    getStockInList: async (params) => {
        let data= await httpRequest.get(stockInListApi, {params})
        return data;
    },
    getStockInDeatil: async (params) => {
        let data= await httpRequest.get(stockInDetailApi+ params+ '/details')
        return data;
    },
    downLoadStockInBystockInId: async (params) => {
        let data= await httpRequest.get(stockInDetailApi + params+ '/excel')
        return data;
    }
}
export default stockControlApi;