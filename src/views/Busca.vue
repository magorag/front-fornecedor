<template>
    <div class="container-busca">
        <div class="container-busca__busca">
            <h2>Digite o que deseja buscar.</h2>
            <div class="container-busca__busca__control">
                <input id="input" type="text" placeholder="Escreva aqui" @keyup="onKeyUp" @blur="onBlur" autocomplete="off">
                <button @click="pesquisar"><img src="@/assets/search.svg"></button>
            </div>
            <div id="autocomplete" class="autocomplete">
                <ul>
                    <li v-if="this.searching"><button>Buscando...</button></li>
                    <li v-for="(servico, index) in servicos" :key="index"><button @click.prevent="preencher(servico)" v-if="servico.name">{{servico.name}}</button></li>
                </ul>
            </div>
        </div>

        <div class="container-busca__h" v-if="this.hash">
            <div class="container-busca__hash">
                <button class="close" @click="close"><img src="@/assets/close.svg" alt=""></button>
                <h2>Link para cadastro gerado com sucesso!</h2>
                <h3>Copie o link abaixo e envie para o fornecedor se cadastrar.</h3>
                <input type="text" :value="'https://dinamicafornecedor.herokuapp.com/cadastro/' + this.hash" id="linkHash">
                <router-link to=""><h5>https://dinamicafornecedor.herokuapp.com/cadastro/{{this.hash}}</h5></router-link>
                <button @click="copiarLink">Copiar Link</button>
                <h4 id="h4Link">Este link funciona apenas para 1(um) cadastro.</h4>
            </div>
        </div>

        <div class="container-busca__resultados">
            <div class="container-busca__resultados__control">
                <span>Resultado da Busca por: {{parametroBusca}}</span>
                <select name="ordenar" @change="ordenar" id="select">
                    <option value="">Ordenar resultados por...</option>
                    <option value="relevante">Mais relevantes</option>
                    <option value="barato">Mais barato</option>
                </select>
            </div>

            <div class="container-busca__resultados__loading" v-if="this.loading">
                <ping-pong class="ping-pong"></ping-pong>
                <h2>Buscando fornecedores...</h2>
            </div>

            <div class="container-busca__resultados__lista" v-if="this.parametroBusca === 'Tudo' && !this.loading" :key="reRender">
                <Fornecedor :borderLeft="updateFornecedor(index)" v-for="(fornecedor, index) in this.fornecedores" 
                :key="`fornecedor-${index}`" :fornecedor="fornecedor" :chave="`fornecedor-${index}`" :adm="admin"/>
            </div>

            <div class="container-busca__resultados__lista" v-if="this.parametroBusca !== 'Tudo' && !this.loading " :key="reRender">
                <h5 v-if="fornecedoresFiltroReturn.length == 0">Desculpe, não achamos nenhum fornecedor com esse perfil :(</h5>
                <Fornecedor :borderLeft="updateFornecedor(index)" v-for="(fornecedor, index) in this.fornecedoresFiltro" 
                :key="`fornecedor-${index}`" :fornecedor="fornecedor" :chave="`fornecedor-${index}`" :adm="admin"/>
            </div>
        </div>
    </div>
</template>

<script>
import Fornecedor from '@/components/Fornecedor.vue'
import fornecedores from '@/services/fornecedores.js'
import servicos from '@/services/servicos.js'
import hash from '@/services/hash.js'
import {PingPong} from 'vue-loading-spinner'
import users from '@/services/users.js'

  export default {
    components: {
        Fornecedor,
        PingPong
    },
    created: function () {
        if (!this.$session.has('session-id')) {
            this.$router.push('/')
        } else {
            fornecedores.listar().then((resposta) => {
                this.fornecedores = resposta.data
                users.userLogged(this.$session.get('token')).then(resposta2 => {
                    this.admin = resposta2.data.admin
                    this.loading = false
                })
            })
        }
    },
    data() {
        return {
            fornecedores: [],
            fornecedoresFiltro: [],
            loading: true,
            fornecedor: {},
            servicos: [],
            parametroBusca: "Tudo",
            searching: false,
            timeout: null,
            gerarHash : false,
            hash: null,
            reRender: 0,
            admin: null,
        }
    },

    methods: {
        onKeyUp() {
            clearTimeout(this.timeout)
            let vm = this
            let input = document.getElementById('input').value

            this.timeout = setTimeout(()=> {
                let autocomplete = document.getElementById('autocomplete')

                if(!autocomplete.classList.contains('show')){
                    autocomplete.classList.add('show')
                }
                vm.searching = true;
                servicos.listar(input).then((resposta) => {
                    vm.servicos = resposta.data
                    if(vm.servicos.length == 0) {
                        autocomplete.classList.remove('show')
                    }
                    vm.searching = false;
                })
            }, 800)
        },

        onBlur() {
            var autocomplete = document.getElementById('autocomplete')
            setTimeout(() => {autocomplete.classList.remove('show')}, 300)
            
        },

        updateFornecedor(index){
            let newBorder;
            switch(index % 5){
                case 0:
                    newBorder = "#00FF00"
                    return newBorder;
                    break;
                case 1:
                    newBorder = "#2CCEFF"
                    return newBorder;
                    break;
                case 2:
                    newBorder = "#E392F7"
                    return newBorder;
                    break;
                case 3:
                    newBorder = "#F2D96E"
                    return newBorder;
                    break;
                case 4:
                    newBorder = "#FF9090"
                    return newBorder;
                    break;
            }
        },

        preencher(servico) {
            let input = document.getElementById('input')
            input.value = servico.name;
        },

        pesquisar() {
            let input = document.getElementById('input').value
            if(input != '') {
                this.loading = true;
                fornecedores.listar().then(resposta => {
                    this.fornecedores = resposta.data
                    this.fornecedoresFiltro = this.fornecedores.filter((value) => {
                        return (value.servico.name === input) || (value.tags.includes(input.toLowerCase()))
                    })
                    this.reRender++
                    this.parametroBusca = input
                    this.loading = false
                })
            }
        },

        close() {
            this.hash = null
            this.$router.replace('/busca')
        },

        copiarLink() {
            let link = document.getElementById('linkHash')
            let h4 = document.getElementById('h4Link')
            link.select()
            link = document.execCommand('copy')
            h4.innerHTML = 'Link copiado com sucesso'
        },

        ordenar() {
            let select = document.getElementById('select')
            fornecedores.listar().then(resposta => {
                this.fornecedores = resposta.data
                if(select.value == 'relevante') {
                    this.fornecedores.sort(this.compareRelevante)
                    this.fornecedoresFiltro.sort(this.compareRelevante)
                    this.reRender += 1
                } else if (select.value == 'barato') {
                    this.fornecedores.sort(this.compareBarato)
                    this.fornecedoresFiltro.sort(this.compareBarato)
                    this.reRender += 1
                }
            })
        },

        compareRelevante( a, b ) {
                if ( a.avalicao_servico < b.avalicao_servico ){
                    return 1;
                }
                else if ( a.avalicao_servico > b.avalicao_servico ){
                    return -1;
                }

            return 0;
        },

        compareBarato( a, b ) {
            if ( a.avalicao_preco < b.avalicao_preco ){
                return -1;
            }
            else if ( a.avalicao_preco > b.avalicao_preco ){
                return 1;
            }

            return 0;
        }

    },

    computed: {
        loadingReturn() {
            return this.loading;
        },
        fornecedoresReturn() {
            return this.fornecedores;
        },
        fornecedoresFiltroReturn() {
            return this.fornecedoresFiltro;
        }
    },

    watch:{
        '$route.query.gerar'() {
            if(this.$route.query.gerar == 1) {
                this.gerarHash = true
                hash.cadastrarHash().then((resposta) => {
                    this.hash = resposta.data.last_insert_hash
                })
            }
        }
    } 
  }
</script>


<style lang="scss">
@import '~@/scss/variables.scss';
.container-busca {
    width: 90%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    position: absolute;
    top: 10rem;

    @media(max-width: $max-xs) {
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

            @media(max-width: $max-xs) {
                width: 90%;
            }

            @media(max-width: $max-sm) and (min-width: $min-sm) {
                width: 70%;
            }

            @media(min-width: $min-lg) {
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
                color: #E3E3EB;
                font-size: 2.6rem;
            }

            button{
                display:block;
                background: transparent;
                border: 0;
                cursor: pointer;
                img {
                    margin-left: 2.3rem;
                    @media(max-width: $max-xs) {
                        width: 4rem;
                    }
                }
            }
        }

        .autocomplete {
            display: none;
            border-radius: .5rem;
            border: 1px solid #E3E3EB;
            width: 40%;
            margin-right: 5%;
            background-color: white;
            padding: 2rem;
            z-index: 10;
            @media(max-width: $max-xs) {
              width: 40%;
              margin-right: 18%;
            }
            li {
                button{
                    text-align: start;
                    width: 100%;
                    font-size: 1.3rem;
                    background: transparent;
                    border: 0;
                    cursor: pointer;
                    margin-bottom: 1rem;
                    border-bottom: 1px solid #F5F5F5;
                }
            }
        }

        .show{
            display: flex !important;
        }
    }

    &__h {
        position: absolute;
        z-index: 20;
        top: 20rem;
        left: auto;
        overflow: hidden;
        width: 60%;
        background-color: transparent;

        @media(max-width: $max-xs) {
            width: 80%;
        }
    }

    &__hash {
        display: flex;
        flex-direction: column;
        width: 100%;
        justify-content: center;
        align-items: center;
        border-top: 1rem solid #3941FF;
        background-color: white;
        position: relative;
        box-shadow: -.3rem .7rem .7rem rgba(0, 0, 0, .2);
        margin-left: 1%;
        margin-bottom: 1%;

        h2 {
            font-size: 3rem;
            color: #253044;
            font-weight: 400;
            margin-bottom: 2rem;
            @media(max-width: $max-xs) {
                font-size: 2rem;
                text-align: center;
            }
        }

        h3 {
            font-size: 1.8rem;
            color: #253044;
            font-weight: bold;
            margin-bottom: 5.6rem;

            @media(max-width: $max-xs) {
                font-size: 1.4rem;
                text-align: center;
                margin-bottom: 3rem;
            }
        }

        a {
            text-decoration: none;
        }

        h5 {
            color: #3941FF;
            text-decoration: none;
            font-size: 1.5rem;
            font-weight: bold;
            margin-bottom: 3.2rem;

            @media(max-width: $max-sm) {
                display:none;
            }
        }

        button {
            width: 25.5rem;
            color: white;
            background-color: #3941FF;
            border: 1px solid #3941FF;
            border-radius: 10rem;
            padding: 1.8rem 0;
            margin-bottom: 1.7rem;
            cursor: pointer;

            @media(max-width: $max-xs) {
                width: 17rem;
            }
        }

        .close {
            width: 100%;
            border: 0;
            background: transparent;
            cursor: pointer;
            display: flex;
            padding-left: 1rem;
            margin-bottom: 6rem;
            justify-content: flex-start;
            @media(max-width: $max-sm) {
                margin-bottom: 1rem;
                justify-content: center;

                img{ 
                    width: 2rem;
                }
            }
        }

        h4 {
            color: #35364D;
            font-size: 1.8rem;
            font-weight: 200;
            margin-bottom: 5rem;

            @media(max-width: $max-xs) {
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
        @media(max-width: $max-xs) {
            width: 100%;
        }
        &__control {
            display: flex;
            justify-content: space-between;
            width: inherit;

            @media(max-width: $max-xs) {
                width: 100%;
                flex-direction: column
            }

            span {
                font-size: 2rem;
                color: #253044;
                @media(max-width: $max-xs) {
                    font-size: 1.5rem;
                    text-align: center;
                    margin-bottom: 2rem;
                }
            }

            select {
                -webkit-appearance: none;
                border: 1px solid #E3E3EB;
                height: 4.1rem;
                padding: 1rem 2rem 1rem 1rem;
                background: transparent;
                font-size: 1.2rem;
                background-image: url('~@/assets/seta.svg');
                background-repeat: no-repeat;
                background-position-x: 97%;
                background-position-y: center;
                background-size: 1.5rem;
            }
        }

        &__lista {
            margin-top: 5.28rem;

            @media(max-width: $max-xs) {
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
            transform: scale(.5) !important;
        }

        &--rotate-square-5{
            width: 2.5rem !important;
            height: inherit !important;

            .spinner-inner {
                transform: scale(.3) !important;
            }
        }

        &--circle-6 {
            width: 10% !important;
            height: 4rem !important;
        }
    }

       

    
}
</style>
