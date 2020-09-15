<template>
    <div class="notif" @click="$store.commit('SET_NOTIF_isNotEnoughMoney', false)">
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
        ])
    },
    mounted() {
        setTimeout(() => {
            this.$store.commit('SET_NOTIF_isNotEnoughMoney', false)
        }, 3000);
    }
}
</script>

<style>

</style>