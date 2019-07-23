<template>
    <div id="basic-attribute">
        <brandAttribute></brandAttribute>
        <spaceAttribute></spaceAttribute>
        <colorAttribute></colorAttribute>
        <materialAttribute></materialAttribute>
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
        }
    }
</script>
