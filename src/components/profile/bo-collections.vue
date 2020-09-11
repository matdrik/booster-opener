<template>
  <div class="bo-collections">
    <div class="header">
      <div class="money">
          {{ USER.money }}
          <img src="../../assets/images/icons/money.png" class="icon">
      </div>
      <select v-model="selectedUserColls">
        <option value="" disabled selected>Коллекции</option>
        <option value="">Все коллекции</option>
        <option
          v-for="coll in USER.colls"
          :value="coll.name"
          :key="coll.id"
        >{{ coll.name }}</option>
      </select>
    </div>
    <div style="font-size:24px;text-align:center;" v-if="USER.colls.length === 0">
      У вас пока что нет ни одной карты из коллекции :(<br>
      Открывайте бустеры, продавайте копии карт и снова открывайте.<br>
      Соберите полную коллекцию!
    </div>
    <transition-group tag="div" class="collections_container" name="fade">
      <bo-collections-coll
        :key="collectionColl.id"
        :coll_data="collectionColl"
        v-for="collectionColl in userCollsByName"
      />
    </transition-group>
  </div>
</template>

<script>
import store from '../../vuex/store'
import { mapGetters, mapActions } from 'vuex'
import boCollectionsColl from './bo-collections-coll'

export default {
  name: 'bo-collections',
  components: {
    boCollectionsColl
  },
  data() {
    return {
      selectedUserColls: ''
    }
  },
  computed: {
    ...mapGetters([
      "USER"
    ]),
    userCollsByName() {
      return store.getters.USER.colls.filter(coll => coll.name.indexOf(this.selectedUserColls) !== -1)
    }
  },
  methods: {
    ...mapActions([
      "getProfile"
    ])
  },
  created() {}
}
</script>

<style>
.collections_container {
  width: 100%;
  height: 100%;
  display: flex;
  overflow: hidden;
  margin-top: 20px;
  overflow-y: scroll;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
}
.collections_container > div {
  width: 100%;
}
.bo-collections {
  width: 100%;
  height: 100%;
  display: flex;
  overflow: hidden;
  align-items: center;
  flex-direction: column;
  justify-content: flex-start;
}
</style>