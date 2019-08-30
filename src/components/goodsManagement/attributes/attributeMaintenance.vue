<template>
    <div id="attribute">
        <div v-if="activiyName == 'first'">
            <basicAttribute></basicAttribute>
        </div>
        <div v-if="activiyName == 'second'">
            <customAttribute></customAttribute>
        </div>
    </div>
</template>
<script>
    import customAttribute from './customAttribute/customAttribute'
    import basicAttribute from './baseAttribute/basicAttributes'
    export default {
        components: {
            customAttribute,
            basicAttribute
        },
        computed: {
            activiyName () {
                return this.$store.state.isactiviteAttribute
            }
        }
    }
</script>
