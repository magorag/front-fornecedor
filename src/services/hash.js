import {http1}  from "./config";

export default {
    cadastrarHash: ()=> {
        return http1.post(`cadastro`)
    },

    getHash: (hash) => {
         return http1.get(`cadastro/${hash}`)
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

        return http1.put(`cadastro/${id}`, {}, config)
    }
}