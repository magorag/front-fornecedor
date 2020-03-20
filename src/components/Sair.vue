<template>
<div>

</div>
  
</template>

<style lang="scss">

</style>

<script>
import store from "../store";

export default {
  name: 'Sair',
    beforeEnter: (to, from, next) => {
        store.dispatch('auth/logout')
        next({ name: 'login' })
    },
  created: function() {
      this.$session.destroy()
      this.$router.push('/')
  }
}
</script>
