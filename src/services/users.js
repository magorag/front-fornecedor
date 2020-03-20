import {http}  from "./config";

export default {
    login: (usuario)=> {
        return http.post('auth/login', usuario)
    },
    userLogged: (token) => {
        const headers = {
            'Authorization': 'Bearer '+ token
        };
        return http.get('auth/user', {headers})
    }
}