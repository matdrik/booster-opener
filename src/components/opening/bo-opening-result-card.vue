<template>
    <img
        draggable="false"
        class="result_card"
        :src="require( '../../assets/images/cards/' + COLL_DATA.coll + '/' + resultCard_data.card + '.jpg')"
    >
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    name: 'bo-opening-result-card',
    props: {
        resultCard_data: {
            type: Object,
            default() {
                return {}
            }
        }
    },
    computed: {
        ...mapGetters([
            'COLL_DATA',
            'BOOSTER_DATA'
        ])
    }
}
</script>

<style>
.result_card {
    margin: 20px;
    max-width: 200px;
    border-radius: 6px;
}
</style>