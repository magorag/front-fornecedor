<template>
  <div class="container">
      <div class="container__content">
          <img src="@/assets/icon-404.svg" alt="">
          <h1>Página não encontrada! :(</h1>
      </div>
  </div>
</template>

<script>
  export default {
  }
</script>


<style lang="scss" scoped>
    .container {
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background-color: #F5F5F5;
        height: 100vh;

        &__content {
            display: flex;
            flex-direction: column;
            justify-content: center;

            img {
                width: 45rem;
            }

            h1 {
                color: #253044;
                font-size: 3rem;
                font-weight: 900;
                margin-top: 4.9rem;
                text-align: center;
            }
        }
    }
</style>
