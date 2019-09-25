<template>
<div>

</div>
  
</template>

<style lang="scss">

</style>

<script>
export default {
  name: 'Sair',
  created: function() {
      this.$session.destroy()
      this.$router.push('/')
  }
}
</script>
