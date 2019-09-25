<template>
<div>
    <div class="container-fornecedor" v-bind:style="{ borderLeft: '1rem solid ' + borderLeft}">
        <h1>{{fornecedor.nome_fantasia}}</h1>
        <h2>{{fornecedor.servico.name}}</h2>
        <h2 id="inscricao">{{fornecedor.inscricao_estadual}}</h2>
        <h2 v-if="fornecedor.telefone1" id="telefone">{{fornecedor.telefone1}}</h2>
        <h2 v-if="!fornecedor.telefone1" id="telefone">Sem telefone</h2>
        <star-rating :rating="this.ratingServico" @rating-selected = "atualizaRatingServico" v-if="!rateStarLoading" :item-size="17"
        :show-rating="false" :read-only="true" :border-width="0" class="star"></star-rating>
        <rotate-square5 v-if="rateStarLoading"></rotate-square5>
        <button v-on:click="mostrar" id="maisInfo">Mais informações</button>
        <button v-on:click="mostrar" id="maisInfoCel">+</button>
    </div>

    <div class="div" :id="chave">
        <div class="container-informacoes" :style="{ borderTop: '1rem solid '+ this.border}">
            <div class="img"><button v-on:click="esconder"><img src="@/assets/close.svg" alt=""></button></div>
            <div class="principal">
                <div class="principal__header">
                    <h1>Ficha de Cadastro</h1>
                    <button v-if="this.editar && !this.updating" @click="excluir" class="excluir">Excluir</button>
                    <button v-if="!this.editar && !this.updating && this.adm == 1" @click="edit">Editar</button>
                    <button v-if="this.editar && !this.updating" @click="verificar" style="border:0;" :style="{ background: borderLeft}">Salvar</button>
                    <circle6 v-if="this.updating"></circle6>
                </div>

                <div class="principal__box principal__box--rating">
                    <h3>Avaliação por serviço:</h3>
                    <star-rating :rating="this.ratingServico" @rating-selected = "atualizaRatingServico" v-if="!rateStarLoading" :item-size="15"
                    :show-rating="false" :read-only="!this.starEdit" :border-width="1" border-color="#ffd055"></star-rating>
                    <rotate-square5 v-if="rateStarLoading" style="margin-left: 1rem;"></rotate-square5>
                </div>

                <div class="principal__box principal__box--rating">
                    <h3>Avaliação por preço:</h3>
                    <image-rating src="https://magor.com.br/siriolibanes/money-icon.svg" :item-size="16"
                    :show-rating="false" :rating="this.ratingPrecoReturn" @rating-selected = "atualizaRatingPreco" v-if="!ratePrecoLoading" 
                    :read-only="!this.starEdit"></image-rating>
                    <rotate-square5 v-if="ratePrecoLoading" style="margin-left: 1rem;"></rotate-square5>
                </div>

                <div class="principal__box">
                    <h3 :class="{invalido: $v.fornecedorUpdated.razao_social.$error}">Razão Social:</h3>
                    <h2 v-if="!editar">{{fornecedor.razao_social}}</h2>
                    <input type="text" v-model="fornecedorUpdated.razao_social" v-if="editar">
                </div>

                <div class="principal__box">
                    <h3 :class="{invalido: $v.fornecedorUpdated.nome_fantasia.$error}">Nome fantasia:</h3>
                    <h2 v-if="!editar">{{fornecedor.nome_fantasia}}</h2>
                    <input type="text" v-model="fornecedorUpdated.nome_fantasia" v-if="editar">
                </div>

                <div class="principal__box">
                    <h3 :class="{invalido: $v.fornecedorUpdated.cnpj.$error}">CNPJ:</h3>
                    <h2 v-if="!editar">{{fornecedor.cnpj}}</h2>
                    <input type="text" v-model="fornecedorUpdated.cnpj" v-if="editar" v-mask="'##.###.###/####-##'">
                </div>

                <div class="principal__box principal__box--servico">
                    <h3 :class="{invalido: $v.fornecedorUpdated.servico.value.$error}">Serviço:</h3>
                    <h2 v-if="!editar">{{fornecedor.servico.name}}</h2>
                    <div class="form__group" v-if="editar">
                        <input id="servico" name="servico" type="text" v-model="fornecedorUpdated.servico.text" 
                        v-on:keyup="listarServicos" autocomplete="off">
                        <div class="servicosPesquisa" id="servicosPesquisa">
                            <ul>
                                <li v-if="loading"><button style="cursor:progress;" disabled>Buscando serviços</button></li>
                                <li v-for="servico in returnServicos" :key="servico.id"><button v-on:click.prevent="preencherServico(servico)">{{servico.name}}</button></li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div class="principal__box" v-if="fornecedor.contato">
                    <h3>Contato:</h3>
                    <h2 v-if="!editar">{{fornecedor.contato}}</h2>
                    <input type="text" v-model="fornecedorUpdated.contato" v-if="editar">
                </div>

                <div class="principal__box" v-if="fornecedor.cargo">
                    <h3>Cargo:</h3>
                    <h2 v-if="!editar">{{fornecedor.cargo}}</h2>
                    <input type="text" v-model="fornecedorUpdated.cargo" v-if="editar">
                </div>

                <div class="principal__box principal__box--phone" v-if="fornecedor.telefone1 || editar">
                    <h3 v-if="fornecedor.telefone1 || editar">Telefone 1:</h3>
                    <h2 v-if="fornecedor.telefone1 && !editar">{{fornecedor.telefone1}}</h2>
                    <input type="text" v-model="fornecedorUpdated.telefone1" v-if="editar" v-mask="'(##) #####-####'">

                    <h3 v-if="fornecedor.telefone2 || editar">Telefone 2:</h3>
                    <h2 v-if="fornecedor.telefone2 && !editar">{{fornecedor.telefone2}}</h2>
                    <input type="text" v-model="fornecedorUpdated.telefone2" v-if="editar" v-mask="'(##) #####-####'">

                    <h3 v-if="fornecedor.telefone3 || editar">Telefone 3:</h3>
                    <h2 v-if="fornecedor.telefone3 && !editar">{{fornecedor.telefone3}}</h2>
                    <input type="text" v-model="fornecedorUpdated.telefone3" v-if="editar" v-mask="'(##) #####-####'">
                </div>

                <div class="principal__box" v-if="fornecedor.email || editar">
                    <h3>E-mail:</h3>
                    <h2 v-if="!editar">{{fornecedor.email}}</h2>
                    <input type="text" v-model="fornecedorUpdated.email" v-if="editar">
                </div>

                <div class="principal__box" v-if="fornecedor.redes_sociais || editar">
                    <h3>Redes Sociais:</h3>
                    <h2 v-if="!editar">{{fornecedor.redes_sociais}}</h2>
                    <input type="text" v-model="fornecedorUpdated.redes_sociais" v-if="editar">
                </div>

                <div class="principal__box principal__box--address" v-if="fornecedor.rua || fornecedor.bairro || fornecedor.cidade || fornecedor.estado || editar">
                    <h4>Endereço:</h4>

                    <h3 v-if="fornecedor.rua || editar">Rua:</h3>
                    <h2 v-if="fornecedor.rua && !editar">{{fornecedor.rua}}</h2>
                    <textarea v-model="fornecedorUpdated.rua" v-if="editar"></textarea>

                    <h3 v-if="fornecedor.bairro || editar">Bairro:</h3>
                    <h2 v-if="fornecedor.bairro && !editar">{{fornecedor.bairro}}</h2>
                    <input type="text" v-model="fornecedorUpdated.bairro" v-if="editar">

                    <h3 v-if="fornecedor.cidade || editar">Cidade:</h3>
                    <h2 v-if="fornecedor.cidade && !editar">{{fornecedor.cidade}}</h2>
                    <input type="text" v-model="fornecedorUpdated.cidade" v-if="editar">

                    <h3 v-if="fornecedor.estado || editar">Estado:</h3>
                    <h2 v-if="fornecedor.estado && !editar">{{fornecedor.estado}}</h2>
                    <input type="text" v-model="fornecedorUpdated.estado" v-if="editar">
                </div>

                <div class="principal__box">
                    <h3>Inscrição Estadual:</h3>
                    <h2 v-if="!editar">{{fornecedor.inscricao_estadual}}</h2>
                    <input type="text" v-model="fornecedorUpdated.inscricao_estadual" v-if="editar">
                </div>

                <div class="principal__box">
                    <h3>Inscrição Municipal:</h3>
                    <h2 v-if="!editar">{{fornecedor.inscricao_municipal}}</h2>
                    <input type="text" v-model="fornecedorUpdated.inscricao_municipal" v-if="editar">
                </div>

                <div class="principal__box principal__box--tags">
                    <h3>Tags:</h3>
                    <h2 v-if="!editar">{{fornecedor.tags}}</h2>
                    <div class="form__tags" v-if="editar">
                        <vue-tags-input
                            v-model="tag"
                            :tags="tags"
                            @tags-changed="newTags => tags = newTags"
                            :class="{invalidTags: $v.tags.$error}" />
                    </div>
                </div>

                <div class="principal__box principal__box--obs" v-if="fornecedor.description || editar">
                    <h3>Observações:</h3>
                    <h2 v-if="!editar">{{fornecedor.description}}</h2>
                    <textarea v-model="fornecedorUpdated.description" v-if="editar"></textarea>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<style lang="scss">
