import qs from 'qs'
import axios from 'axios'

export default axios.create({
    baseURL: 'https://dinamicafornecedores.herokuapp.com/api/',
    paramsSerializer: params => qs.stringify(params),
    headers: {
        Authorization: `Bearer ${ localStorage.getItem('token') }`
    }
})
