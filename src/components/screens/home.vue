<template>
    <div class="home">
        <div class="warn" v-if="!warn">
            <span>Вы не авторизованы</span>
            <img @click="warn = !warn" src="../../assets/images/icons/crossAlt.png" draggable="false">
        </div>
        <transition name="fade" mode="out-in">
            <div v-if="!IS_OPENING" class="header">
                <img src="../../assets/images/icons/logo.svg" draggable="false">
                <img @click="toProfile()" src="../../assets/images/icons/user.png" class="icon" draggable="false">
            </div>
        </transition>
        <transition name="fade" mode="out-in">
            <div v-if="!IS_OPENING" class="header">
                <div class="money">
                    <div v-if="isLoggedIn">{{ USER.money }}</div><!-- Деньги реального юзера -->
                    <div v-else>0</div>
                    <img src="../../assets/images/icons/money.png" class="icon" draggable="false">
                </div>
                <select v-model="selectedHomeColls">
                    <option value="" disabled selected>Коллекции</option>
                    <option value="">Все коллекции</option>
                    <option
                        v-for="coll in BOOSTERS"
                        :value="coll.name"
                        :key="coll.id"
                    >{{ coll.name }}</option>
                </select>
            </div>
        </transition>

        <transition-group tag="div" class="colls" v-show="!IS_BOOSTER_INFO && !IS_OPENING" name="fade">
            <bo-coll
                :key="coll.id"
                :coll_data="coll"
                v-for="coll in homeColls"
            />
        </transition-group>

        <transition name="fade" mode="out-in">
            <bo-opening v-if="IS_OPENING" />
            <bo-booster-info v-if="IS_BOOSTER_INFO" />
        </transition>    
    </div>
</template>

<script>
import boColl from '../bo-coll'
import store from '../../vuex/store'
import boOpening from '../opening/bo-opening'
import boBoosterInfo from '../bo-booster-info'
import { mapActions, mapGetters, mapMutations } from 'vuex'

export default {
    name: 'bo-boosters',
    data() {
        return {
            warn: false,
            selectedHomeColls: ''
        }
    },
    components: {
        boOpening,
        boBoosterInfo,
        boColl
    },
    methods: {
        ...mapActions([
            'getProfile',
            'GET_BOOSTERS_FROM_API'
        ]),
        ...mapMutations([
            'SET_BOOSTER_DATA',
            'SET_BOOSTER_INFO',
            'SET_OPENING_STATE',
            'SET_CURRENT_SCREEN'
        ]),
        toProfile() {
            if (!store.getters.isLoggedIn) {
                this.$store.commit('SET_CURRENT_SCREEN', 'auth')
            } else {
                this.$store.commit('SET_BOOSTER_DATA', ' ')
                this.$store.commit('SET_BOOSTER_INFO', false)
                this.$store.commit('SET_OPENING_STATE', false)
                this.$store.commit('SET_CURRENT_SCREEN', 'profile')
            }
        }
    },
    computed: {
        ...mapGetters([
            "USER",
            'BOOSTERS',
            'IS_OPENING',
            'IS_OPENING',
            'isLoggedIn',
            'BOOSTER_DATA',
            'IS_BOOSTER_INFO',
        ]),
        homeColls() {
            return store.getters.BOOSTERS.filter(coll => coll.name.indexOf(this.selectedHomeColls) !== -1)
        }
    },
    mounted() {
        this.GET_BOOSTERS_FROM_API()
        this.getProfile()
        this.warn = store.getters.isLoggedIn
        
        this.$store.commit('SET_BOOSTER_DATA', ' ');
        this.$store.commit('SET_BOOSTER_INFO', false);
        this.$store.commit('SET_OPENING_STATE', false);
    }
}
</script>

<style>
.home {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
}
.warn {
    bottom: 0;
    width: 100%;
    display: flex;
    padding: 10px;
    font-size: 18px;
    position: absolute;
    align-items: center;
    justify-content: space-between;
    background: rgb(255 0 0 / 0.5);
}
.warn img {
    width: 20px;
    cursor: pointer;
}
section {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
}
.colls {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    margin-top: 20px;
    overflow: hidden;
    overflow-y: scroll;
    align-items: center;
    justify-content: space-around;
}
</style>