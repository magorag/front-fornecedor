import {http}  from "./config";

export default {
    listar: ()=>{
        return http.get('user')
    },

    listarUsuario: (id) => {
        return http.get(`user/${id}`)
    },

    usuariosUpdated: (id, usuario) => {
        const updated = {
                name: usuario.name,
                email: usuario.email,
                password: usuario.password,
                password_confirmation: usuario.password_confirmation,
        }
        let config = {
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'no-cache, private'
            },
            params: updated
        }
        return http.put(`updateuser/${id}`, {}, config);
    },

    deleteUser: (id) => {
        const headers = {
            'Content-Type': 'application/x-www-form-urlencoded',
            'X-Requested-With': 'XMLHttpRequest'
        };
        return http.delete(`deleteuser/${id}`, null, {headers})
    }
}