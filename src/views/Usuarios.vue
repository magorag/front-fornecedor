<template>
    <div class="container-busca">
        <div class="container-busca__busca">
            <h2>Usuarios cadastrados</h2>
            <div class="container-busca__busca__control">
            </div>
        </div>


        <div class="container-busca__resultados">
                <div class="container-busca__resultados__loading" v-if="this.loading">
                    <ping-pong class="ping-pong"></ping-pong>
                    <h2>Buscando fornecedores...</h2>
                </div>

                <div class="container-busca__resultados__lista">
                    <Usuario
                        :borderLeft="updateUsuarios(index)"
                        v-for="(usuario, index) in this.usuarios.data"
                        :key="`usuario-${index}`"
                        :usuario="usuario"
                        :chave="`usuario-${index}`"
                    />
                </div>
            </div>
    </div>
</template>

<script>
    import Usuario from "@/components/Usuario.vue";
    import usuarios from "../services/usuarios";
    import fornecedores from "@/services/fornecedores.js";
    import {PingPong} from "vue-loading-spinner";
    import users from "@/services/users.js";

    export default {
        components: {
            Usuario,
            PingPong
        },
        created: function () {
            if (!this.$session.has("session-id")) {
                this.$router.push("/");
            } else {
                usuarios.listar().then(resposta => {
                    this.usuarios = resposta.data;
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
                forn: [],
                fornecedores: [],
                usuarios: [],
                fornecedoresFiltro: [],
                loading: true,
                fornecedor: {},
                admin: null,
                user: null,
            };
        },

        methods: {

            updateUsuarios(index) {
                let newBorder;
                switch (index % 5) {
                    case 0:
                        newBorder = "#00FF00";
                        return newBorder;
                        break;
                    case 1:
                        newBorder = "#2CCEFF";
                        return newBorder;
                        break;
                    case 2:
                        newBorder = "#E392F7";
                        return newBorder;
                        break;
                    case 3:
                        newBorder = "#F2D96E";
                        return newBorder;
                        break;
                    case 4:
                        newBorder = "#FF9090";
                        return newBorder;
                        break;
                }
            },
        },

        computed: {
            usuariosReturn() {
                return this.usuarios;
            },
            loadingReturn() {
                return this.loading;
            },
        },
    }
</script>


<style lang="scss">
    @import "../scss/variables.scss";

    .container-busca {
        width: 90%;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        position: absolute;
        top: 10rem;

        @media (max-width: $max-xs) {
            top: 8rem;
        }

        &__busca {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            margin-top: 10rem;
            width: 100%;

            h2 {
                font-size: 4rem;
                color: black;
                text-align: center;
            }

            &__control {
                margin-top: 3rem;
                display: flex;
                justify-content: center;
                width: 70%;

                @media (max-width: $max-xs) {
                    width: 90%;
                }

                @media (max-width: $max-sm) and (min-width: $min-sm) {
                    width: 70%;
                }

                @media (min-width: $min-lg) {
                    width: 55%;
                }

                input {
                    width: 100%;
                    border: 0;
                    border-radius: 3.4rem;
                    background-color: white;
                    font-size: 2.6rem;
                    padding: 2rem;
                    position: relative;
                }

                input::placeholder {
                    color: #e3e3eb;
                    font-size: 2.6rem;
                }

                button {
                    display: block;
                    background: transparent;
                    border: 0;
                    cursor: pointer;

                    img {
                        margin-left: 2.3rem;
                        @media (max-width: $max-xs) {
                            width: 4rem;
                        }
                    }
                }
            }

            .autocomplete {
                display: none;
                border-radius: 0.5rem;
                border: 1px solid #e3e3eb;
                width: 40%;
                margin-right: 5%;
                background-color: white;
                padding: 2rem;
                z-index: 10;
                @media (max-width: $max-xs) {
                    width: 40%;
                    margin-right: 18%;
                }

                li {
                    button {
                        text-align: start;
                        width: 100%;
                        font-size: 1.3rem;
                        background: transparent;
                        border: 0;
                        cursor: pointer;
                        margin-bottom: 1rem;
                        border-bottom: 1px solid #f5f5f5;
                    }
                }
            }

            .show {
                display: flex !important;
            }
        }

        &__h {
            position: absolute;
            z-index: 20;
            top: 20rem;
            left: auto;
            overflow: hidden;
            width: 70%;
            background-color: transparent;

            @media (max-width: $max-xs) {
                width: 80%;
            }
        }

        &__hash {
            display: flex;
            flex-direction: column;
            width: 100%;
            justify-content: center;
            align-items: center;
            border-top: 1rem solid #3941ff;
            background-color: white;
            position: relative;
            box-shadow: -0.3rem 0.7rem 0.7rem rgba(0, 0, 0, 0.2);
            margin-left: 1%;
            margin-bottom: 1%;

            h2 {
                font-size: 3rem;
                color: #253044;
                font-weight: 400;
                margin-bottom: 2rem;
                @media (max-width: $max-xs) {
                    font-size: 2rem;
                    text-align: center;
                }
            }

            h3 {
                font-size: 1.8rem;
                color: #253044;
                font-weight: bold;
                margin-bottom: 5.6rem;

                @media (max-width: $max-xs) {
                    font-size: 1.4rem;
                    text-align: center;
                    margin-bottom: 3rem;
                }
            }

            a {
                text-decoration: none;
            }

            h5 {
                color: #3941ff;
                text-decoration: none;
                font-size: 1.5rem;
                font-weight: bold;
                margin-bottom: 3.2rem;

                @media (max-width: $max-sm) {
                    display: none;
                }
            }

            button {
                width: 25.5rem;
                color: white;
                background-color: #3941ff;
                border: 1px solid #3941ff;
                border-radius: 10rem;
                padding: 1.8rem 0;
                margin-bottom: 1.7rem;
                cursor: pointer;

                @media (max-width: $max-xs) {
                    width: 17rem;
                }
            }

            .close {
                width: 100%;
                display: flex;
                padding-left: 1rem;
                margin-bottom: 1rem;
                justify-content: flex-start;

                button {
                    border: 0;
                    background: transparent;
                    cursor: pointer;
                    width: 5%;
                }

                @media (max-width: $max-sm) {
                    margin-bottom: 1rem;
                    justify-content: center;

                    img {
                        width: 2rem;
                    }
                }
            }

            h4 {
                color: #35364d;
                font-size: 1.8rem;
                font-weight: 200;
                margin-bottom: 5rem;

                @media (max-width: $max-xs) {
                    text-align: center;
                }
            }

            input {
                position: absolute;
                top: 0;
                left: -999rem;
            }
        }

        &__resultados {
            margin-top: 8rem;
            width: inherit;
            margin-bottom: 5rem;
            position: absolute;
            top: 15rem;
            @media (max-width: $max-xs) {
                width: 100%;
            }

            &__control {
                display: flex;
                justify-content: space-between;
                width: inherit;

                @media (max-width: $max-xs) {
                    width: 100%;
                    flex-direction: column;
                }

                span {
                    font-size: 2rem;
                    color: #253044;
                    @media (max-width: $max-xs) {
                        font-size: 1.5rem;
                        text-align: center;
                        margin-bottom: 2rem;
                    }
                }

                select {
                    -webkit-appearance: none;
                    border: 1px solid #e3e3eb;
                    height: 4.1rem;
                    padding: 1rem 2rem 1rem 1rem;
                    background: transparent;
                    font-size: 1.2rem;
                    background-image: url("../assets/seta.svg");
                    background-repeat: no-repeat;
                    background-position-x: 97%;
                    background-position-y: center;
                    background-size: 1.5rem;
                }
            }

            &__lista {
                margin-top: 5.28rem;

                @media (max-width: $max-xs) {
                    margin-top: 3rem;
                }

                h5 {
                    font-size: 2rem;
                    margin-top: 9rem;
                    text-align: center;
                }
            }

            &__loading {
                font-size: 2rem;
                color: #253044;
                text-align: center;
            }
        }

        .spinner {
            width: 100% !important;
            height: 30rem !important;

            .spinner-inner {
                transform: scale(0.5) !important;
            }

            &--rotate-square-5 {
                width: 2.5rem !important;
                height: inherit !important;

                .spinner-inner {
                    transform: scale(0.3) !important;
                }
            }

            &--circle-6 {
                width: 10% !important;
                height: 4rem !important;
            }
        }
    }
</style>