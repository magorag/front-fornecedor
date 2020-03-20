import {http}  from "./config";

export default {
    register: (json) => {
        return http.post('auth/signup', json)
    },
}
