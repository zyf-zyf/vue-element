<template>
    <div id="usersList">
        <el-card>
            
        </el-card>
    </div>
</template>
<script>
export default {
    data() {
        return {
            statusStock: 0,
            optionStock: [
                {
                    id: 0,
                    label: '平仓状态(全部)'
                },{
                    id: 1,
                    label: '已完成'
                },{
                    id: 2,
                    label: '未完成' 
                },{
                    id: 3,
                    label: '无' 
                }
            ],
        }
    }
}
</script>
<style lang="less" scoped>

</style>