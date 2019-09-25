import {http}  from "./config";

export default {
    listar: ()=>{
        return http.get('fornecedor')
    },
    cadastrar: (json) => {
        return http.post('fornecedor', json)
    },
    atualizarRating: (id, rating) => {
        const headers = {
            'Content-Type': 'application/x-www-form-urlencoded',
            'X-Requested-With' : 'XMLHttpRequest'
        };
        return http.put(`fornecedor/${id}?avalicao_servico=${rating}`, null ,{headers})
    },
    atualizarRatingPreco: (id, rating) => {
        const headers = {
            'Content-Type': 'application/x-www-form-urlencoded',
            'X-Requested-With' : 'XMLHttpRequest'
        };
        return http.put(`fornecedor/${id}?avalicao_preco=${rating}`, null ,{headers})
    },
    atualizarFornecedor: (id, fornecedor) => {
        const headers = {
            'Content-Type': 'application/x-www-form-urlencoded',
            'X-Requested-With' : 'XMLHttpRequest'
        };

        const updated = {
            razao_social: fornecedor.razao_social,
            nome_fantasia: fornecedor.nome_fantasia,
            cnpj: fornecedor.cnpj,
            inscricao_estadual: fornecedor.inscricao_estadual,
            inscricao_municipal: fornecedor.inscricao_municipal,
            servico_id: fornecedor.servico.value,
            tags: fornecedor.tagsString.toLowerCase(),
            contato: fornecedor.contato,
            cargo: fornecedor.cargo,
            telefone1: fornecedor.telefone1,
            telefone2: fornecedor.telefone2,
            telefone3: fornecedor.telefone3,
            email: fornecedor.email,
            redes_sociais: fornecedor.redes_sociais,
            rua: fornecedor.rua,
            bairro: fornecedor.bairro,
            cidade: fornecedor.cidade,
            estado: fornecedor.estado,
            description: fornecedor.description
        }

        let config = {
            headers : {
                'Content-Type': 'application/x-www-form-urlencoded',
                'X-Requested-With' : 'XMLHttpRequest'
            },
            params: updated
        }

        return http.put(`fornecedor/${id}`, {}, config)
    },

    removeFornecedor: (id) => {
        const headers = {
            'Content-Type': 'application/x-www-form-urlencoded',
            'X-Requested-With' : 'XMLHttpRequest'
        };
        return http.delete(`fornecedor/${id}`, null ,{headers})
    },
}