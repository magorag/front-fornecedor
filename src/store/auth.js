/* eslint-disable promise/param-names */
import axios from 'axios'

const getters = {
    isAuthenticated: state => !!state.token,
    authStatus: state => state.status
};

export default {
    namespaced: true,
    state: {
        credencial: {},
        token: ''
    },
    actions: {
        async login({commit, dispatch}, payload) {
            try {
                let {data: {access_token}} = await axios({
                    method: 'post',
                    url: `https://dinamicafornecedores.herokuapp.com/oauth/token`,
                    data: {
                        grant_type: 'password',
                        client_id: 2,
                        client_secret: 'xkSNnAsGWqQMh3FcYUpSeA5Cd4J7rnbrE0MeVjeL',
                        username: payload.email,
                        password: payload.password,
                        scope: '*',
                    }
                })
                localStorage.setItem('token', access_token)
                commit('token', access_token)
                await dispatch('current')
            } catch (e) {
                throw e
            }
        },
        async current({commit, state}) {
            try {
                let {data: res} = await axios({
                    method: 'get',
                    url: `https://dinamicafornecedores.herokuapp.com/api/auth/user`,
                    headers: {
                        Accept: 'application/json',
                        Authorization: `Bearer ${state.token}`
                    }
                })
                commit('credencial', res)
            } catch (err) {
                throw err
            }
        },
        async check({commit, dispatch}) {
            try {
                let token = localStorage.getItem('token')

                if (token) {
                    commit('token', token)
                    await dispatch('current')
                }
            } catch (error) {
                localStorage.clear()
            }
        },
        logout({commit}) {
            localStorage.clear()
            commit('token', '')
            commit('credencial', {})
        }
    },
    mutations: {
        token(state, payload) {
            state.token = payload
        },
        credencial(state, payload) {
            state.credencial = payload
        },
        updateCredencial(state, credencial) {
            state.credencial = {
                ...state.credencial,
                ...credencial
            }
        },
    },
}
