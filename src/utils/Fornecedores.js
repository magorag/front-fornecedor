// import User from '@/utils/User'
// import api from '@/utils/api'
// import qs from 'qs'
//
// export default class Fornecedores extends User {
//
//     constructor(fornecedor = {}) {
//         super(fornecedor)
//         this.fornecedor = fornecedor
//     }
//     mostrar() {
//         return api.get(`fornecedores`, { data: { attributes: this.fornecedor }})
//     }
//
//     save() {
//         return api.post(`fornecedores`, { data: { attributes: this.fornecedor }})
//     }
//
//     edit() {
//         return api.put(`fornecedores/${this.fornecedor.id}`, { data: { attributes: this.fornecedor }})
//     }
//
//     static all(args = {}) {
//         return api.get(`fornecedores?${ qs.stringify(args) }`)
//     }
//
// }
