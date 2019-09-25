<template>
    <div class="form-cadastro" :class="{'form-cadastro--loading' : mostrar, 'form-cadastro--hide' : repetida}">

      <div class="form-cadastro__help" style="display: none;">
        <img src="@/assets/help.svg">
      </div>

      <div class="carregando" v-if="!this.mostrar && !this.repetida">
        <h1>Ficha de Cadastro de Novo Fornecedor</h1>
        <letter-cube></letter-cube>
        <h3>Validando sua chave de acesso</h3>
      </div>

      <div class="div-hash-repetida" v-if="this.repetida">
          <div class="div-hash-repetida__content">
              <img src="@/assets/icon-expirou.svg" alt="">
              <h2>Este link expirou.</h2>
              <h3>Entre em contato com a <strong>Dinâmica Produções</strong> para obter um novo link.</h3>
          </div>
      </div>

      <form method="post" v-if="this.mostrar && !this.repetida">
        <h1>Ficha de Cadastro de Novo Fornecedor</h1>

        <div class="form__group">
          <div class="error" v-if="$v.fornecedor.razao_social.$error">* Esse campo é obrigatório</div>
          <input name="razao_social" type="text" v-model="fornecedor.razao_social" :class="{invalid: $v.fornecedor.razao_social.$error}">
          <label for="razao_social">Razão Social:</label>
        </div>

        <div class="form__group">
          <div class="error" v-if="$v.fornecedor.nome_fantasia.$error">* Esse campo é obrigatório</div>
          <input name="nome_fantasia" type="text" v-model="fornecedor.nome_fantasia" :class="{invalid: $v.fornecedor.nome_fantasia.$error}"> 
          <label for="nome_fantasia">Nome fantasia:</label>
        </div>

        <div class="form__group">
            <div class="error" v-if="$v.fornecedor.cnpj.$error">* Esse campo é obrigatório e precisa de 18 caracteres</div>
            <input name="cnpj" type="text" v-mask="'##.###.###/####-##'" v-model="fornecedor.cnpj" :class="{invalid: $v.fornecedor.cnpj.$error}">
            <label for="cnpj">CNPJ:</label>
        </div>

          <div class="form__group">
            <div class="error" v-if="$v.fornecedor.inscricao_estadual.$error">* Esse campo é obrigatório</div>
            <input name="inscricao_estadual" type="text" v-model="fornecedor.inscricao_estadual" :class="{invalid: $v.fornecedor.inscricao_estadual.$error}">
            <label for="inscricao_estadual">Inscrição Estadual:</label>
          </div>

          <div class="form__group">
            <div class="error" v-if="$v.fornecedor.inscricao_municipal.$error">* Esse campo é obrigatório</div>
            <input name="inscricao_municipal" type="text" v-model="fornecedor.inscricao_municipal" :class="{invalid: $v.fornecedor.inscricao_municipal.$error}">
            <label for="inscricao_municipal">Inscrição Municipal:</label>
          </div>

          <div class="form__group">
            <div class="servicosPesquisa" id="servicosPesquisa">
              <ul>
                <li v-if="loading"><button style="cursor:progress;" disabled>Buscando serviços</button></li>
                <li v-for="servico in returnServicos" :key="servico.id"><button v-on:click.prevent="preencherServico(servico)">{{servico.name}}</button></li>
              </ul>
            </div>
            <div class="error" v-if="$v.fornecedor.servico.$error">* Esse campo é obrigatório</div>
            <input id="servico" name="servico" type="text" v-model="fornecedor.servico.text" v-on:keyup="listarServicos" 
              :class="{invalid: $v.fornecedor.servico.$error}" autocomplete="off">
            <label for="servico">Serviço:</label>
          </div>

          <div class="form__tags">
            <label >Tags (separe as tags com enter)</label>
            <vue-tags-input
              v-model="tag"
              :tags="tags"
              @tags-changed="newTags => tags = newTags" :class="{invalidTags: $v.tags.$error}"/>
              <div class="error" v-if="$v.tags.$error">* Esse campo é obrigatório</div>
          </div>

          <h3>Informações</h3>

          <div class="form__group">
            <input name="contato" type="text" v-model="fornecedor.contato">
            <label for="contato">Contato:</label>
          </div>

          <div class="form__group">
            <input name="" type="text" v-model="fornecedor.cargo">
            <label for="cargo">Cargo:</label>
          </div>

          <div class="form__group">
            <input name="telefone1" type="text" v-mask="'(##) #####-####'" v-model="fornecedor.telefone1">
            <label for="telefone1">Telefone 1:</label>
          </div>

          <div class="form__group">
            <input name="telefone2" type="text" v-mask="'(##) #####-####'" v-model="fornecedor.telefone2">
            <label for="telefone2">Telefone 2:</label>
          </div>

          <div class="form__group">
            <input name="telefone3" type="text" v-mask="'(##) #####-####'" v-model="fornecedor.telefone3">
            <label for="telefone3">Telefone 3</label>
          </div>

          <div class="form__group">
            <input name="email" type="email" v-model="fornecedor.email">
            <label for="email">E-mail:</label>
          </div>

          <div class="form__group">
            <input name="redes_sociais" type="text" v-model="fornecedor.redes_sociais">
            <label for="redes_socias">Redes Sociais:</label>
          </div>

          <h3>Endereço</h3>
          
          <div class="form__group">
            <input name="rua" type="text" v-model="fornecedor.rua">
            <label for="rua">Rua:</label>
          </div>

          <div class="form__group">
            <input name="bairro" type="text" v-model="fornecedor.bairro">
            <label for="bairro">Bairro:</label>
          </div>

          <div class="form__group">
            <input name="cidade" type="text" v-model="fornecedor.cidade">
            <label for="cidade">Cidade:</label>
          </div>

          <div class="form__group">
            <input name="estado" type="text" v-model="fornecedor.estado">
            <label for="estado">Estado:</label>
          </div>

          <div class="form__group">
            <div class="textarea">
              <textarea name="description" v-model="fornecedor.description"></textarea>
            </div>
            <label for="description">Observações:</label>
          </div>

          <button @click.prevent="verificar" id="btnCadastro">Pronto! Cadastrar</button>

      </form>
    </div>
