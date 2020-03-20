<template>
    <div class="form-cadastro">
        <div class="carregando" v-if="this.loading" style="margin-top: 10rem">
            <Circle9></Circle9>
            <h3>Validando sua chave de acesso adm!</h3>
        </div>
        <form method="post" v-if="!this.loading">
            <br><br><br>
            <h1>Editar usúario</h1>
            <br><br>
            <div class="form__group">
                <div class="error" v-if="$v.usuario.name.$error">
                    * Esse campo é obrigatório
                </div>
                <input name="name"
                       type="text"
                       id="name"
                       v-model="usuario.name"
                       :class="{invalid: $v.usuario.name.$error}"/>
                <label for="name">
                    Nome completo:
                </label>
            </div>
            <br>
            <div class="form__group">
                <div class="error" v-if="$v.usuario.email.$error">
                    * Esse campo é obrigatório
                </div>
                <input name="email"
                       type="text"
                       id="email"
                       v-model="usuario.email"
                       :class="{invalid: $v.usuario.email.$error}"/>
                <label for="email">
                    Email:
                </label>
            </div>
            <div class="form__group">
                <div class="error" v-if="$v.usuario.password.$error">
                    * Esse campo é obrigatório e deve conter 8 caracteres
                </div>
                <input name="password"
                       type="password"
                       id="password"
                       v-model="usuario.password"
                       placeholder="********"
                       :class="{invalid: $v.usuario.password.$error}"/>
                <label for="password">
                    Senha:
                </label>
            </div>
            <br>
            <div class="form__group">
                <div class="error" v-if="$v.usuario.password_confirmation.$error">
                    * Esse campo é obrigatório
                </div>
                <input name="password_confirmation"
                       type="password"
                       id="password_confirmation"
                       v-model="usuario.password_confirmation"
                       placeholder="********"
                       :class="{invalid: $v.usuario.password_confirmation.$error}"/>
                <label for="password_confirmation">
                    Confirmar senha:
                </label>
            </div>

            <button @click.prevent="verificar" id="btnCadastro">
                Pronto! Editar
            </button>

        </form>
    </div>
</template>

<script>
    import VueTagsInput from '@johmun/vue-tags-input';
    import {mask} from 'vue-the-mask';
    import usuarios from "../services/usuarios";
    import users from "../services/users";
    import {Circle9} from 'vue-loading-spinner';
    import {required, minLength, between, email} from 'vuelidate/lib/validators'

    export default {
        name: "registrar",
        components: {
            VueTagsInput,
            Circle9
        },
        directives: {mask},
        created: function () {
            this.loading = true;
            if (this.$route.params.id) {
                usuarios.listarUsuario(this.$route.params.id).then((resposta) => {
                    this.usuario = resposta.data.data[0]
                    this.loading = false;
                })
            }
        },
        data() {
            return {
                registroUpdate: {
                    name: '',
                    email: '',
                    password: '',
                    password_confirmation: ''
                },
                timeout: null,
                loading: false,
                hash: null,
                usuario: [],
            }
        },

        methods: {
            editar () {
                this.registroUpdate = {
                    name: this.usuario.name,
                    email: this.usuario.email,
                    password: this.usuario.password,
                    password_confirmation: this.usuario.password_confirmation
                }
                this.loading = true
                let vm = this
                usuarios.usuariosUpdated(this.usuario.id, this.registroUpdate).then((resposta) => {
                    setTimeout(() => {
                        if(resposta.statusText === "Accepted") {
                            this.loading = false
                            vm.$router.push('/usuarios')
                        }
                    }, 2500)
                })
            },
            verificar () {
                this.$v.usuario.$touch();
                if (this.$v.usuario.$error) return
                this.editar()
            }
        },

        validations: {
            usuario: {
                name: {required},
                email: {required},
                password: { required, minLength: minLength(8)},
                password_confirmation: { required, minLength: minLength(8)},
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
        width: 100%;

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