<template>
  <div class="bo-coll" v-if="coll_data.cards.length !== 0">
        <div class="coll_name" @click="isHidden = !isHidden">
            <span>{{ coll_data.name }}</span>
            <img
                draggable="false"
                style="transition:.3s;"
                :class="{ up: !isHidden, down: isHidden}"
                src="../../assets/images/icons/arrowToRight.png"
            >
        </div>
        <transition name="fade" mode="out-in">
            <div class="progress_sort header">
                <span class="progress">
                    {{ coll_data.cards.length }} из {{ coll_data.cardsInColl }}
                </span>
                <div class="sort" v-if="!isHidden">
                    <select v-model="sortField" @change="sort(sortField, sortType)">
                        <option value="id" selected>по времени</option>
                        <option value="price">по цене</option>
                        <option value="num">по номеру</option>
                        <option value="count">по количеству</option>
                    </select>
                    <select v-model="sortType" @change="sort(sortField, sortType)">
                        <option value="asc" selected>по возрастанию</option>
                        <option value="desc">по убыванию</option>
                    </select>
                </div>
            </div>
        </transition>

        <transition-group tag="div" class="coll_cards" name="fade" v-if="!isHidden">
            <bo-collection-card
                :coll_data="coll_data"
                :key="collectionCard.id"
                :collectionCard_data="collectionCard"
                v-for="collectionCard in this.coll_data.cards"                
            />
        </transition-group>
        <div class="line"></div>
  </div>
</template>

<script>
import boCollectionCard from './bo-collection-card'

export default {
    name: 'bo-coll',
    components: {
        boCollectionCard
    },
    data() {
        return {
            sortField: 'id',
            sortType: 'desc',
            isHidden: true
        }
    },
    props: {
        coll_data: {
            type: Object,
            default() {
                return {}
            }
        }
    },
    computed: {},
    methods: {
        sort(field, type) {
            if (type === 'desc') {
                this.coll_data.cards.sort((a, b) => a[field]> b[field] ? 1 : -1).reverse()
            } else if (type === 'asc') {
                this.coll_data.cards.sort((a, b) => a[field]> b[field] ? 1 : -1)
            }            
        }
    }
}
</script>

<style>
.coll_cards {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-around;
}
.coll_name img {
    width: 20px;
    margin-left: 10px;
}
.coll_name {
    width: 100%;
    display: flex;
    cursor: pointer;
    font-size: 24px;
    font-weight: 300;
    align-items: center;
    justify-content: space-between;
}
.filters {
    width: 100%;
    display: flex;   
    margin-top: 20px;
    background: #000;
    align-items: center;
    justify-content: center;
}
.progress {
    opacity: .6;
    font-size: 18px;
}
.sort {
    display: flex;
    align-items: center;
    justify-content: center;
}
.sort > select {
    padding: 5px;
    border: none;    
    height: 30px;
    color: white;
    font-size: 14px;
    max-width: 400px;
    font-weight: 300;
    margin-left: 10px;
    background: #141414;
    border-radius: 5px;
    font-family: 'Roboto', sans-serif;
}
.up {
    width: 20px;
    transform: rotate(-90deg);
}
.down {
    width: 20px;
    transform: rotate(90deg);
}
</style>