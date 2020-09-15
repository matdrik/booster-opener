<template>
    <div class="bo-notifs">
        <transition mode="out-in" name="fade">
            <bo-notifs-money v-if="NOTIF_isNotEnoughMoney" />
            <bo-notifs-isnotlogged v-if="NOTIF_isNotLoggedIn" />
        </transition>
    </div>
</template>

<script>
import {mapGetters} from 'vuex'
import boNotifsMoney from './bo-notifs-money'
import boNotifsIsnotlogged from './bo-notifs-isnotlogged'

export default {
    name: 'bo-notifs',
    components: {
        boNotifsMoney,
        boNotifsIsnotlogged
    },
    computed: {
        ...mapGetters([
            'NOTIF_isNotLoggedIn',
            'NOTIF_isNotEnoughMoney'
        ])
    }
}
</script>

<style>
.bo-notifs {
    right: 50px;
    bottom: 20px;
    display: flex;
    position: absolute;
    align-items: center;
    flex-direction: column;
    justify-content: flex-end;
    max-width: 340px;
    width: 100%;
}
.notif {
    width: 100%;
    display: flex;
    padding: 0 10px;
    cursor: pointer;
    font-size: 18px;
    border-radius: 5px;
    align-items: center;
    background: #141414;
    justify-content: center;    
    box-shadow: 0 0 10px rgb(255 214 0 / .2);
}
.notif_red {
    box-shadow: 0 0 10px rgb(255 0 0 / .2);
}
.notif_red .notif_icon {
    color: red;
}
.notif_icon {
    font-size: 70px;
    color: #ffd600;
    margin-right: 30px;
}
.notif_text {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
}
</style>