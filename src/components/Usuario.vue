<template>
    <div>
        <div class="container-fornecedor" v-bind:style="{ borderLeft: '1rem solid ' + borderLeft}">
            <h1>
                {{ usuario.name }}
            </h1>
            <h2 class="telefone">
                {{ usuario.email }}
            </h2>
            <div class="botao">
                <router-link id="editar" :to="{ name: 'editarusuarioId', params: {  id: usuario.id }}">
                    Editar usuário
                </router-link>

                <button id="remover" @click="excluir" class="excluir">
                    Remover usuário
                </button>
                <button id="removerCel">
                    x
                </button>
            </div>
        </div>
    </div>
</template>

<script>
    import VueTagsInput from '@johmun/vue-tags-input';
    import {StarRating} from 'vue-rate-it';
    import {ImageRating} from 'vue-rate-it';
    import {RotateSquare5} from 'vue-loading-spinner'
    import {Circle6} from 'vue-loading-spinner'
    import {mask} from 'vue-the-mask';
    import usuarios from "../services/usuarios";

    export default {
        name: 'Usuario',
        props: {
            borderLeft: {
                type: String,
                required: true,
            },
            chave: {
                type: String,
                required: true
            },
            usuario: {
                required: true
            },
        },
        directives: {mask},
        components: {
            StarRating,
            ImageRating,
            RotateSquare5,
            VueTagsInput,
            Circle6,
        },
        methods: {
            excluir() {
                let r = confirm("Esse é um processo irreversível de exclusão desse usuário será permanente. Você deseja realmente excluir?")
                if (r) {
                    let vm = this
                    this.updating = true;
                    usuarios.deleteUser(this.usuario.id).then(resposta => {
                        setTimeout(() => {
                            vm.editar = false;
                            vm.updating = false;
                            if (!resposta.data.error) {
                                vm.$router.go()
                            }
                        }, 2500)
                    })
                }
            },
        },

        watch: {
            'usuariosUpdated':  {
                handler: function(val, oldVal) {
                    if(this.editou == false) {
                        this.editou = true
                    }
                },
                deep: true
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '../scss/variables.scss';
    .div {
        position: fixed;
        top: 0;
        right: 0;
        opacity: 0;
        height: 0;
        overflow: hidden;
        transition: opacity .5s ease-out;
        width: 40%;

        @media(max-width: $max-xs) {
            width: 93%;
        }

        @media(max-width: $max-sm) and (min-width: $min-sm) {
            width: 60%;
        }

        &--show {
            opacity: 1;
            height: 100%;
        }
    }
    .container-fornecedor {
        display: flex;
        justify-content: space-between;
        padding: 0 2rem;
        align-items: center;
        border: 1px solid #E3E3EB;
        border-radius: .5rem;
        height: 5rem;
        margin-bottom: 1.6rem;

        .star {
            @media(max-width: $max-xs) {
                display: none !important;
            }
        }

        h1 {
            font-size: 1.5rem;
            font-weight: bold;
            line-height: 1.5rem;
            color: #35364D;
            width:15%;
            @media(max-width: $max-xs) {
                width: 55%;
                font-size: 1.5rem;
            }
        }

        h2 {
            font-size: 1.2rem;
            line-height: 1.7rem;
            font-weight: 400;
            width: 12%;
            color: #35364D;
            @media(max-width: $max-xs) {
                text-align: right;
                width: initial;
            }
        }

        #inscricao {
            @media(max-width: $max-xs) {
                display: none;
            }
        }

        .telefone {
            font-size: 1.5rem;
            @media(max-width: $max-xs) {
                display: none;
            }
        }
        button {
            background: transparent;
            font-size: 1.2rem;
            text-decoration: underline;
            color: #35364D;
            align-items: flex-end;
            border: 0;
            cursor: pointer;
        }

        #editar {
            align-items: flex-end;
            font-size: 1.5rem;
            color: #7ce51d;
        }

        #remover {
            margin-left: 5rem;
            font-size: 1.5rem;
            color: #ee4c4a;
            @media(max-width: $max-xs) {
                display: none;
            }
        }

        #removerCel {
            display: none;
            color: #ee4c4a;
            @media(max-width: $max-xs) {
                display: block;
                text-decoration: none;
                font-size: 1.8rem;
            }
        }
    }

    .container-informacoes {
        position: relative;
        box-shadow: -6px -5px 7px rgba(0, 0, 0, .2);
        margin-left: 6%;
        background-color: white;
        height: inherit;
        padding: 1rem 2rem 1rem 1rem;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        @media(max-width: $max-xs) {
            box-shadow: -1px -5px 7px rgba(0, 0, 0, .2);
            width: 100%;
            margin-left: 2%;
        }

        .img {
            width: 100%;
            padding-top: 1rem;
            padding-left: 3rem;
            button{
                border: 0;
                background: transparent;
                cursor: pointer;

                img {
                    @media(max-width: $max-xs) {
                        width: 2rem;
                        padding-top: 1rem;
                        padding-left: -4rem;
                    }
                }
            }
        }

        .principal {
            display: flex;
            flex-direction: column;
            align-items: center;
            width: 70%;
            overflow-y: scroll;
            overflow-x: hidden;

            @media(max-width: $max-xs) {
                width: 75%;
            }

            &__header {
                margin-top: 4.5rem;
                margin-bottom: 3.8rem;
                width: 100%;
                display: flex;
                justify-content: space-between;

                h1 {
                    font-size: 2.8rem;
                    color: #253044;
                    @media(max-width: $max-xs) {
                        font-size: 2rem;
                    }
                }

                button {
                    border: 1px solid gray;
                    background-color: transparent;
                    text-decoration: none;
                    font-size: 1.2rem;
                    color: #35364D;
                    cursor:pointer;
                    padding: .5rem 1rem;
                    height: 3rem;
                }

                .excluir {
                    border: 1px solid #FF514D;
                    color: #FF514D;
                    margin-left: 3rem;
                }
            }

            &__box {
                width: 100%;
                border-bottom: 1px solid #F5F5F5;
                padding-bottom: 1.4rem;
                margin-bottom: 2.2rem;

                h3 {
                    font-size: 1.5rem;
                    color: #35364D;
                    margin-bottom: .5rem;
                }

                h2 {
                    font-size: 1.8rem;
                    color: #35364D;
                    font-weight: bold;
                    line-height: 2.4rem;
                }

                input, textarea {
                    border: 0;
                    font-size: 1.7rem;
                    color: #35364D;
                    font-weight: bold;
                    line-height: 2.4rem;
                    margin-top: 1rem;
                    margin-bottom: .5rem;
                    width: 100%;
                    word-break: break-word;
                    resize: none;
                }

                input::first-line, textarea::first-line {
                    background-color: #FFFFDA;
                }

                &--phone {
                    h2{
                        margin-bottom: 1.5rem;
                    }
                }

                &--address {
                    h4 {
                        font-size: 1.5rem;
                        color: #35364D;
                        font-weight: bold;
                        margin-bottom: 1.4rem;
                    }

                    h2{
                        margin-bottom: 1.5rem;
                    }
                }

                &--rating {
                    h3 {
                        margin-bottom: .6rem;
                    }
                }

                &--obs {
                    padding-bottom: 5rem;
                    h2{
                        line-break: auto;
                    }
                }

                &--tags {
                    .form__tags {
                        margin-top: 2rem;
                        margin-bottom: 3rem;
                        .vue-tags-input{
                            margin-bottom: 1.9rem;
                            margin-top: 1.1rem;

                            .ti-input {
                                border: 0;
                                width: 40rem;
                                border-radius: .5rem;

                                input::first-line {
                                    background-color: white;
                                }

                                input {
                                    color: #35364D;
                                }

                                input::placeholder {
                                    opacity: 0;
                                }

                                .ti-tag {
                                    background-color:#F5F5F5;
                                    border-radius: 2rem;
                                    font-size: 1.5rem;
                                    color: #35364D;
                                }
                            }
                        }
                        .vue-tags-input.invalidTags {
                            .ti-input {
                                border: 1px solid #FF514D;
                            }
                        }
                    }
                }

                &--servico {
                    .estadosPesquisa,
                    .servicosPesquisa {
                        display: none;
                        background-color: white;
                        padding: 0rem;
                        li {
                            width:100%;
                            height: 3rem;
                            button{
                                display: flex;
                                justify-content: flex-start;
                                width: inherit;
                                font-size: 1.5rem;
                                background: transparent;
                                border: 0;
                                cursor: pointer;
                                color: #35364D;
                            }
                        }

                        &--show {
                            display: block;
                        }
                    }
                }
            }

            .invalido {
                color: #FF514D;
            }
        }
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

    .principal::-webkit-scrollbar {
        width: 0px;
    }
</style>
