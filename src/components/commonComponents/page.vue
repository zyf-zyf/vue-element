<template>
    <div>
        <div class="footer" >
            <section class="pagination"  v-if="total >= 1">
                <el-pagination
                background 
                @size-change="handleSizeChange(initSize)"
                @current-change="handlePageChange(initpage)"
                :current-page.sync="initpage"
                :page-sizes="[10, 50, 100]"
                :page-size.sync="initSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total">
                </el-pagination>
            </section>
        </div>
    </div>
</template>
<script>
    export default {
        props: ['total','page','size'],
     
        data() {
            return {
                initpage: this.page,
                initSize: this.size
            }
        },
        mounted() {
            console.log(this.page)
        },
        methods: {
            handlePageChange(page) {
                this.initpage = page
                this.$emit('handlepagechange', page)
            },
            handleSizeChange(size) {
                this.initSize = size
                this.$emit('handleSizeChange', size)
            },
        }
    }
</script>