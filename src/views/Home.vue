<template>
    <div class="container-home">
        <div class="container-home__content-text">
            <h1>Portal de Cadastro e Busca de Fornecedores</h1>
            <h2>Fornecedor, entre com login e senha fornecido pela Dinâmica.</h2>

            <form method="post">
                <div class="error" id="login" v-if="this.incorreto">Usuário ou senha incorretos</div>
                <label for="login">Login</label>
                <input id="login" v-model="email" type="text" :class="{invalid: $v.email.$error}"/>
                <div class="error" v-if="$v.email.$error">Insira um e-mail válido</div>
                <label for="senha">Senha</label>
                <input aria-required="true" id="senha"
                       type="password" v-model="password"
                       :class="{invalid: $v.password.$error}"/>
                <div class="error" v-if="$v.password.$error">Insira uma senha</div>
                <button v-on:click.prevent="verificar" v-if="this.loading === false">Entrar</button>
                <button v-if="this.loading"><circle10></circle10></button>
            </form>
        </div>
        <div class="container-home__content-image">
            <img src="@/assets/dinamica-home.svg">
        </div>
    </div>
</template>

<script>
    import { required, minLength, between, email } from 'vuelidate/lib/validators'
    import {Circle10} from 'vue-loading-spinner'

    export default {
        name: 'login',
        components: {
            Circle10
        },
        data: () => ({
            email: '',
            password: '',
            admin: 0,
            incorreto: false,
            token: '',
            loading: false,
        }),
        methods: {
            async login() {
                try {
                    this.loading = true;
                    console.log(this.loading)
                    this.incorreto = false;
                    const {email, password} = this
                    await this.$store.dispatch('auth/login', {email, password})
                    this.$session.start()
                    this.$session.set('token', localStorage.getItem('token'))
                    this.loading = false;
                    if (this.$store.state.auth.credencial.admin) {
                        this.admin = this.$store.state.auth.credencial.admin
                       await this.$router.push({name: 'buscaadm'})
                    } else {
                       await this.$router.push({name: 'busca'})
                    }
                } catch (e) {
                    this.incorreto = true
                    this.loading = false;
                    console.log(e)
                }
            },
            verificar() {
                this.$v.email.$touch();
                this.$v.password.$touch();

                if(this.$v.email.$error && this.$v.password.$error) return
                this.login()
            },
        },
        validations: {
                email: { required, email },
                password: { required }
        },

        computed: {
            user: {
                get() { return this.$store.state.adm; },
                set(value) { this.$store.commit('updateAdm', value); }
            }
        }
    }
</script>

<style lang="scss">
    @import '../scss/variables.scss';

    .container-home {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 20.4rem;
        margin-bottom: 27.1rem;
        @media(max-width: $max-xs) {
            margin-top: 5rem;
            margin-bottom: 4rem;
        }

        &__content-text {
            height: inherit;
            width: 40%;
            @media(max-width: $max-xs) {
                width: 90%;
            }
            @media(max-width: $max-sm) and (min-width: $min-sm) {
                width: 40%;
            }


            h1 {
                color: #253044;
                font-size: 5rem;
                line-height: 6rem;
                @media(max-width: $max-xs) {
                    font-size: 3rem;
                    text-align: center
                }

                @media(max-width: $max-sm) and (min-width: $min-sm) {
                    font-size: 4.5rem;
                }
            }

            h2 {
                color: #253044;
                font-size: 2.6rem;
                line-height: 3.1rem;
                margin-top: 1.1rem;
                @media(max-width: $max-xs) {
                    font-size: 2rem;
                    text-align: center
                }
            }

            form {
                margin-top: 3.6rem;
                display: flex;
                flex-direction: column;
                @media(max-width: $max-xs) {
                    align-items: center;
                }

                label {
                    display: block;
                    color: #253044;
                    font-size: 1.7rem;
                }

                input {
                    margin-top: .8rem;
                    height: 5rem;
                    width: 39.3rem;
                    border: 1px solid #E3E3EB;
                    border-radius: 1rem;
                    margin-bottom: 2.7rem;
                    padding: .5rem;

                    @media(max-width: $max-xs) {
                        width: 90%;
                    }
                }

                .error {
                    display: block;
                    font-size: 1.7rem;
                    margin-left: .5rem;
                    color: red;
                    margin-bottom: 1.7rem;
                }

                .invalid {
                    border: 1px solid red;
                    margin-bottom: 1rem;
                }

                button {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    background-color: #FF9630;
                    border: 1px solid #FF9630;
                    width: 25.5rem;
                    height: 5.5rem;
                    @media(max-width: $max-sm) {
                        height: 6rem;
                    }
                    font-size: 2rem;
                    font-weight: bold;
                    color: white;
                    border-radius: 3rem;
                    cursor: pointer;
                }
            }
        }

        &__content-image {
            img {
                width: 64.4rem;
                @media(max-width: $max-xs) {
                    display: none;
                }

                @media(max-width: $max-sm) {
                    width: 54.4rem;
                }
            }
        }
    }

    .spinner-inner {
        transform: scale(0.25) !important;
        @media(max-width: $max-xs) {
            transform: scale(0.18) !important;
        }

        .loader-xbox {
            border-top: 3px solid #FFF !important;
        }

        .loader-xbox::before {
            border-top: 3px solid #FFF !important;
        }

        .loader-xbox::after {
            border-top: 3px solid #FFF !important;
        }
    }
</style>

