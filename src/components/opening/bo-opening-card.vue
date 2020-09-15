<template>
    <transition name="slide" mode="out-in">
        <div
            @click="hideCard"
            class="opening_card_container"
            v-if="OPENING_CARDS_COUNT === openingCard_data.id"
        >
            <video
                class="card_effect"
                playsinline autoplay muted loop
                v-if="openingCard_data.effect !== 'none'"
            >
                <source
                    type="video/mp4"
                    :src="require('../../assets/images/effects/' + openingCard_data.effect + '.mp4')"
                >
            </video>
            <img
                draggable="false"
                class="opening_card"
                :src="require( '../../assets/images/cards/' + COLL_DATA.coll + '/' + openingCard_data.card + '.jpg')"
            >
        </div>
    </transition>
</template>

<script>
import store from '../../vuex/store'
import { mapGetters, mapMutations } from 'vuex'

export default {
    name: 'bo-opening-card',
    props: {
        openingCard_data: {
            type: Object,
            default() {
                return {}
            }
        }
    },
    data() {
        return {
            card: true,
            openingCardFlag: false
        }
    },
    computed: {
        ...mapGetters([
            'COLL_DATA',
            'BOOSTER_DATA',
            'OPENING_CARDS_COUNT'
        ])
    },
    methods: {
        ...mapMutations([
            'SET_RESULT_STATE',
            'INC_OPENING_CARDS_COUNT',
            'SET_OPENING_CARDS_COUNT'
            
        ]),
        hideCard() {
            if (this.openingCardFlag) return false; this.openingCardFlag = true // предотвратить несколько нажатий
            this.card = false
            this.$store.commit('INC_OPENING_CARDS_COUNT')
            if (store.getters.OPENING_CARDS_COUNT === store.getters.BOOSTER_DATA.boosterModel.length) {
                this.$store.commit('SET_RESULT_STATE', true)
                this.$store.commit('SET_OPENING_CARDS_COUNT', -1)
            }
        }
    },
    mounted() {
        this.card = true
    }
}
</script>

<style>
/* Анимации VUE */
.slide-leave-active {
    transition: all .3s ease;
}
.slide-leave-to {
    opacity: 0;
    transform: translateY(10vh);
}

.opening_card_container {
    display: flex;
    position: absolute;
    align-items: center;
    justify-content: center;
}
.opening_card {
    width: 85%;    
    z-index: -1;
    width: 300px;
    height: 420px;
    transition: .3s;
    border-radius: 10px;
}
</style>