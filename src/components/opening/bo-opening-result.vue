<template>
    <div class="bo-opening-result">
        <div class="big_heading">Результат</div>
        <div class="result_cards">
            <boOpeningResultCard
                :key="resultCard.id"
                :resultCard_data="resultCard"
                v-for="resultCard in BOOSTER_DATA.cardsOnHand"
            />
        </div>
        <div class="opening_btns">
            <div class="result_btn" @click="toBoosters">
                <img draggable="false" src="../../assets/images/icons/back.png">
            </div>
            <div class="result_btn result_btn-big" @click="repeat">
                <img class="btn-big-img" draggable="false" src="../../assets/images/icons/again.png">
            </div>            
            <div class="result_btn" @click="toProfile">
                <img draggable="false" src="../../assets/images/icons/user.png">
            </div>
        </div>
    </div>
</template>

<script>
import store from '../../vuex/store'
import boOpeningResultCard from './bo-opening-result-card'
import { mapGetters, mapMutations, mapActions } from 'vuex'

export default {
    name: 'bo-opening-result',
    components: {
        boOpeningResultCard
    },
    computed: {
        ...mapGetters([
            'USER',
            'BOOSTER_DATA'
        ])
    },
    methods: {
        ...mapMutations([
            'SET_OPENED_STATE',
            'SET_RESULT_STATE',
            'SET_BOOSTER_DATA',
            'SET_BOOSTER_INFO',
            'SET_OPENING_STATE',
            'SET_OPENING_CARDS',
            'SET_CARDS_ON_HAND',
            'SET_CURRENT_SCREEN',
            'CLEAR_BOOSTER_DATA'
        ]),
        ...mapActions([
            'getProfile'
        ]),
        repeat() {
            if (store.getters.USER.money < store.getters.BOOSTER_DATA.price) {
                this.$store.commit('SET_NOTIF_isNotEnoughMoney', true)
            } else {
                this.$store.commit('SET_CARDS_ON_HAND', [])
                this.$store.commit('SET_RESULT_STATE', false)
                this.$store.commit('SET_OPENED_STATE', false)
            }
        },
        toBoosters() {
            this.$store.commit('SET_CARDS_ON_HAND', [])
            this.$store.commit('SET_RESULT_STATE', false)
            this.$store.commit('SET_OPENED_STATE', false)
            this.$store.commit('SET_BOOSTER_INFO', false)
            this.$store.commit('SET_OPENING_STATE', false)
            this.$store.commit('SET_CURRENT_SCREEN', 'home')
        },
        toProfile() {
            this.$store.commit('SET_CARDS_ON_HAND', [])
            this.$store.commit('SET_RESULT_STATE', false)
            this.$store.commit('SET_OPENED_STATE', false)
            this.$store.commit('SET_BOOSTER_INFO', false)
            this.$store.commit('SET_OPENING_STATE', false)
            this.$store.commit('SET_CURRENT_SCREEN', 'profile')
        }
    }
}
</script>

<style>
.bo-opening-result {
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;    
}
.result_cards {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    max-height: 70vh;
    overflow: hidden;
    overflow-y: scroll;
    align-items: center;
    justify-content: center;
    max-width: 1170px;
}
.opening_btns {
    display: flex;
    margin: 20px 0px 0 0;
    align-items: center;
    justify-content: center;    
}
.result_btn {
    padding: 10px;
    cursor: pointer;
    border-radius: 5px;
    background: #141414;
}
.result_btn img {
    width: 30px;
}
.result_btn-big:hover .result_btn-big-img {
    transform: rotate(180deg);
}
.result_btn-big {
    padding: 15px;
    margin: 0 20px;
}
.result_btn-big img {
    width: 40px;
    transition: .3s;
}
</style>