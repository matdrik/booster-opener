import axios from 'axios'

// 192.168.0.105

export default {
    // Авторизация
    async login({
        commit
    }, user) {
        commit('auth_request')
        try {
            let res = await axios.post('http://localhost:3000/api/users/login', user)
            if (res.data.success) {
                const token = res.data.token
                const user = res.data.user
                localStorage.setItem('token', token)
                axios.defaults.headers.common['Authorization'] = token
                commit('auth_success', token, user)
            }
            return res
        } catch (err) {
            commit('set_err', err)
        }
    },

    // Регистрация
    async register({
        commit
    }, userData) {
        try {
            commit('register_request')
            let res = await axios.post('http://localhost:3000/api/users/register', userData)
            if (res.data.success !== undefined) {
                commit('register_success')
            }
            return res
        } catch (err) {
            commit('set_err', err)
        }
    },

    // Обновление пользователя
    async update({commit}, updateData) {
        try {
            await axios.put('http://localhost:3000/api/users/userUpdate', updateData)
        }
        catch (err) {
            commit('set_err', err)
        }
    },

    // Получить пользователя
    async getProfile({
        commit
    }) {
        commit('profile_request')
        await axios.get('http://localhost:3000/api/users/profile')
            .then(res => commit('user_profile', res.data.user))
            .catch(error => {
                if (error.response.data === "Unauthorized") {
                    localStorage.removeItem('token')
                }
            })
    },

    // Выход из аккаунта
    async logout({
        commit
    }) {
        await localStorage.removeItem('token')
        commit('logout')
        delete axios.defaults.headers.common['Authorization']
        commit('SET_CURRENT_SCREEN', 'auth')
        return
    },

    // Получить коллекции и бустеры
    async GET_BOOSTERS_FROM_API({commit}) {
        try {
            const boosters = await axios('http://localhost:3000/api/boosters', {
                method: "GET"
            })
            commit('SET_BOOSTERS_TO_STATE', boosters.data)
            return boosters
        }
        catch (error) {
            console.log(error)
            return error
        }
    }
}