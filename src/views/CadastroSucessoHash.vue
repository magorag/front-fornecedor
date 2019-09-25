<template>
  <div class="container">
      <div class="container__stars">
          <img src="@/assets/stars.svg" alt="">
          <h1>Cadastro efetuado com sucesso!</h1>
      </div>
  </div>
</template>

<script>
  export default {
  }
</script>


<style lang="scss" scoped>
@import '~@/scss/variables.scss';
    .container {
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        position: absolute;
        top: 18rem;
        width: 60rem;
        z-index: 5;

        &__stars {
            display: flex;
            flex-direction: column;
            justify-content: center;

            h1 {
                color: white;
                font-size: 3rem;
                margin-top: 2.18rem;
                @media(max-width: $max-xs) {
                    font-size: 1.8rem;
                }
            }
            img {
                @media(max-width: $max-xs) {
                    width: 50%;
                    margin: 0 auto;
                }
            }
        }


    }
</style>