</template>

<script>
  import VueTagsInput from '@johmun/vue-tags-input';
  import {mask} from 'vue-the-mask';
  import fornecedores from '@/services/fornecedores.js'
  import hash from '@/services/hash.js'
  import servicos from '@/services/servicos.js'
  import {LetterCube} from 'vue-loading-spinner';
  import { required, minLength, between, email } from 'vuelidate/lib/validators'

  export default {
    components: {
      VueTagsInput,
      LetterCube
    },
    created: function () {

        if (this.$session.exists()) {
            this.mostrar = true;
        }

        else if(this.$route.params.hash) {
          hash.getHash(this.$route.params.hash).then((resposta) => {
            if(resposta.data == 'Pagina não encontrada') {
              this.$router.push('/404')
            } else if(resposta.data[0].cadastrado == 0) {
              this.mostrar = true;
              this.hash = resposta.data[0]
            } else if(resposta.data == 'Cadastro já realizado') {
                this.repetida = true;
            }
          })
        }
        else if (!this.$session.exists()) {
            this.$router.push('/')
        }
    },
    directives: {mask},
    data() {
      return {
        fornecedor : {
          razao_social: '',
          nome_fantasia: '',
          cnpj: '',
          inscricao_estadual: '',
          inscricao_municipal: '',
          servico: {
            text: '', value: 0
          },
          tagsString: '',
          contato: '',
          cargo: '',
          telefone1: '',
          telefone2: '',
          telefone3: '',
          email: '',
          redes_sociais: '',
          rua: '',
          bairro: '',
          cidade: '',
          estado: '',
          description: ''
        },
        tags: [],
        tag: '',
        servicos: null,
        timeout: null,
        loading: false,
        mostrar : false,
        hash : null,
        repetida: false,
      }
    },

    methods: {

      cadastrar() {

            let btnCadastrar = document.getElementById('btnCadastro')
            btnCadastrar.innerHTML = 'Cadastrando...'
            btnCadastrar.disabled = true

          if(!this.$route.params.hash) {
            let fornecedor = {
              razao_social: this.fornecedor.razao_social,
              nome_fantasia: this.fornecedor.nome_fantasia,
              cnpj: this.fornecedor.cnpj,
              inscricao_estadual: this.fornecedor.inscricao_estadual,
              inscricao_municipal: this.fornecedor.inscricao_municipal,
              servico_id: this.fornecedor.servico.value,
              tags: this.fornecedor.tagsString.toLowerCase(),
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
              description: this.fornecedor.description,
              cep: null,
              avalicao_preco: 0,
              avalicao_servico: 0
            }

            let resposta = fornecedores.cadastrar(fornecedor).then(resposta => {
              if(resposta.statusText === "Created"){
                this.$router.push('/cadastro-sucesso')
              }
            })
          } else {
              if(this.hash.cadastrado == 0) {
                let fornecedor = {
                  razao_social: this.fornecedor.razao_social,
                  nome_fantasia: this.fornecedor.nome_fantasia,
                  cnpj: this.fornecedor.cnpj,
                  inscricao_estadual: this.fornecedor.inscricao_estadual,
                  inscricao_municipal: this.fornecedor.inscricao_municipal,
                  servico_id: this.fornecedor.servico.value,
                  tags: this.fornecedor.tagsString.toLowerCase(),
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
                  description: this.fornecedor.description,
                  cep: null,
                  avalicao_preco: 0,
                  avalicao_servico: 0
                }

                fornecedores.cadastrar(fornecedor).then(resposta => {
                  if(resposta.statusText === "Created"){
                    hash.atualizarHash(this.hash.id).then(resposta2 => {
                      if(resposta2.data.id == this.hash.id){
                        this.$router.push('/$2y$12$fD.azHOEOBI6EMTRW92oxO30Bv8l2Ua4NzBRmtBSkWe8i/')
                      }
                    })
                  }
                })
              }
            }
      },

      listarServicos() {
        clearTimeout(this.timeout);
        var vm = this;
        var divServicos = document.getElementById('servicosPesquisa')
        this.timeout = setTimeout(function() {
          vm.loading = true;
          let res = servicos.listar(vm.fornecedor.servico.text).then(res => {
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
        this.fornecedor.servico.text = servico.name
        this.fornecedor.servico.value = servico.id
        divServicos.classList.remove('servicosPesquisa--show')
      },

      verificar() {
          this.tags.forEach((element, index, array) => {
              if(index != array.length - 1){
              this.fornecedor.tagsString += element.text + ', '
              } else {
                this.fornecedor.tagsString += element.text
              }
          })

          this.$v.fornecedor.$touch();
          this.$v.tags.$touch();
          if(this.$v.fornecedor.$error || this.$v.tags.error) return

          this.cadastrar()
        },
    },

    computed: {
      returnServicos() {
        return this.servicos
      }
    },

    validations: {
        fornecedor: {
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
  }
</script>


<style lang="scss">
@import '~@/scss/variables.scss';
  .form-cadastro {
    position: relative;
    top: -35rem;
    width: 80rem;
    border-top: 1.1rem solid #6C00FF;
    z-index: 5;
    background-color: white;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    overflow-y: hidden;

    @media(max-width: $max-xs) {
      top: -27rem;
      width: 90%;
    }

    &--hide {
      border: 0;
      background: transparent;
      .form-cadastro{
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

        .servicosPesquisa {
          display: none;
          border-radius: .5rem;
          border: 1px solid #E3E3EB;
          width: 80%;
          background-color: white;
          padding: 0rem;
          li {
              width:100%;
              border-bottom: 1px solid #F5F5F5;
              height: 5rem;
            button{
              display: flex;
              justify-content: flex-start;
              width: inherit;
              font-size: 1.3rem;
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

      #servicos {
        margin-bottom: 1.1rem;
      }

      .form-cadastro-servicos {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        margin-bottom: 4.3rem;
        span {
          color: #CECECE;
          font-size: 1.5rem;
          margin-left: .75rem;
        }
      }

      h3 {
        font-size: 1.5rem;
        font-weight: bold;
        color: #35364D;
        margin-bottom: 1.4rem;
      }

      .textarea {
        border: 1px solid #E3E3EB;
        border-radius: .5rem;
        margin-bottom: 4rem;
        width: 93%;
        height: 13.3rem;
        padding: 2rem;

        textarea {
          resize: none;
          border: 0;
          width: inherit;
          height: inherit;
          font-size: 1.5rem;
          color: #35364D;
        }
      }

      button {
        border-radius: 10rem;
        background-color: #FF9630;
        color: white;
        font-size: 2rem;
        display: flex;
        justify-content: center;
        height: 5.5rem;
        width: 25.5rem;
        margin-bottom: 6.4rem;
        border: 1px solid #FF9630;
        cursor: pointer;
        @media(max-width: $max-xs) {
          margin: 0 auto;
        }
      }

      .form__tags {
        margin-top: 2rem;
        margin-bottom: 3rem;
        .vue-tags-input{
          margin-bottom: 1.9rem;
          margin-top: 1.1rem;
          width:100%;
          
          .ti-input {
            border: 1px solid #E3E3EB;
            width: 61.8rem;
            border-radius: .5rem;

            @media(max-width: $max-xs) {
              width: 100%;
            }

            .ti-tag {
              background-color:#F5F5F5;
              border-radius: 10rem;
              font-size: 1.5rem;
              color: #35364D;
              padding: 0 1rem .5rem 1rem;
            }
          }
        }
        .vue-tags-input.invalidTags {
          margin-bottom: 0rem;
          margin-top: 1.1rem;
          width:100%;
          
          .ti-input {
            border: 1px solid #FF514D;
            width: 61.8rem;
            border-radius: .5rem;
            @media(max-width: $max-xs) {
              width: 100%;
            }

            .ti-tag {
              background-color:#F5F5F5;
              border-radius: 10rem;
              font-size: 1.5rem;
              color: #35364D;
              padding: 0 1rem .5rem 1rem;
            }
          }
        }
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

  .div-hash-repetida {
    position: fixed;
    z-index: 20;
    top: 20rem;
    left: auto;
    overflow: hidden;
    width: 100.6rem;
    background-color: transparent;
    @media(max-width: $max-xs) {
      width: 80%;
    }

    &__content {
      display: flex;
      flex-direction: column;
      width: 100%;
      justify-content: center;
      align-items: center;
      border-top: 1rem solid #FF514D;
      background-color: white;
      position: relative;
      box-shadow: -.3rem .7rem .7rem rgba(0, 0, 0, .2);
      margin-left: 1%;
      margin-bottom: 1%;

      img {
        margin-top: 9.1rem;
        @media(max-width: $max-xs) {
          margin-top: 6rem;
          width: 5rem;
        }
      }

      h2 {
          font-size: 3rem;
          color: #253044;
          font-weight: 900;
          margin-bottom: 2rem;
          margin-top: 1rem;
          @media(max-width: $max-xs) {
            margin-top: 3rem;
          }
      }

      h3 {
          font-size: 1.8rem;
          color: #253044;
          font-weight: 400;
          margin-bottom: 9.1rem;
          @media(max-width: $max-xs) {
            text-align: center;
          }

          strong {
            font-weight: 700;
          }
      }
    }
  }
</style>
