import {http}  from "./config";

export default {
    listar: (parametro)=> {
        return http.get(`servicos?name=${parametro}`)
    },
    listarTodos: () => {
        return http.get('servicos')
    }
}