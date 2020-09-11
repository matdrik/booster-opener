export default {
    // ДЛЯ АВТОРИЗАЦИИ
    USER: state => state.user,
    error: state => state.error,
    authState: state => state.status,
    isLoggedIn: state => !!state.token,

    // ДЛЯ ПОКАЗА КОМПОНЕНТОВ
    CURRENT_SCREEN: state => state.current_screen,
    IS_OPENED: state => state.isOpened, // клик на бустер на экране открытия
    IS_RESULT: state => state.isResult, // результат открытия
    IS_OPENING: state => state.isOpening, // экран открытия
    IS_BOOSTER_INFO: state => state.isBoosterInfo, // информация о коллекции и бустере
    IS_CLICK_ON_BOOSTER: state => state.isClickOnBooster, // клик на бустер в списке бустеров

    // ХРАНЕНИЕ ИНФОРМАЦИИ
    BOOSTERS: state => state.boosters, // массив коллекций и бустеров в них
    COLL_DATA: state => state.coll_data, // коллекция выбранного бустера
    BOOSTER_DATA: state => state.booster_data, // выбранный бустер
    OPENING_CARDS_COUNT: state => state.openingCardsCount, // счетчик кликов на карты на экране открытия

    // УВЕДОМЛЕНИЯ
    NOTIF_isNotLoggedIn: state => state.notif_isNotLoggedIn, // если юзер - гость
    NOTIF_isNotEnoughMoney: state => state.notif_isNotEnoughMoney, // если недостаточно денег
}