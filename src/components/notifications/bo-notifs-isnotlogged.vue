<template>
    <div class="notif notif_red" @click="$store.commit('SET_NOTIF_isNotLoggedIn', false)">
        <div class="notif_icon">!</div>
        <div class="notif_text">
            <div
                style="color:#f75b5b"
                @click="$store.commit('SET_CURRENT_SCREEN', 'auth')"
            >Войдите</div>
            , чтобы открыть бустер
        </div>
    </div>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
    name: 'bo-notifs-isnotlogged',
    methods: {
        ...mapMutations([
            'SET_CURRENT_SCREEN',
            'SET_NOTIF_isNotLoggedIn'
        ])
    },
    mounted() {
        setTimeout(() => {
            this.$store.commit('SET_NOTIF_isNotLoggedIn', false)
        }, 3000);
    }
}
</script>

<style></style>