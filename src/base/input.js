import Vue from 'vue'

export default Vue.component('baseInput', {
    data() {
        return {
            message: '123'
        }
    },
    template: '<input class="base-input" type="text" v-model="message"></input>'
})