@import '~@/scss/variables.scss';
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
            font-size: 1.2rem;
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

        #telefone {
            @media(max-width: $max-xs) {
                display: none;
            }
        }

        button {
            background: transparent;
            font-size: 1.2rem;
            text-decoration: underline;
            color: #35364D;
            border: 0;
            cursor: pointer;
        }

        #maisInfo {
            @media(max-width: $max-xs) {
                display: none;
            }
        }

        #maisInfoCel {
            display: none;

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
            height: 100vh;
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
                    margin-bottom: 7rem;
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

    .principal::-webkit-scrollbar {
        width: 0px;
    }
</style>

<script>
import VueTagsInput from '@johmun/vue-tags-input';
import {StarRating} from 'vue-rate-it';
import {ImageRating} from 'vue-rate-it';
import fornecedores from '@/services/fornecedores.js'
import {RotateSquare5} from 'vue-loading-spinner'
import {Circle6} from 'vue-loading-spinner'
import {mask} from 'vue-the-mask';
import servicos from '@/services/servicos.js'
import { required, minLength, between, email } from 'vuelidate/lib/validators'

export default {
  name: 'Fornecedor',
  props: {
      borderLeft: {
          type: String,
          required: true,
      },
      chave: {
          type: String,
          required: true
      },
      fornecedor: {
          required: true
      },
      adm: {
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

  data: function() {
      return {
        border: this.borderLeft,
        starEdit: false,
        servico: '',
        ratingServico: this.fornecedor.avalicao_servico,
        rateStarLoading: false,
        ratePrecoLoading: false,
        ratingPreco : this.fornecedor.avalicao_preco,
        editar: false,
        tag: '',
        tags: [],
        servicos: null,
        timeout: null,
        loading: false,
        updating: false,
        fornecedorUpdated : {
          razao_social: this.fornecedor.razao_social,
          nome_fantasia: this.fornecedor.nome_fantasia,
          cnpj: this.fornecedor.cnpj,
          inscricao_estadual: this.fornecedor.inscricao_estadual,
          inscricao_municipal: this.fornecedor.inscricao_municipal,
          servico: {
            text: this.fornecedor.servico.name, value: this.fornecedor.servico.id
          },
          tagsString: this.fornecedor.tags,
          contato: this.fornecedor.contato,
          cargo: this.fornecedor.cargo,
          telefone1: this.fornecedor.telefone1,
          telefone2: this.fornecedor.telefone2,
          telefone3: this.fornecedor.telefone3,
          email: this.fornecedor.email,
          redes_sociais: this.fornecedor.redes_sociais,
          rua: this.fornecedor.rua,
          bairro: this.fornecedor.bairro,
          cidade: this.fornecedor.cidade,
          estado: this.fornecedor.estado,
          description: this.fornecedor.description
        },
        editouStar: false,
        editou: false
      }
      
  },

  methods: {
      mostrar() {
          let info = document.getElementById(`${this.chave}`);
          info.classList.add('div--show');
      },

      esconder() {
          if(this.editar && !this.editouStar && this.editou){
              let r = confirm("Deseja realmente sair sem salvar?")
              if(r) {
                  this.fornecedorUpdated = {
                    razao_social: this.fornecedor.razao_social,
                    nome_fantasia: this.fornecedor.nome_fantasia,
                    cnpj: this.fornecedor.cnpj,
                    inscricao_estadual: this.fornecedor.inscricao_estadual,
                    inscricao_municipal: this.fornecedor.inscricao_municipal,
                    servico: {
                        text: this.fornecedor.servico.name, value: this.fornecedor.servico.id
                    },
                    tagsString: this.fornecedor.tags,
                    contato: this.fornecedor.contato,
                    cargo: this.fornecedor.cargo,
                    telefone1: this.fornecedor.telefone1,
                    telefone2: this.fornecedor.telefone2,
                    telefone3: this.fornecedor.telefone3,
                    email: this.fornecedor.email,
                    redes_sociais: this.fornecedor.redes_sociais,
                    rua: this.fornecedor.rua,
                    bairro: this.fornecedor.bairro,
                    cidade: this.fornecedor.cidade,
                    estado: this.fornecedor.estado,
                    description: this.fornecedor.description
                  }
                  this.editar = false;
                  this.starEdit = false;
                  let info = document.getElementById(`${this.chave}`);
                  info.classList.remove('div--show');
              }
          }
          else {
            this.editouStar = false
            this.editar = false
            this.starEdit = false
            this.editou = false
            let info = document.getElementById(`${this.chave}`);
            info.classList.remove('div--show');
          }
          
      },

      atualizaRatingServico(rating) {
          this.rateStarLoading = true;
          this.ratingServico = rating
          fornecedores.atualizarRating(this.fornecedor.id, this.ratingServico).then((resposta) => {
              this.rateStarLoading = false;
              this.editouStar = true
          })
      },

      atualizaRatingPreco(rating) {
          this.ratePrecoLoading = true;
          this.ratingPreco = rating
          fornecedores.atualizarRatingPreco(this.fornecedor.id, this.ratingPreco).then((resposta) => {
              this.ratePrecoLoading = false;
              this.editouStar = true
          })
      },

      listarServicos() {
        clearTimeout(this.timeout);
        var vm = this;
        var divServicos = document.getElementById('servicosPesquisa')
        this.timeout = setTimeout(function() {
          vm.fornecedorUpdated.servico.value = null;
          vm.loading = true;
          let res = servicos.listar(vm.fornecedorUpdated.servico.text).then(res => {
            vm.loading = false;
            vm.servicos = res.data;
          })

          if(!divServicos.classList.contains('servicosPesquisa--show')){
            divServicos.classList.add('servicosPesquisa--show')
          }
        }, 800)


      },

      preencherServico(servico) {
        var servicoInput = document.getElementById('servico')
        var divServicos = document.getElementById('servicosPesquisa')
        this.fornecedorUpdated.servico.text = servico.name
        this.fornecedorUpdated.servico.value = servico.id
        divServicos.classList.remove('servicosPesquisa--show')
      },

      edit() {
          this.editar = true;
          this.starEdit = true;
          let tags = this.fornecedorUpdated.tagsString.replace(/\s+/g, '')
          tags = tags.split(",")
          tags.forEach((element, index) => {
              this.tags[index] = {
                  text: element,
                  tiClasses: ["ti-valid"]
              }
          });
      },

      save() {
          this.updating = true;
          let vm = this
          fornecedores.atualizarFornecedor(this.fornecedor.id, this.fornecedorUpdated).then((resposta) =>{
              setTimeout(() => {
                  vm.editar = false;
                  vm.updating = false;
                  vm.$router.go()
              }, 2500)
          })
      },

      verificar() {
          this.fornecedorUpdated.tagsString = ''
          this.tags.forEach((element, index, array) => {
              if(index != array.length - 1){
              this.fornecedorUpdated.tagsString += element.text + ', '
              } else {
                this.fornecedorUpdated.tagsString += element.text
              }
          })

          this.$v.fornecedorUpdated.$touch();
          this.$v.tags.$touch();
          if(this.$v.fornecedorUpdated.$error || this.$v.tags.error) return

        this.save()
        },

        excluir() {
            let r = confirm("Esse é um processo irreversível de exclusão desse fornecedor. Você deseja realmente excluir?")
            if(r) {
                let vm = this
                this.updating = true;
                fornecedores.removeFornecedor(this.fornecedor.id).then(resposta => {
                    setTimeout(() => {
                        vm.editar = false;
                        vm.updating = false;
                        if(!resposta.data.error) {
                            vm.$router.go()
                        }
                    }, 2500)
                })
            }
        }
  },

  computed: {
      ratingPrecoReturn() {
          return this.ratingPreco;
      },
      returnServicos() {
        return this.servicos
      }
  },

  validations: {
        fornecedorUpdated: {
            razao_social: { required },
            nome_fantasia: { required },
            cnpj: { required, minLength: minLength(18) },
            inscricao_estadual: { required },
            inscricao_municipal: { required },
            servico: {
              text: { required }, value: { required }
            },
        },
        tags: {required}
    },

    watch: {
        'fornecedorUpdated':  {
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
