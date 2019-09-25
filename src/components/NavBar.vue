<template>
<div>
    <nav>
        <div class="navbar">
            <router-link to="/" v-if="currentRouteName != 'home'"><img src="@/assets/logo-dinamica.svg" alt=""></router-link>
            <router-link to="/" v-else-if="currentRouteName == 'home'" class="logoHome"><img src="@/assets/logo-dinamica.svg" alt=""></router-link>

            <div class="navbar__contact" v-if="currentRouteName == 'home'">
                Dúvidas? Fale conosco: 11  <strong>3811-5565</strong>  ou 11 <strong>3522-9997</strong> 
            </div>

            <div class="navbar__cadastro" v-if="currentRouteName == 'busca'">
                <router-link to="/cadastro"><img src="@/assets/cadastro.svg" alt="" title="Cadastrar fornecedor"></router-link>
                <router-link to="/busca?gerar=1"><img src="@/assets/hash.svg" alt="" title="Gerar link externo"></router-link>
                <router-link to="/sair"><img src="@/assets/icon-exit.svg" alt="" title="Sair"></router-link>
            </div>

            <div class="navbar__busca" v-if="currentRouteName == 'cadastro'">
                <router-link to="/busca"><img src="@/assets/busca.svg" alt=""></router-link>
            </div>
        </div>
    </nav>
</div>
</template>

<style lang="scss">
@import '~@/scss/variables.scss';
    nav {
        width: 100%;
        height: 10rem;
        max-width: 100%;
    }
    .navbar {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: inherit;
        width: inherit;
        max-width: inherit;

        img {
            height: 4.8rem;
            margin-left: 3.8rem;
            @media(max-width: $max-xs) {
                margin-left: 2.5rem;
            }
        }

        .logoHome {
            @media(max-width: $max-xs) {
                width: 100%;
                display: flex;
                justify-content: center;
                img {
                    margin-left: 0rem;
                }
            }
        }

        &__contact {
            font-size: 1.7rem;
            margin-right: 4.4rem;   
            color: #253044;
            @media(max-width: $max-xs) {
                display: none;
            }
            
            strong {
                font-weight: bold;
                font-size: 2.5rem;
            }
        }

        &__cadastro, &__busca{
            margin-right: 2rem;
        }
    }
</style>

<script>
export default {
  name: 'NavBar',
  computed: {
    currentRouteName() {
        return this.$route.name;
    }
  }
}
</script>
