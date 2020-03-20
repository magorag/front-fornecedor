import {http, http1} from "./config";

export default {
    listar: () => {
        return http.get('fornecedores')
    },
    cadastrar: (json) => {
        const headers = {
            Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIyIiwianRpIjoiY2ZlYTEzYjdmOWI0ZTkxMGU5MjgxNWM5YjU3YThmZjZjMmRkMDhmMjk0ZjhiMzlmMTk2ZWRiZTczNjNlNzFlYjVjODhjYzg0NmU3YmQ5NTMiLCJpYXQiOjE1ODQ1NzMyOTgsIm5iZiI6MTU4NDU3MzI5OCwiZXhwIjoxODk1NjEzMjk4LCJzdWIiOiIxIiwic2NvcGVzIjpbInVzZXIiXX0.LBp2kzjiOuJOO_FkXgCFzwovjNgFP27R1CcE-baLTyDJrgVUGCEkfmAQbc7vlSyPoB6C8XojRXcf22GB782wZshSijgkrs88UdBOJpEEwvneruO7zCsqxmcaNFDB0YGvP7En-IEn657w1o2vBMZPenjKlTMzKzTLwgpYoGotQ3P9MRRJ1VVic2vM0J4uQB55gR9R1yrzPCX5rhoRXUE5oUgOJree6RHzupo9IejZvWwneRddXUubul5hIUoLyMAVQ5GhXEfsMd3AbgfzzQgtsA1a7ZcFzWEVCSJu-B3dNTHvZbWGPo5yl4BQfY45bXMxvd0ds5S-K-vhMjTJTgm1fTGNpsuYfSbBRw5SPzPjtjxIaIM-ViAc4NyAoek-mYKM6kwaRqVYN_-8tu1EvUWom_c1uQpENAUh_vUyx90Fd4wruN7gAJAFbUBtMsHYIkh8f5bDYLI9CPtS4UnoC0Ei3st6ks7xhWW_XbEmRpqYuKFUk_aCBM-TY4kjPHHkJQQK7--5I-_Cms3pzc2jgAxuBwJECr1HunxjgYQXBt2OR2B538Ktll8gHaQVmL0MEH6FsHgv6c6u6ZiGO_tXliPm0y9XoO4fBeCpuBdfqTemYPHaMUBmYLfQrG6ug7KZHAogcRQRl4LIVX7C-jXSsgUoBKR3Lp9Yd0UflO8SkHYl9l0`
        };
        return http1.post('fornecedores', json, {headers})
    },
    atualizarRating: (id, rating) => {
        const headers = {
            'Content-Type': 'application/x-www-form-urlencoded',
            'X-Requested-With': 'XMLHttpRequest'
        };
        return http.put(`fornecedores/${id}?avalicao_servico=${rating}`, null, {headers})
    },
    atualizarRatingPreco: (id, rating) => {
        const headers = {
            'Content-Type': 'application/x-www-form-urlencoded',
            'X-Requested-With': 'XMLHttpRequest'
        };
        return http.put(`fornecedores/${id}?avalicao_preco=${rating}`, null, {headers})
    },
    atualizarFornecedor: (id, fornecedor) => {
        const headers = {
            'Content-Type': 'application/x-www-form-urlencoded',
            'X-Requested-With': 'XMLHttpRequest'
        };

        const updated = {
            razao_social: fornecedor.razao_social,
            nome_fantasia: fornecedor.nome_fantasia,
            cnpj: fornecedor.cnpj,
            inscricao_estadual: fornecedor.inscricao_estadual,
            inscricao_municipal: fornecedor.inscricao_municipal,
            servico: fornecedor.servico,
            // tags: fornecedor.tagsString.toLowerCase(),
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
            description: fornecedor.description,
            userupdate: fornecedor.userupdate,
        }
        let config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'X-Requested-With': 'XMLHttpRequest'
            },
            params: updated
        }

        return http.put(`fornecedores/${id}`, {}, config)
    },

    removeFornecedor: (id) => {
        const headers = {
            'Content-Type': 'application/x-www-form-urlencoded',
            'X-Requested-With': 'XMLHttpRequest'
        };
        return http.delete(`fornecedores/${id}`, null, {headers})
    },
}