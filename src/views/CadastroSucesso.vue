<template>
  <div class="container">
      <div class="container__stars">
          <img src="@/assets/stars.svg" alt="">
          <h1>Cadastro efetuado com sucesso!</h1>
      </div>

      <div class="container__buttons">
          <router-link to="/cadastro"><button id="novo">Novo cadastro</button></router-link>
          <router-link to="/busca"><button id="voltar">Voltar para busca</button></router-link>
      </div>
  </div>
</template>

<script>
  export default {
      beforeCreate: function () {
        if (!this.$session.exists()) {
            this.$router.push('/')
        }
    },
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

        @media(max-width: $max-xs) {
            width: 60%;
        }

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

        &__buttons {
            margin-top: 20.5rem;
            display: flex;
            @media(max-width: $max-xs) {
                flex-direction: column;
            }

            a {
                text-decoration: none;
            }


            #novo, #voltar {
                border-radius: 10rem;
                color: white;
                display: flex;
                justify-content: center;
                align-items: center;
                padding: 2rem 0;
                width: 25.5rem;
                font-size: 2rem;
                cursor: pointer;
                @media(max-width: $max-xs) {
                    width: 20rem;
                    padding: 3rem 0;
                }
            }
        
            #novo {
                background: #FF9630;
                border: 1px solid #FF9630;
            }

            #voltar {
                background: #007D95;
                border: 1px solid #007D95;
                margin-left: 2.4rem;
                @media(max-width: $max-xs) {
                    margin-left: 0;
                    margin-top: 2rem;
                }
            }
            
        }


    }
</style>
