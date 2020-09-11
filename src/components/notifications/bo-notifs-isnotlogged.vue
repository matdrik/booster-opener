<template>
    <div class="notif notif_red" @click="hide">
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
        ]),
        hide() {
            this.$store.commit('SET_NOTIF_isNotLoggedIn', false)
        }
    },
    mounted() {
        setTimeout(() => {
            this.hide()
        }, 3000);
    }
}
</script>

<style></style>