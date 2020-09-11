<template>
    <div class="bo-opening">
        <transition name="fade" mode="out-in">
            <img
                draggable="false"
                v-show="!IS_OPENED"
                @click="openBooster"
                class="booster_image"
                :class="{ horizontal_booster: isHorizontal }"
                :src=" require( '../../assets/images/boosters/' + COLL_DATA.coll + BOOSTER_DATA.id + '.png')"
            >
        </transition>

        <bo-opening-card
            :key="openingCard.id"
            :openingCard_data="openingCard"
            v-for="openingCard in BOOSTER_DATA.cardsOnHand"
        />
        
        <transition name="fade" mode="out-in"><boOpeningResult v-if="IS_RESULT" /></transition>

        <video
            v-show="!IS_OPENED"
            playsinline autoplay muted loop
            class="opening_booster_screen_bg"
        >
            <source
                type="video/mp4"
                :src="require('../../assets/images/effects/bg/' + COLL_DATA.coll + '.mp4')"
            >
        </video>
    </div>
</template>

<script>
import store from '../../vuex/store'
import boOpeningCard from './bo-opening-card'
import boOpeningResult from './bo-opening-result'
import { mapGetters, mapMutations, mapActions } from 'vuex'

export default {
    name: 'bo-opening',
    components: {
        boOpeningCard,
        boOpeningResult
    },
    data() {
        return {
            boosterFlag: false,
            isHorizontal: store.getters.BOOSTER_DATA.isHorizontal
        }
    },
    computed: {
        ...mapGetters([
            'USER',
            'IS_OPENED',
            'IS_RESULT',
            'COLL_DATA',
            'IS_OPENING',
            'BOOSTER_DATA',
            'SET_OPENING_CARDS',
        ])
    },
    methods: {
        ...mapMutations([
            'SET_OPENED_STATE',
            'SET_BOOSTER_DATA',
            'SET_RESULT_STATE',
            'SET_OPENING_STATE',
            'SET_OPENING_CARDS_COUNT'
        ]),
        ...mapActions([
            'update',
            'getProfile'
        ]),
        userColls() {
            return store.getters.USER.colls
        },
        currentBooster() {
            return store.getters.BOOSTER_DATA
        },
        maxIndexColl() { // индекс КОЛЛЕКЦИИ с макимальным id
            return this.userColls().reduce((acc, curr, i) => this.userColls()[acc].id > curr.id ? acc : i, 0)
        },
        maxObjColl() { // объект КОЛЛЕКЦИИ с макимальным id
            return this.userColls().reduce((acc, curr) => acc.id > curr.id ? acc : curr)
        },
        maxIndexCard() { // индекс КАРТЫ с макимальным id
            return this.currentCollInUser().cards.reduce((acc, curr, i) => this.currentCollInUser().cards[acc].id > curr.id ? acc : i, 0)
        },
        maxObjCard() { // объект КАРТЫ с макимальным id
            return this.currentCollInUser().cards.reduce((acc, curr) => acc.id > curr.id ? acc : curr)
        },
        currentCollInUser() { // объект текущей коллекции в коллекциях юзера
            return this.userColls().find(colls => colls.coll === store.getters.COLL_DATA.coll)
        },
        currentCard(cardNum) { // объект текущей карты
            return this.currentCollInUser().cards.find( card => card.num === cardNum )
        },
        addToUserColl(cardNum, cardType) {
            if (this.currentCollInUser().cards.length === 0) { // Если это первая карта в коллекции
                this.currentCollInUser().cards.push( // Добавить карту с id "1"
                    {
                        id: 1,
                        num: cardNum,
                        count: 1,
                        effect: cardType.effect,
                        price: cardType.price
                    }
                )
            } else if ((this.currentCard(cardNum) === undefined) && (this.currentCollInUser().cards.length !== 0)) { // Если это НЕ первая карта в коллекции
                this.currentCollInUser().cards.push( // Добавить карту с id = макс id среди объектов
                    {
                        id: this.currentCollInUser().cards[this.maxIndexCard()].id + 1,
                        num: cardNum,
                        count: 1,
                        effect: cardType.effect,
                        price: cardType.price
                    }
                )
            } else { // Если карта уже есть в коллекции
                this.currentCard(cardNum).count++ // увеличить ее кол-во на 1
                this.currentCard(cardNum).id = this.maxObjCard().id + 1 // переписать id на макс
            }
        },

        openBooster() { // функция открытия бустера
            if (this.boosterFlag) return false; this.boosterFlag = true; // Предотвратить несколько нажатий
            this.$store.commit('user_money', store.getters.USER.money - this.currentBooster().price)
            this.$store.commit('SET_OPENING_CARDS_COUNT', 0)
            this.$store.commit('SET_OPENED_STATE', true) // бустер открыт

            if ((this.currentCollInUser() === undefined) && (this.userColls().length !== 0)) { // Если текущей коллекции нет у юзера и она не будет единственной
                this.userColls().push( // Тогда добавить ее в список коллекций юзера
                    {
                        name: store.getters.COLL_DATA.name,
                        coll: store.getters.COLL_DATA.coll,
                        id: this.userColls()[this.maxIndexColl()].id + 1, // (id объекта с макс id) + 1
                        cardsInColl: store.getters.COLL_DATA.cardsInColl,
                        cards: []
                    }
                )
            } else if (this.userColls().length === 0) { // Если это первая коллекция у юзера
                this.userColls().push( // Тогда добавить ее в список коллекций юзера
                    {
                        name: store.getters.COLL_DATA.name,
                        coll: store.getters.COLL_DATA.coll,
                        id: 1,
                        cardsInColl: store.getters.COLL_DATA.cardsInColl,
                        cards: []
                    }
                )
            }

            let commonList = Array
            let unCommonList = Array

            for (let i = 0; i < this.currentBooster().boosterModel.length; i++) { // Цикл по модели бустера
                if (this.currentBooster().boosterModel[i].type === "common") {
                    let cardType = this.currentBooster().cardTypes.find(types => types.type === "common")
                    commonList = cardType.numList
                    let cardIndex = Math.floor(0 + Math.random() * (commonList.length - 0)) // Рандомный индекс массива
                    let cardNum = commonList[cardIndex] // Номер выпавшей карты
                    this.currentBooster().cardsOnHand.unshift( { card: cardNum, id: i, effect: cardType.effect } ) // Запись в массив для экрана результатов
                    this.addToUserColl(cardNum, cardType)
                } else if (this.currentBooster().boosterModel[i].type === "unCommon") {
                    let cardType = Object
                    let tempRand = Math.ceil( Math.random() * 100 ) // Рандом для шанса выпадения
                    for (let q = 0; q < this.currentBooster().cardTypes.length; q++) {
                        if (this.currentBooster().cardTypes[q].chances !== undefined) {
                            if ((tempRand >= this.currentBooster().cardTypes[q].chances[0]) && (tempRand <= this.currentBooster().cardTypes[q].chances[1])) {
                                cardType = this.currentBooster().cardTypes[q]
                                unCommonList = cardType.numList
                            }
                        }
                    }
                    let cardIndex = Math.floor(0 + Math.random() * (unCommonList.length - 0)) // Рандомный индекс массива
                    let cardNum = unCommonList[cardIndex] // Номер выпавшей карты
                    this.currentBooster().cardsOnHand.unshift( { card: cardNum, id: i, effect: cardType.effect } ) // Запись в массив для экрана результатов
                    this.addToUserColl(cardNum, cardType)
                }
            }
            this.update(store.getters.USER)
            setTimeout(() => { this.boosterFlag = false }, 2000)
        }
    },
    mounted() {
        this.getProfile()
    }
}
</script>

<style>
.bo-opening {
	width: 100%;
	height: 100vh;
	display: flex;
	position: relative;
    position: absolute;
    align-items: center;
    justify-content: center;
    transform-style: preserve-3d;
}
.opening_booster {
	z-index: 99;
	display: flex;
    position: relative;
    align-items: center;
    justify-content: center;
}
.booster_image {
    max-height: 70vh;
    max-width: 70vw;
    transition: .5s;
    z-index: 100;
}
.horizontal_booster {
    max-width: 90vw;
}
.opening_booster_screen_bg {
    top: 0;
    left: 0;
    width: 100%;
    opacity: .05;
    z-index: -99;
    height: 100vh;
    overflow: hidden;
    object-fit: cover;
    position: absolute;
}
</style>