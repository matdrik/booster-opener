import Vue from 'vue'
import Vuex from 'vuex'

import getters from './getters/getters'
import actions from './actions/actions'
import mutations from './mutations/mutations'

Vue.use(Vuex)

let store = new Vuex.Store({
    state: {
        // Для аккаунтов
        user: {},
        status: '',
        error: null,
        updateError: null,
        token: localStorage.getItem('token') || '',
        
        // Для смены гл. экранов
        current_screen: 'home',

        // Уведомления
        notif_isNotEnoughMoney: false,
        notif_isNotLoggedIn: false,

        // Хранение данных
        boosters: [],
        coll_data: [],
        booster_data: {},
        openingCardsCount: 0,

        // Булевые
        isOpened: false,
        isResult: false,
        isOpening: false,
        isBoosterInfo: false
    },
    mutations,
    actions,
    getters
})

export default store