import Vue from 'vue'
import Router from 'vue-router'
import store from './store';
import Teste from './views/Testes'
import Login from './views/Home.vue'
import Cadastro from './views/Cadastro.vue'
import CadastroSucesso from './views/CadastroSucesso.vue'
import CadastroSucessoHash from './views/CadastroSucessoHash.vue'
import Busca from './views/Busca.vue'
import NotFound from './views/NotFound.vue'
import Sair from './components/Sair.vue'
import Registrar from "./views/Registrar";
import Usuarios from "./views/Usuarios";
import BuscaAdm from "./views/BuscaAdm";
import UpdateUser from "./views/UpdateUser";


Vue.use(Router)

let router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior(to, from) {
    if(from.name === 'login')
      return {x:0, y:0}
  },
  routes: [
    {
      path: '/teste',
      name: 'teste',
      meta: { needAuth: false },
      component: Teste
    },
    {
      path: '/',
      name: 'login',
      meta: { needAuth: false },
      component: Login
    },
    {
      path: '/cadastro',
      name: 'cadastro',
      meta: { needAuth: true },
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
      meta: { needAuth: true },
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
      meta: { needAuth: true },
      component: Busca
    },
    {
      path: '/buscaadm',
      name: 'buscaadm',
      meta: { needAuth: true},
      component: BuscaAdm
    },
    {
      path: '/registrar',
      name: 'registrar',
      meta: { needAuth: true},
      component: Registrar
    },
    {
      path: '/editarusuario/:id',
      name: 'editarusuarioId',
      meta: { needAuth: true},
      component: UpdateUser
    },
    {
      path: '/usuarios',
      name: 'usuarios',
      meta: { needAuth: true },
      component: Usuarios
    },
    {
      path: '/404',
      name: 'not-found',
      meta: { needAuth: false },
      component: NotFound
    },
    {
      path: '/sair',
      name: 'sair',
      component: Sair,
      beforeEnter: (to, from, next) => {
        store.dispatch('auth/logout')
        next({ name: 'login' })
      }
    },
    {
      path: '*',
      name: '404',
      component: NotFound
    },
  ]
})
router.beforeResolve((to, from, next) => {

  let token = localStorage.getItem('token')

  if (to.name == 'buscaadm') {
    next()
  }

  if (to.meta.needAuth) {
    if (token) {
      if(store.state.auth.credencial.admin) {
        next({ name: 'buscaadm' })
      } else {
        next()
      }
    } else {
      next({ name: 'login' })
    }
  } else {
    if (token) {
      // next({ name: 'dashboard' })
      if(store.state.auth.credencial.admin) {
        next({ name: 'buscaadm'})
      } else {
        next({ name: 'busca' })
      }

    } else {
      next()
    }
  }
})

export default router
