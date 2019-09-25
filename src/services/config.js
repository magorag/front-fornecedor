import axios from 'axios'

export const http = axios.create({
    baseURL: 'https://dinamicafornecedores.herokuapp.com/api/'
})
