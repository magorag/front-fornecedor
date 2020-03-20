<template>
    <div class="form-cadastro">
        <form method="post">
            <br><br><br>
            <h1>Registrar novo usúario</h1>
            <br><br>
            <div class="form__group">
                <div class="error" v-if="$v.registro.name.$error">
                    * Esse campo é obrigatório
                </div>
                <input name="name"
                       type="text"
                       id="name"
                       v-model="registro.name"
                       :class="{invalid: $v.registro.name.$error}"/>
                <label for="name">
                    Nome completo:
                </label>
            </div>
            <br>
            <div class="form__group">
                <div class="error" v-if="$v.registro.email.$error">
                    * Esse campo é obrigatório
                </div>
                <input name="email"
                       type="text"
                       id="email"
                       v-model="registro.email"
                       :class="{invalid: $v.registro.email.$error}"/>
                <label for="email">
                    Email:
                </label>
            </div>
            <div class="form__group">
                <div class="error" v-if="$v.registro.password.$error">
                    * Esse campo é obrigatório e deve conter 8 caracteres
                </div>
                <input name="password"
                       type="password"
                       id="password"
                       v-model="registro.password"
                       :class="{invalid: $v.registro.password.$error}"/>
                <label for="password">
                    Senha:
                </label>
            </div>
            <br>
            <div class="form__group">
                <div class="error" v-if="$v.registro.password_confirmation.$error">
                    * Esse campo é obrigatório
                </div>
                <input name="password_confirmation"
                       type="password"
                       id="password_confirmation"
                       v-model="registro.password_confirmation"
                       :class="{invalid: $v.registro.password_confirmation.$error}"/>
                <label for="password_confirmation">
                    Confirmar senha:
                </label>
            </div>

            <button @click.prevent="verificar" id="btnCadastro">
                Pronto! Cadastrar
            </button>

        </form>
    </div>
</template>

<script>
    import VueTagsInput from '@johmun/vue-tags-input';
    import {mask} from 'vue-the-mask';
    import registrar from "../services/registrar";
    import {LetterCube} from 'vue-loading-spinner';
    import {required, minLength, between, email} from 'vuelidate/lib/validators'

    export default {
        name: "registrar",
        components: {
            VueTagsInput,
            LetterCube
        },
        directives: {mask},
        data() {
            return {
                registro: {
                    name: '',
                    email: '',
                    password: '',
                    password_confirmation: ''
                },
                timeout: null,
                loading: false,
                hash: null,
            }
        },

        methods: {
            registrar() {
                let btnCadastrar = document.getElementById('btnCadastro')
                btnCadastrar.innerHTML = 'Cadastrando...'
                btnCadastrar.disabled = true

                let registro = {
                    name: this.registro.name,
                    email: this.registro.email,
                    password: this.registro.password,
                    password_confirmation: this.registro.password_confirmation
                }
                let resposta = registrar.register(registro).then(resposta => {
                    if (resposta.statusText === "Created") {
                        this.$router.push('/cadastro-sucesso')
                    }
                })
            },
            verificar() {
                this.$v.registro.$touch();
                if (this.$v.registro.$error) return
                this.registrar()
            }
        },

        validations: {
            registro: {
                name: {required},
                email: {required},
                password: {required, minLength: minLength(8)},
                password_confirmation: {required, minLength: minLength(8)},
            },
        },
    }
</script>


<style lang="scss" scoped>
    @import '../scss/variables.scss';

    .form-cadastro {
        position: relative;
        top: -35rem;
        width: 80rem;
        border-radius: .4rem;
        border-top: 1.1rem solid #6C00FF;
        z-index: 5;
        background-color: white;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        overflow-y: hidden;
        box-shadow: -0rem 0rem 5rem rgba(0, 0, 0, .1);

        @media(max-width: $max-xs) {
            top: -27rem;
            width: 90%;
        }

        &--hide {
            border: 0;
            background: transparent;

            .form-cadastro {
                &__help {
                    display: none;
                }
            }
        }

        &__help {
            display: flex;
            justify-content: flex-end;
            height: 4rem;
            width: 100%;
            margin-top: 2.6rem;

            img {
                height: inherit;
                width: 4rem;
                margin-right: 3rem;
            }
        }

        form {
            width: 77.3%;
            @media(max-width: $max-xs) {
                width: 90%;
            }

            .form__group {
                display: flex;
                flex-direction: column-reverse;
                margin-bottom: 3rem;

                    &--show {
                        display: block;
                    }
                }
            }

            h1 {
                color: #253044;
                font-size: 3rem;
                line-height: 3.6rem;
                font-weight: 500;
                margin-top: 2.6rem;
                margin-bottom: 3.9rem;
                @media(max-width: $max-xs) {
                    font-size: 2.5rem;
                    text-align: center;
                }
            }

            label {
                font-size: 1.5rem;
                color: #35364D;
                margin-bottom: .5rem;
            }

            input {
                font-size: 1.5rem;
                border: 1px solid #E3E3EB;
                border-radius: .5rem;
                height: 2.8rem;
                padding: .5rem;
            }

            h3 {
                font-size: 1.5rem;
                font-weight: bold;
                color: #35364D;
                margin-bottom: 1.4rem;
            }

            button {
                border-radius: 10rem;
                background-color: #be7ddd;
                color: white;
                font-size: 2rem;
                display: flex;
                justify-content: center;
                padding: 1.7rem .5rem;
                width: 25.5rem;
                margin-top: 6.4rem;
                margin-bottom: 6.4rem;
                border: 1px solid #be7ddd;
                cursor: pointer;
                @media(max-width: $max-xs) {
                    margin: 0 auto;
                    margin-bottom: 7.4rem;
                }
            }

        }

    form::-webkit-scrollbar {
        width: 0px;
    }

    .ti-new-tag-input::placeholder {
        opacity: 0;
    }

    .invalid {
        border: 1px solid #FF514D !important;
    }

    .error {
        font-weight: 100;
        font-size: 1.2rem;
        color: #FF514D;
        margin-top: .5rem;
        margin-bottom: .5rem;
    }

    .carregando {
        width: 77.3%;

        h1 {
            color: #253044;
            font-size: 3rem;
            line-height: 3.6rem;
            font-weight: 500;
            margin-top: 2.6rem;
            margin-bottom: 3.9rem;
            @media(max-width: $max-xs) {
                font-size: 2.5rem;
                text-align: center;
            }
        }

        h3 {
            text-align: center;
            font-weight: 100;
            margin-top: 1rem;
            font-size: 1.5rem;
            color: #35364D;
            margin-bottom: 4.5rem;
            @media(max-width: $max-xs) {
                margin-top: 2rem;
            }
        }

        .spinner {
            width: 100% !important;
            height: 10rem !important;
            @media(max-width: $max-xs) {
                height: 13rem !important;
            }

            .spinner-inner {
                transform: scale(.5) !important;
            }
        }
    }
</style>
