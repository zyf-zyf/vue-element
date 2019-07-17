<template>
    <div id="attribute">
    
            <div v-if="activiyName == 'first'">123</div>
            <div v-if="activiyName == 'second'">
                <customAttribute></customAttribute>
            </div>
   
    </div>
</template>
<script>
    import customAttribute from './customAttribute'
    export default {
        components: {
            customAttribute
        },
        computed: {
            activiyName () {
                return this.$store.state.isactivite
            }
        }
    }
</script>
