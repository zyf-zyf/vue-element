<template>
    <div>
        <el-card>
          <el-table :data="tableData">
            <el-table-column prop="date" label="日期" width="140">
            </el-table-column>
            <el-table-column prop="name" label="姓名" width="120">
            </el-table-column>
            <el-table-column prop="address" label="地址">
            </el-table-column>
          </el-table>
          </el-card>
    </div>
</template>
<script>
export default {
    data() {
      const item = {
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      };
      return {
        tableData: Array(20).fill(item)
      }
    },
    mounted() {
        console.log(this.$server, 'hell')
        console.log(this.formate(1562653376639, 'yyyy/MM/dd hh:mm:ss'))
        console.log(this.$server.goodsControlApi.getGoodsList)
        var params= {"data":{"page":1,"size":10,"condition":"1","orderby":"1","soldout":"","storeNo":"S00000001","searchName":"","relationUnify":"1","barCode":"","isTemp":""}}
        this.$server.goodsControlApi.getGoodsList( params).then(res => {
            console.log(res, 'res')
        }).catch(err => {
            console.log(err)
        })
    }
}
</script>

