<template>
    <div class="bo-booster-info">
        <div class="bi_coll">
            <div class="bi_heading">Коллекция</div>
            <div class="bi_text">{{ COLL_DATA.name }}</div>
            <div class="bi_progress" v-if="collected">Коллекция собрана!</div>
            <div class="bi_coll_cards">
                <div class="bi_coll_cards_container">
                    <div class="bi_heading">Карт в коллекции</div>
                    <div class="bi_text">{{ COLL_DATA.cardsInColl }}</div>
                </div>
                <div class="bi_coll_cards_container">
                    <div class="bi_heading">Прогресс коллекции</div>
                    <div class="bi_text" v-if="collInUser !== undefined">{{ collInUser.cards.length }}</div>
                    <div class="bi_text" v-else>0</div>
                </div>
            </div>
        </div>
        <div class="bi_booster">
            <img
                draggable="false"
                :class="{ bi_horizontal_booster: isHorizontal }"                
                :src="require( '../assets/images/boosters/' + COLL_DATA.coll + BOOSTER_DATA.id + '.png')"
            >
            <div class="bi_booster_cards" v-if="COLL_DATA.boosters.length > 1">
                <div class="bi_heading">Карт в бустере</div>
                <div class="bi_text">
                    {{ BOOSTER_DATA.cardsNum }} карт с номерами<br>
                    от {{ BOOSTER_DATA.range[0] }} до {{ BOOSTER_DATA.range[1] }}
                </div>
                <div class="bi_heading">Прогресс бустера</div>
                <div class="bi_text">{{ boosterProgress }}</div>
                <div class="bi_progress" v-if="collectedBooster">Все карты из бустера собраны!</div>
            </div>
        </div>
        <div class="bi_btns">
            <div @click="showOpening" class="bi_btn">
                Открыть <span class="price">{{ BOOSTER_DATA.price }}<img src="../assets/images/icons/money.png"></span>
            </div>
            <div @click="$store.commit('SET_BOOSTER_INFO', false)" class="bi_btn bi_btn_dark">Выбрать другой</div>
        </div>
    </div>
</template>

<script>
import store from '../vuex/store'
import { mapGetters, mapMutations, mapActions } from 'vuex'

export default {
    name: 'bo-booster-info',
    data() {
        return {
            collected: false,
            collectedBooster: false,
            isHorizontal: store.getters.BOOSTER_DATA.isHorizontal
        }
    },
    methods: {
        ...mapMutations([
            'SET_MONEY',            
            'SET_BOOSTER_INFO',
            'SET_OPENING_STATE',
            'SET_NOTIF_isNotLoggedIn',
            'SET_NOTIF_isNotEnoughMoney'
        ]),
        ...mapActions([
            'getProfile'
        ]),
        showOpening() {
            if (store.getters.USER.money < store.getters.BOOSTER_DATA.price) {
                this.$store.commit('SET_NOTIF_isNotEnoughMoney', true)
            } else if (store.getters.isLoggedIn) {
                this.$store.commit('SET_OPENING_STATE', true)
                this.$store.commit('SET_BOOSTER_INFO', false)
            } else {
                this.$store.commit('SET_NOTIF_isNotLoggedIn', true)
            }
        },
        checkBoosterIsCollected(count) {
            if (count === (store.getters.BOOSTER_DATA.range[1]-store.getters.BOOSTER_DATA.range[0] + 1)) {
                this.collectedBooster = true
            } else if (count !== (store.getters.BOOSTER_DATA.range[1]-store.getters.BOOSTER_DATA.range[0] + 1)) {
                this.collectedBooster = false
            }
        },
        checkBoosterProgress() {
            let count = 0
            for (let i = 0; i < this.collInUser.cards.length; i++) {
                if ((this.collInUser.cards[i].num >= store.getters.BOOSTER_DATA.range[0]) && (this.collInUser.cards[i].num <= store.getters.BOOSTER_DATA.range[1])) {
                    count++
                    this.checkBoosterIsCollected(count)
                }
            }
            return count
        }
    },
    computed: {
        ...mapGetters([
            'USER',
            'COLL_DATA',
            'isLoggedIn',
            'IS_OPENING',
            'BOOSTER_DATA',
            'NOTIF_isNotEnoughMoney',
        ]),
        boosterProgress() {
            if (this.collInUser !== undefined) {
                return this.checkBoosterProgress()
            } else return 0            
        },
        collInUser() {
            if (store.getters.USER.colls !== undefined) {
                return store.getters.USER.colls.find(colls => colls.coll === store.getters.COLL_DATA.coll)
            } else return undefined            
        }
    }
}
</script>

<style>
.bo-booster-info {
    height: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
}
.bi_coll {
    width: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
}
.bi_heading {
    opacity: .5;
    font-size: 18px;
    font-weight: 300;
}
.bi_text {
    font-size: 24px;
    margin-bottom: 20px;
}
.bi_progress {
    color: #1AEF6F;
    font-size: 18px;
}
.bi_coll_cards {
    width: 100%;
    display: flex;    
    margin-top: 20px;
    align-items: center;
    justify-content: space-between;
}
.bi_coll_cards_container {
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
}
.bi_booster {
    display: flex;
    align-items: center;
    justify-content: center;
}
.bi_booster img {
    max-height: 400px;
}
.bi_horizontal_booster {
    max-width: 400px;
}
.bi_booster_cards {
    margin-left: 20px;
}
.bi_btns {
    width: 100%;
    display: flex;
    margin-top: 20px;
    align-items: center;
    justify-content: space-between;
}
.bi_btn {
    color: black;
    display: flex;
    font-size: 24px;
    cursor: pointer;
    background: white;
    padding: 10px 15px;
    align-items: center;
    justify-content: center;
}
.bi_btn_dark {
    color: white;
    background: #141414;
}
</style>