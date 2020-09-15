<template>
    <div class="bo-collection-card">
        <video
            class="card_effect"
            playsinline autoplay muted loop
            @click="isCardActsInfo = !isCardActsInfo"
            v-if="collectionCard_data.effect !== 'none'"
        >
            <source :src="require('../../assets/images/effects/' + collectionCard_data.effect + '.mp4')" type="video/mp4">
        </video>
        <img
            draggable="false"
            class="coll-card"
            @click="isCardActsInfo = !isCardActsInfo"
            :src="require( '../../assets/images/cards/' + coll_data.coll + '/' + collectionCard_data.num + '.jpg')"
        >
        <div class="count_over" v-if="collectionCard_data.count > 1">
            {{ collectionCard_data.count }}
        </div>
        <div class="card__acts-info" v-if="isCardActsInfo">
            <div class="acts-info" v-if="!sale">
                <div class="acts-info_container">
                    <div class="num">
                        <img draggable="false" src="../../assets/images/icons/numberColored.png" class="icon">
                        {{ collectionCard_data.num }}
                    </div>
                    <div class="count">
                        {{ collectionCard_data.count }} шт.
                    </div>
                </div>
                <div class="acts-info_container">
                    <img draggable="false" src="../../assets/images/icons/loupe.png" class="card_act">
                    <img @click="sale = !sale" draggable="false" src="../../assets/images/icons/cart.png" class="card_act">
                </div>
                <img @click="isCardActsInfo = !isCardActsInfo" draggable="false" src="../../assets/images/icons/crossAlt.png" class="card_cross">
                <div class="price">
                    {{ collectionCard_data.price }}
                    <img draggable="false" src="../../assets/images/icons/money.png">
                </div>
            </div>

            <div class="sale" v-if="sale">
                <div>Продать</div>
                <div v-if="collectionCard_data.count === 1">последнюю</div>
                <div>карточку</div>
                <div>за {{ collectionCard_data.price }}<img class="mini-icon" draggable="false" src="../../assets/images/icons/money.png">?</div>
                <div>
                    <img
                        class="sale-btn"
                        draggable="false"
                        @click="saleCard(); isCardActsInfo = false"
                        src="../../assets/images/icons/checkGreen.png"
                    >
                    <img
                        class="sale-btn"
                        draggable="false"
                        @click="sale = !sale; isCardActsInfo = false"
                        src="../../assets/images/icons/crossAltRed.png"
                    >
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import store from '../../vuex/store'
import { mapGetters, mapMutations, mapActions } from 'vuex'

export default {
    name: 'bo-collection-card',
    props: {
        collectionCard_data: {
            type: Object,
            default() {
                return {}
            }
        },
        coll_data: {
            type: Object,
            default() {
                return {}
            }
        }
    },
    data() {
        return {
            isCardActsInfo: false,
            sale: false
        }
    },
    computed: {
        ...mapGetters([
            'USER',
            'BOOSTERS'
        ])
    },
    methods: {
        ...mapMutations([
            'user_money'
        ]),
        ...mapActions([
            'update',
            'getProfile'
        ]),
        openCardActsInfo() {
            this.isCardActsInfo = true
        },
        currentCollInUser() { // объект текущей коллекции в коллекциях юзера
            return store.getters.USER.colls.find(colls => colls.coll === this.coll_data.coll)
        },

        // ПРОДАТЬ КАРТОЧКУ
        saleCard() {
            // Получить продаваемую карточку в коллекции юзера
            let cardInUserCards = this.currentCollInUser().cards.find(cards => cards.num === this.collectionCard_data.num)

            if (cardInUserCards.count === 1) { // Если последний экземпляр карты
                let cardIndex = this.currentCollInUser().cards.indexOf( // Получить индекс этой карты в картах коллекции
                    this.currentCollInUser().cards.find( cards => cards.num === this.collectionCard_data.num )
                )
                this.currentCollInUser().cards.splice( cardIndex, 1 ) // Удалить эту карту
            } else if (cardInUserCards.count > 1) { // Если экземпляров карты больше 2х
                cardInUserCards.count--
            }            

            if (this.currentCollInUser().cards.length === 0) {
                let collIndex = store.getters.USER.colls.indexOf( // Получить индекс коллекции
                    store.getters.USER.colls.find( colls => colls.id === this.coll_data.id )
                )
                store.getters.USER.colls.splice( collIndex, 1 ) // Удалить коллекцию
            }            
            this.$store.commit('user_money', store.getters.USER.money + this.collectionCard_data.price)
            this.update(store.getters.USER)
            this.sale = !this.sale
        }
    }
}
</script>

<style>
.mini-icon {
    width: 30px;
    margin: 0 0 0 10px;
}
.count_over {
    right: 0;
    bottom: 0;
    width: 40px;
    height: 40px;
    padding: 5px;
    display: flex;
    color: black;
    font-size: 24px;
    font-weight: 500;
    background: white;
    border-radius: 50%;
    position: absolute;
    align-items: center;    
    justify-content: center;
    box-shadow: 0 0 10px black;
}
.sale-btn {
    width: 30px;
    margin: 20px;
    cursor: pointer;
}
.sale div {
    display: flex;
    font-size: 24px;
    align-items: center;
    justify-content: center;
}
.acts-info, .sale {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: space-around;
}
.bo-collection-card {
    display: flex;
    margin: 20px 0;
    position: relative;
}
.coll-card {
    cursor: pointer;
    max-width: 200px;
    border-radius: 5px;
}
.card__acts-info {
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    padding: 10px;
    font-size: 24px;
    border-radius: 5px;
    position: absolute;
    background: rgb(31 32 35 / 0.8);
}
.card_cross {
    opacity: .8;
    width: 20px;
    cursor: pointer;
}
.card_act {
    max-width: 50px;
    cursor: pointer;
}
.card_info {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.price, .num {
    display: flex;
    align-items: center;
    justify-content: center;
}
.price img {
    width: 25px;
    margin-left: 10px;
}
.num img {
    width: 20px;
    margin-right: 10px;
}
.acts-info_container {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
}
</style>