<template>
    <form @submit.prevent="registerUser">
        <input
            type="text"
            id="username"
            name="username"
            v-model="username"
            placeholder="Логин"
            class="form-control"
            @focus="$store.commit('clear_err')"
        >
        <input
            id="password"
            type="password"
            name="password"
            v-model="password"
            class="form-control"
            placeholder="Пароль"
            @focus="$store.commit('clear_err')"
        >
        <input
            type="password"
            class="form-control"
            id="confirm_password"
            name="confirm_password"
            v-model="confirm_password"
            placeholder="Подтвердить пароль"
            @focus="$store.commit('clear_err')"
        >
        <button class="submit">ok</button>
    </form>
</template>

<script>
import { mapActions, mapMutations, mapGetters } from "vuex"

export default {
    name: 'register',
    data() {
        return {
            username: "",
            password: "",
            confirm_password: "",
            money: 450,
            colls: []
        };
    },
    methods: {
        ...mapActions([
            "register"
        ]),
        ...mapMutations([
            'SET_CURRENT_SCREEN',
            'clear_err'
        ]),
        registerUser() {
            let user = {
                username: this.username,
                password: this.password,
                confirm_password: this.confirm_password,
                money: this.money,
                colls: this.colls
            };
            if ((user.username === '') || (user.password === '') || (user.confirm_password === '')) {
                return false
            } else {
                this.register(user).then(res => {
                    if (res.data.success) {
                        this.$store.commit('SET_CURRENT_SCREEN', 'home')
                    }
                });
            }
        }
    },
    computed: {
        ...mapGetters([
            'error'
        ])
    },
    mounted() {
        this.$store.commit('clear_err')
    }
}
</script>

<style></style>