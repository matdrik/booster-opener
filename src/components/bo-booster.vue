<template>
    <img
        draggable="false"
        class="booster_img"
        @click="clickOnBooster"
        :class="{ booster_img__horizontal: isHorizontal }"
        :src=" require('../assets/images/boosters/' + coll_data.coll + booster_data.id + '.png') "
    >
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'

export default {
    name: 'bo-booster',
    props: {
        booster_data: {
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
            isHorizontal: this.booster_data.isHorizontal
        }
    },
    methods: {
        ...mapMutations([
            'SET_MONEY',
            'SET_COLL_DATA',
            'SET_BOOSTER_DATA',
            'SET_BOOSTER_INFO',            
            'SET_CLICK_ON_BOOSTER',
        ]),
        clickOnBooster() {
            this.$store.commit('SET_BOOSTER_INFO', true)
            this.$store.commit('SET_CLICK_ON_BOOSTER', true)
            this.$store.commit('SET_COLL_DATA', this.coll_data)
            this.$store.commit('SET_BOOSTER_DATA', this.booster_data)
        }
    },
    computed: {
        ...mapGetters([
            'MONEY',
            'IS_BOOSTER_INFO'
        ])
    }
}
</script>

<style>
.booster_img {
	height: 350px;
    cursor: pointer;
    margin: 10px 20px 0;
}
.booster_img__horizontal {
    width: 100%;
    height: auto;
    cursor: pointer;
    max-width: 350px;
    margin: 10px 20px;
}
</style>