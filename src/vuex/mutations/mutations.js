export default {
    // Для аккаунтов
    auth_request(state) {
        state.error = null
        state.status = 'loading'
    },
    auth_success(state, token, user) {
        state.token = token
        state.user = user
        state.status = 'success'
        state.error = null
    },
    register_request(state) {
        state.error = null
        state.status = 'loading'
    },
    register_success(state) {
        state.error = null
        state.status = 'success'
    },
    logout(state) {
        state.error = null
        state.status = ''
        state.token = ''
        state.user = ''
    },
    profile_request(state) {
        state.status = 'loading'
    },
    user_profile(state, user) {
        state.user = user
    },
    user_money: (state, payload) => {
        state.user.money = payload
    },
    set_err(state, err) {
        state.error = err.response.data.msg
    },
    clear_err(state) {
        state.error = ''
    },

    // Для смены гл. экранов
    SET_CURRENT_SCREEN: (state, payload) => {
        state.current_screen = payload
    },

    // 
    SET_BOOSTERS_TO_STATE: (state, boosters) => {
        state.boosters = boosters
    },
    SET_BOOSTER_DATA: (state, payload) => {
        state.booster_data = payload
    },
    CLEAR_BOOSTER_DATA: (state) => {
        for (var prop in state.booster_data) delete state.booster_data[prop];
    },
    SET_CARDS_ON_HAND: (state, payload) => {
        state.booster_data.cardsOnHand = payload
    },
    SET_COLL_DATA: (state, payload) => {
        state.coll_data = payload
    },
    INC_OPENING_CARDS_COUNT: (state) => {
        state.openingCardsCount++
    },
    SET_OPENING_CARDS_COUNT: (state, payload) => {
        state.openingCardsCount = payload
    },

    // Булевые
    SET_OPENING_STATE: (state, payload) => {
        state.isOpening = payload
    },
    SET_OPENED_STATE: (state, payload) => {
        state.isOpened = payload
    },
    SET_RESULT_STATE: (state, payload) => {
        state.isResult = payload
    },
    SET_CLICK_ON_BOOSTER: (state, payload) => {
        state.isClickOnBooster = payload
    },
    SET_BOOSTER_INFO: (state, payload) => {
        state.isBoosterInfo = payload
    },

    // Уведомления
    SET_NOTIF_isNotEnoughMoney: (state, payload) => {
        state.notif_isNotEnoughMoney = payload
    },
    SET_NOTIF_isNotLoggedIn: (state, payload) => {
        state.notif_isNotLoggedIn = payload
    }
}