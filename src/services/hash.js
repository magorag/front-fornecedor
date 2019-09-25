import {http}  from "./config";

export default {
    cadastrarHash: ()=> {
        return http.post(`cadastro`)
    },

    getHash: (hash) => {
        return http.get(`cadastro/${hash}`)
    },
    atualizarHash: (id) => {
        const updated = {
            cadastrado: 1
        }

        let config = {
            headers : {
                'Content-Type': 'application/x-www-form-urlencoded',
                'X-Requested-With' : 'XMLHttpRequest'
            },
            params: updated
        }

        return http.put(`cadastro/${id}`, {}, config)
    }
}