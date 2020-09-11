<template>
  <div class="profile">
    <div class="header">
      <img src="../../assets/images/icons/logo.svg" draggable="false">
      <img draggable="false" @click="toHome()" class="icon" src="../../assets/images/icons/back.png">
    </div>
    <div class="big_heading">Здравствуй, {{ USER.username }}</div>
    <div class="long_btns">
      <div class="long_btn" @click="isColls = !isColls" :class="{ long_btn_active: isColls }">Коллекции</div>
      <div class="long_btn" @click="isColls = !isColls" :class="{ long_btn_active: !isColls }">Настройки</div>
    </div>
    <transition name="fade" mode="out-in">
      <bo-collections v-if="isColls" />
      <bo-settings v-if="!isColls" />
    </transition>
  </div>
</template>

<script>
import boSettings from '../profile/bo-settings'
import boCollections from '../profile/bo-collections'
import { mapGetters, mapActions, mapMutations } from "vuex";

export default {
  name: 'profile',
  components: {
    boCollections,
    boSettings
  },
  data() {
    return {
      isColls: true
    }
  },
  computed: {
    ...mapGetters([
      "USER"
    ])
  },
  methods: {
    ...mapActions([
      "getProfile"
    ]),
    ...mapMutations([
      'SET_BOOSTER_INFO',
      'SET_OPENING_STATE',
      'SET_CURRENT_SCREEN'
    ]),
    toHome() {      
      this.$store.commit('SET_BOOSTER_DATA', ' ')
      this.$store.commit('SET_BOOSTER_INFO', false)
      this.$store.commit('SET_OPENING_STATE', false)
      this.$store.commit('SET_CURRENT_SCREEN', 'home')
    }
  },
  mounted() {
    this.getProfile()
  }
};
</script>

<style>
.profile {
  width: 100%;
  height: 100%;
  display: flex;
  overflow: hidden;
  align-items: center;
  flex-direction: column;  
  justify-content: flex-start;
}
</style>