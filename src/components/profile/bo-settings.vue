<template>
  <div class="bo-settings">
    Настройки приложения
    <div to="/logout" @click="logoutUser">Выйти из аккаунта</div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
    name: 'bo-settings',
    methods: {
      ...mapActions([
        "logout"
      ]),
      logoutUser() {
        this.logout()
      }
    }
}
</script>

<style></style>