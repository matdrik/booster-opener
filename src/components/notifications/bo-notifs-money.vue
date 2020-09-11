<template>
    <div class="notif" @click="hide">
        <div class="notif_icon">!</div>
        <div class="notif_text">
            Недостаточно средств для покупки бустера
        </div>
    </div>
</template>

<script>
import {mapMutations} from 'vuex'
export default {
    name: 'bo-notifs-money',
    methods: {
        ...mapMutations([
            'SET_NOTIF_isNotEnoughMoney'
        ]),
        hide() {
            this.$store.commit('SET_NOTIF_isNotEnoughMoney', false)
        }
    },
    mounted() {
        setTimeout(() => {
            this.hide()
        }, 3000);
    }
}
</script>

<style>

</style>