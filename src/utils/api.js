import axios from 'axios'

const instance = axios.create({
    baseURL: `http://fornecedoresdinamica.local/api/`,
    headers: {
        Authorization: `Bearer ${ localStorage.getItem('token') }`
    }
})

export default instance
