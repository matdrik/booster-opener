<template>
  <div class="bo-coll">
        <span class="home_coll_name">{{ coll_data.name }}</span>
        <div class="boosters">
            <bo-booster 
                :key="booster.id"
                :coll_data="coll_data"
                :booster_data="booster"
                v-for="booster in coll_data.boosters"
            />
        </div>
        <div class="line"></div>
  </div>
</template>

<script>
import boBooster from '../components/bo-booster'

export default {
    name: 'bo-coll',
    components: {
        boBooster
    },
    props: {
        coll_data: {
            type: Object,
            default() {
                return {}
            }
        }
    }
}
</script>

<style>
.bo-coll {
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;    
}
.home_coll_name {
    opacity: .8;
    font-size: 18px;    
    font-weight: 300;
    text-align: center;
    letter-spacing: 1px;    
}
.boosters {
    width: 100%;
    display: flex;    
    flex-wrap: wrap;
    margin-top: 20px;
    align-items: center;
    justify-content: space-around;
}
</style>