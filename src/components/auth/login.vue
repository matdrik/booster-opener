<template>
    <form @submit.prevent="loginUser">
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
            type="submit"
            value="Войти"
            class="submit"
        >
    </form>
</template>

<script>
import { mapActions, mapMutations, mapGetters } from "vuex"

export default {
    name: 'login',
    data() {
        return {
            username: "",
            password: ""
        };
    },
    methods: {
        ...mapActions([
            "login"
        ]),
        ...mapMutations([
            'SET_CURRENT_SCREEN',
            'clear_err'
        ]),
        loginUser() {
            let user = {
                username: this.username,
                password: this.password
            }
            if ((user.username === '') || (user.password === '')) {
                return false
            } else {
                this.login(user)
                    .then(res => {
                        if (res.data.success) {
                            this.$store.commit('SET_CURRENT_SCREEN', 'profile')
                        } 
                    })
                    .catch(err => {
                        console.log(err);
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