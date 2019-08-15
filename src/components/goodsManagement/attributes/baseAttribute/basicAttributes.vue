<template>
    <div id="basic-attribute">
        <el-card class="elcard">
            <el-collapse accordion>
                <el-collapse-item>
                    <template slot="title">
                        <h3>{{'品牌'}}</h3>
                    </template>
                    <div style="padding-top:10px">
                        <brandAttribute></brandAttribute>
                    </div>
                </el-collapse-item>
            </el-collapse>
        </el-card>
        
        <el-card class="elcard" v-for="(item, index) in tableList" :key="index">
            <el-collapse accordion>
                <el-collapse-item>
                    <template slot="title">
                        <h3>{{item.propertyName}}</h3>
                    </template>
                    <div style="padding-top: 10px;" v-if="item.propertyName == '尺码'">
                        <spaceAttribute :propertyId="item.propertyId"></spaceAttribute>
                    </div>
                    <div style="padding-top: 10px;" v-if="item.propertyName == '颜色'">
                        <colorAttribute :propertyId="item.propertyId"></colorAttribute>
                    </div>
                    <div style="padding-top: 10px;" v-if="item.propertyName == '材料'">
                        <materialAttribute :propertyId="item.propertyId"></materialAttribute>
                    </div>
                </el-collapse-item>
            </el-collapse>
        </el-card>
        <!-- <spaceAttribute></spaceAttribute>
        <colorAttribute></colorAttribute>
        <materialAttribute></materialAttribute> -->
    </div>
</template>
<script>
    import brandAttribute from './brandAttribute'
    import spaceAttribute from './spaceAttribute'
    import colorAttribute from './colorAttribute'
    import materialAttribute from './ materialAttribute'
    export default {
        components: {
            brandAttribute,
            spaceAttribute,
            colorAttribute,
            materialAttribute
        },
        data() {
            return{
                tableList: [],
                tableData: []
            }
        },
        mounted() {
            this.getBasicAttribute()
        },
        methods: {
            getBasicAttribute() {
                this.$server.goodsControlApi.getBasicAttribute().then(res => {
                    this.tableList= res.data
                }).catch(err => {})
            }
        }
    }
</script>
