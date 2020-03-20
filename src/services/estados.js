import {http}  from "./config";

export default {
    listar: (parametro)=> {
        return http.get(`estados?name=${parametro}`)
    },
    listarTodos: () => {
        return http.get('estados')
    }
}