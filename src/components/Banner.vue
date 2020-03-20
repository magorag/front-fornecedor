<template>
<div>

  <div  v-if="currentRouteName == 'cadastro'" class="banner" style="background-color: rgba(255, 137, 44, .7);">
    <div class="banner__image"></div>
  </div>

  <div  v-else-if="currentRouteParams" class="banner" style="background-color: rgba(255, 137, 44, .7);">
    <div class="banner__image"></div>
  </div>

  <div  v-else-if="currentRouteName == 'cadastro-sucesso'" class="banner" style="background-color: rgba(165, 73, 206, .7);">
    <div class="banner__image"></div>
  </div>

  <div  v-else-if="currentRouteName == 'usuarios'" class="banner">
  </div>

  <div  v-else-if="currentRouteName == 'registrar'" class="banner" style="background-color: rgba(165, 73, 206, .7);">
    <div class="banner__image"></div>
  </div>

  <div  v-else-if="currentRouteName == 'busca' " class="banner" style="background-color: rgba(38, 164, 251, .7);">
    <div class="banner__image"></div>
  </div>

  <div  v-else-if="currentRouteName == 'login' ">
  </div>

  <div  v-else-if="currentRouteName == 'not-found' ">
  </div>

  <div  v-else-if="currentRouteName == '404' ">
  </div>

  <div  v-else class="banner" style="background-color: rgba(165, 73, 206, .7);">
    <div class="banner__image"></div>
  </div>

</div>

</template>

<style lang="scss">
@import '../scss/variables.scss';
    .banner {
      position: relative;
      width: 100%;
      height: 38.1rem;
      min-width: 100%;

      @media(max-width: $max-xs) {
        height: 32rem;
      }
      &__image {
        background-image: url("../assets/banner.png");
        height: inherit;
        width: inherit;
        background-size: cover;
        background-position-x: 8rem;
        background-position-y: -2rem;

        @media(max-width: $max-xs) {
          background-position-x: -30rem;
          background-position-y: 0rem;
        }
        position: absolute;
        top: 0;
        left: 0;
        z-index: -5;
      }
    }
</style>

<script>
export default {
  name: 'Banner',

  computed: {
    currentRouteName() {
        return this.$route.name;
    },
    currentRouteParams() {
      return this.$route.params.hash;
    }
  }
}
</script>
