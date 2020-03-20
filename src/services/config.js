import qs from 'qs'
import axios from 'axios'

export const http = axios.create({
    baseURL: 'https://dinamicafornecedores.herokuapp.com/api/',
    paramsSerializer: params => qs.stringify(params),
    headers: {
        Authorization: `Bearer ${ localStorage.getItem('token') }`
    }
})

export const http1 = axios.create({
    baseURL: 'https://dinamicafornecedores.herokuapp.com/api/'
})