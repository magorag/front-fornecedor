import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Cadastro from './views/Cadastro.vue'
import CadastroSucesso from './views/CadastroSucesso.vue'
import CadastroSucessoHash from './views/CadastroSucessoHash.vue'
import Busca from './views/Busca.vue'
import NotFound from './views/NotFound.vue'
import Sair from './components/Sair.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/cadastro',
      name: 'cadastro',
      component: Cadastro
    },
    {
      path: '/cadastro/:hash',
      name: 'cadastroHash',
      component: Cadastro
    },
    {
      path: '/cadastro-sucesso',
      name: 'cadastro-sucesso',
      component: CadastroSucesso
    },
    {
      path: '/$2y$12$fD.azHOEOBI6EMTRW92oxO30Bv8l2Ua4NzBRmtBSkWe8i',
      name: 'cadastro-sucesso-hash',
      component: CadastroSucessoHash
    },
    {
      path: '/busca',
      name: 'busca',
      component: Busca
    },
    {
      path: '/404',
      name: 'not-found',
      component: NotFound
    },
    {
      path: '/sair',
      name: 'sair',
      component: Sair
    },
  ]
})
