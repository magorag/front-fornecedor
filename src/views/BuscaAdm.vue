<template>
    <div class="container-busca">
        <div class="container-busca__busca">
            <h2>Digite o que deseja buscar.</h2>
            <div class="container-busca__busca__control">
                <input id="input" type="text" placeholder="Escreva aqui" autocomplete="off"/>
                <button @click="pesquisar">
                    <img src="@/assets/search.svg"/>
                </button>
            </div>
        </div>

        <div class="container-busca__h" v-if="this.hash">
            <div class="container-busca__hash">
                <div class="close">
                    <button @click="close">
                        <img src="@/assets/close.svg" alt/>
                    </button>
                </div>
                <h2>Link para cadastro gerado com sucesso!</h2>
                <h3>Copie o link abaixo e envie para o fornecedor se cadastrar.</h3>
                <input type="text"
                       :value="'https://dinamicafornecedor.herokuapp.com/cadastro/' + this.hash"
                       id="linkHash"
                />
                <router-link to>
                    <h5>https://dinamicafornecedor.herokuapp.com/cadastro/{{this.hash}}</h5>
                </router-link>
                <button @click="copiarLink">Copiar Link</button>
                <h4 id="h4Link">Este link funciona apenas para 1(um) cadastro.</h4>
            </div>
        </div>

        <div class="container-busca__resultados">
            <div class="container-busca__resultados__control">
                <span>Resultado da Busca por: {{parametroBusca}}</span>

                <select name="ordenar" @change="filtrarEstados" v-if="!loading" id="select1">
                    <option value="0">Filtrar por estado...</option>
                    <option v-for="(estado, index) in estados()"
                            :value="estado">{{ estado }}
                    </option>
                </select>

                <select name="ordenar" @change="filtrarCidades" v-if="!loading" id="select2">
                    <option value="Tudo">Filtrar por cidade...</option>
                    <option v-for="cidade in cidades()"
                            :value="cidade">{{ cidade }}
                    </option>
                </select>

                <select name="ordenar" @change="ordenar" id="select">
                    <option>Ordenar resultados por...</option>
                    <option value="relevante">Mais relevantes</option>
                </select>
            </div>
            <div class="container-busca__resultados__loading" v-if="this.loading">
                <ping-pong class="ping-pong"></ping-pong>
                <h2>Buscando fornecedores...</h2>
            </div>

            <div class="container-busca__resultados__lista"
                 v-if="((!this.loading && parametroBusca === 'Tudo') && parametroBuscaEstado === 'Tudo') && parametroBuscaCidade === 'Tudo'"
                 :key="reRender">

                <h5 v-if="fornecedoresReturn.length === 0">
                    Desculpe, não achamos nenhum fornecedor com esse perfil :(
                </h5>

                <Fornecedor :borderLeft="updateFornecedor(index)"
                            v-for="(fornecedor, index) in this.fornecedores"
                            :key="`fornecedor-${index}`"
                            :fornecedor="fornecedor"
                            :chave="`fornecedor-${index}`"
                            :adm="admin"
                            :user="user"/>
            </div>
            <div class="container-busca__resultados__lista"
                 v-if="((!this.loading && parametroBusca !== 'Tudo') && parametroBuscaEstado === 'Tudo') && parametroBuscaCidade === 'Tudo'"
                 :key="reRender">

                <h5 v-if="fornecedoresReturn.length === 0">
                    Desculpe, não achamos nenhum fornecedor com esse perfil :(
                </h5>

                <Fornecedor :borderLeft="updateFornecedor(index)"
                            v-for="(fornecedor, index) in this.fornecedoresFiltro"
                            :key="`fornecedor-${index}`"
                            :fornecedor="fornecedor"
                            :chave="`fornecedor-${index}`"
                            :adm="admin"
                            :user="user"/>
            </div>

            <div class="container-busca__resultados__lista"
                 v-if="parametroBuscaEstado !== 'Tudo'"
                 :key="reRender">

                <Fornecedor :borderLeft="updateFornecedor(index)"
                            v-for="(fornecedor, index) in this.fornecedoresFiltroEstado"
                            :key="`fornecedor-${index}`"
                            :fornecedor="fornecedor"
                            :chave="`fornecedor-${index}`"
                            :adm="admin"
                            :user="user"/>
            </div>
            <div class="container-busca__resultados__lista"
                 v-if="parametroBuscaCidade !== 'Tudo'"
                 :key="reRender">

                <Fornecedor :borderLeft="updateFornecedor(index)"
                            v-for="(fornecedor, index) in this.fornecedoresFiltroCidade"
                            :key="`fornecedor-${index}`"
                            :fornecedor="fornecedor"
                            :chave="`fornecedor-${index}`"
                            :adm="admin"
                            :user="user"/>
            </div>
        </div>
    </div>
</template>

<script>
    import Fornecedor from "@/components/Fornecedor.vue";
    import fornecedores from "@/services/fornecedores.js";
    import hash from "../services/hash.js";
    import {PingPong} from "vue-loading-spinner";
    import users from "@/services/users.js";
    import estados from "../services/estados";

    export default {
        components: {
            Fornecedor,
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
                forn: [],
                fornecedores: [],
                fornecedoresFiltro: [],
                fornecedoresFiltroEstado: [],
                fornecedoresFiltroCidade: [],
                loading: true,
                servico: false,
                fornecedor: {},
                servicos: [],
                parametroBusca: "Tudo",
                parametroBusca1: "Tudo",
                parametroBuscaEstado: "Tudo",
                parametroBuscaCidade: "Tudo",
                searching: false,
                timeout: null,
                gerarHash: false,
                hash: null,
                reRender: 0,
                admin: null,
                user: null,
            };
        },

        methods: {
            updateFornecedor(index) {
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

            preencher(servico) {
                let input = document.getElementById("input");
                input.value = servico.name;
            },
            pesquisar() {
                let input = document.getElementById("input").value.toLowerCase();

                if (input === "") {
                    this.parametroBusca = "Tudo";
                    this.parametroBusca1 = "Tudo";
                    return this.fornecedores
                } else {
                    this.loading = true;
                    this.fornecedoresFiltro = this.fornecedores.filter(value => {
                        if (value.razao_social.toLowerCase().includes(input)) {
                            return true;
                        } else if (value.nome_fantasia.toLowerCase().includes(input)) {
                            return true;
                        } else if (value.cnpj.toLowerCase().includes(input)) {
                            return true;
                        } else if (value.servico[0].toLowerCase().includes(input)) {
                            return true;
                        } else if (
                            value.contato &&
                            value.contato.toLowerCase().includes(input)
                        ) {
                            return true;
                        } else if (
                            value.cargo &&
                            value.cargo.toLowerCase().includes(input)
                        ) {
                            return true;
                        } else if (
                            value.telefone1 &&
                            value.telefone1.toLowerCase().includes(input)
                        ) {
                            return true;
                        } else if (
                            value.telefone2 &&
                            value.telefone2.toLowerCase().includes(input)
                        ) {
                            return true;
                        } else if (
                            value.telefone3 &&
                            value.telefone3.toLowerCase().includes(input)
                        ) {
                            return true;
                        } else if (
                            value.email &&
                            value.email.toLowerCase().includes(input)
                        ) {
                            return true;
                        } else if (
                            value.redes_sociais &&
                            value.redes_sociais.toLowerCase().includes(input)
                        ) {
                            return true;
                        } else if (value.rua && value.rua.toLowerCase().includes(input)) {
                            return true;
                        } else if (
                            value.bairro &&
                            value.bairro.toLowerCase().includes(input)
                        ) {
                            return true;
                        } else if (value.cep && value.cep.toLowerCase().includes(input)) {
                            return true;
                        } else if (
                            value.cidade &&
                            value.cidade.toLowerCase().includes(input)
                        ) {
                            return true;
                        } else if (
                            (value.estado.nome && value.estado.nome.toLowerCase().includes(input))
                        ) {
                            return true;
                        } else if (
                            value.description &&
                            value.description.toLowerCase().includes(input)
                        ) {
                            return true;
                        }
                    });
                    this.reRender++;
                    this.parametroBusca = input;
                    this.parametroBusca1 = input;
                    this.loading = false;

                }
            },

            close() {
                this.hash = null;
                this.$router.replace("/buscaadm");
            },

            copiarLink() {
                let link = document.getElementById("linkHash");
                let h4 = document.getElementById("h4Link");
                link.select();
                link = document.execCommand("copy");
                h4.innerHTML = "Link copiado com sucesso";
            },

            ordenar() {
                let select = document.getElementById("select");
                if (select.value === "relevante") {
                    this.fornecedores.sort(this.compareRelevante);
                    this.reRender += 1;
                } else if (select.value === "barato") {
                    this.fornecedores.sort(this.compareBarato);
                    this.reRender += 1;
                }
            },

            compareRelevante(a, b) {
                if (a.avalicao_servico < b.avalicao_servico) {
                    return 1;
                } else if (a.avalicao_servico > b.avalicao_servico) {
                    return -1;
                }

                return 0;
            },

            compareBarato(a, b) {
                if (a.avalicao_preco < b.avalicao_preco) {
                    return -1;
                } else if (a.avalicao_preco > b.avalicao_preco) {
                    return 1;
                }

                return 0;
            },
            filtrarEstados() {
                let input = document.getElementById("input").value.toLowerCase();
                let select = document.getElementById("select1").value;
                if (this.parametroBusca1 !== 'Tudo' && select !== 'Tudo') {
                    this.fornecedoresFiltroEstado = this.fornecedores.filter(value => {
                        if (value.estado.nome.includes(select)) {
                            return true;
                        } else {
                            return false;
                        }
                    })
                    this.reRender++;
                    this.parametroBusca1 = "Tudo";
                    this.parametroBuscaEstado = select;
                } else {
                    this.parametroBuscaEstado = "Tudo"
                    this.parametroBusca1 = input
                    return this.fornecedoresFiltro
                }
            },
            filtrarCidades() {
                let select = document.getElementById("select2").value;
                let select1 = document.getElementById("select1");
                if (this.parametroBuscaEstado !== 'Tudo' && select !== 'Tudo') {
                    this.fornecedoresFiltroCidade = this.fornecedoresFiltroEstado.filter(value => {
                        if (value.cidade.includes(select)) {
                            return true;
                        } else {
                            return false;
                        }
                    })
                    this.reRender++;
                    this.loading = false;
                    this.parametroBuscaCidade = select
                    this.parametroBuscaEstado = "Tudo"
                } else {
                    this.parametroBuscaEstado = select1.value
                    this.parametroBuscaCidade = "Tudo"
                    return this.fornecedoresFiltroEstado
                }
            },
            estados() {
                let input = document.getElementById("input").value.toLowerCase();
                const estados = this.fornecedoresFiltro.map(f => f.estado.nome)

                const estadosSemRepeticao = estados.filter((s, index, self) =>
                    self.findIndex(a => a === s) === index);

                return estadosSemRepeticao;
            },
            cidades() {
                const cidades = this.fornecedoresFiltroEstado.map(f => f.cidade)

                const cidadesSemRepeticao = cidades.filter((s, index, self) =>
                    self.findIndex(a => a === s) === index);

                return cidadesSemRepeticao;
            },
        },

        computed: {
            loadingReturn() {
                return this.loading;
            },
            fornecedoresReturn() {
                return this.fornecedores;
            },
        },

        watch: {
            "$route.query.gerou"() {
                if (this.$route.query.gerou == 0) {
                    this.gerarHash = true;
                    hash.cadastrarHash().then(resposta => {
                        this.hash = resposta.data.last_insert_hash;
                    });
                }
            }
        }
    };
</script>


<style lang="scss" scoped>
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
                font-size: 3rem;
                color: white;
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
            margin-top: 26.7rem;
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