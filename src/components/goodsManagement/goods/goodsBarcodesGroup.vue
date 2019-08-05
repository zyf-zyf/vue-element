<template>
    <div id="goodsBarcodesGroup">
        <el-table :data="tableData">
            <el-table-column prop="id" label="SKU编号"></el-table-column>
            <el-table-column prop="id" label="颜色"></el-table-column>
            <el-table-column prop="id" label="尺码"></el-table-column>
        </el-table>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                tableData: []
            }
        }
    }
</script>
