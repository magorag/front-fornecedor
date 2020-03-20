<template>
<div>
    <nav>
        <div class="navbar">
            <router-link to="/" v-if="currentRouteName !== 'login' && admin === 0"><img src="@/assets/logo-dinamica.svg" alt=""></router-link>
            <router-link to="/buscaadm" v-if="currentRouteName !== 'login' && admin === 1"><img src="@/assets/logo-dinamica.svg" alt=""></router-link>
            <router-link to="/" v-else-if="currentRouteName === 'login'" class="logoHome"><img src="@/assets/logo-dinamica.svg" alt=""></router-link>


            <div class="navbar__cadastro" v-if="currentRouteName === 'busca' && admin === 0">
                <router-link to="/cadastro"><img src="@/assets/cadastro.svg" alt="" title="Cadastrar fornecedor"></router-link>
                <router-link to="/busca?gerar=1"><img src="@/assets/hash.svg" alt="" title="Gerar link externo"></router-link>
                <router-link to="/sair"><img src="@/assets/icon-exit.svg" alt="" title="Sair"></router-link>
            </div>

            <div class="navbar__cadastro" v-if="(admin === 1 && currentRouteName !== 'login') && this.loading === false">
                <router-link to="/usuarios"><img src="../assets/icon-asset1.svg" alt="" title="Usuários Cadastrados"></router-link>
                <router-link to="/registrar"><img src="../assets/icon-asset2.svg" alt="" title="Novo Usuário"></router-link>
                <router-link to="/cadastro"><img src="@/assets/cadastro.svg" alt="" title="Cadastrar fornecedor"></router-link>
                <router-link v-if="currentRouteName === 'buscaadm'" to="/buscaadm?gerou=0"><img src="@/assets/hash.svg" alt="" title="Gerar link externo"></router-link>
                <router-link v-if="currentRouteName !== 'buscaadm'" to="/buscaadm"><img src="@/assets/busca.svg" alt=""></router-link>
                <router-link to="/sair"><img src="@/assets/icon-exit.svg" alt="" title="Sair"></router-link>
            </div>
            <div class="navbar__busca" v-if="currentRouteName === 'cadastro' && admin === 0">
                <router-link to="/busca"><img src="@/assets/busca.svg" alt=""></router-link>
            </div>
        </div>
    </nav>
</div>
</template>

<script>
    import {PingPong} from "vue-loading-spinner";
    import fornecedores from "../services/fornecedores";
    import users from '../services/users';

    export default {
    name: 'NavBar',
    components: {
        PingPong
    },
    created: async function () {
        if (!this.$session.has("session-id")) {
            await this.$router.push("/");
        } else {
            fornecedores.listar().then(resposta => {
                this.fornecedores = resposta.data;
                users.userLogged(this.$session.get("token")).then(resposta2 => {
                    this.admin = resposta2.data.admin;
                    this.user = resposta2.data.name;
                    this.loading = false;
                });
            });
        }
    },
    data() {
        return {
            loading: true,
            admin: 0,
        }
    },

    computed: {
        currentRouteName() {
            return this.$route.name;
    }
  }
}
</script>

<style lang="scss">
    @import '../scss/variables.scss';
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
            margin: 0 auto;
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
