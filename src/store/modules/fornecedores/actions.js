import axios from '../../../services/axios'

const read = async ({ commit }, { params } = {}) => {

  let { data: res } = await axios({
    method: 'get',
    url: 'api/fornecedores',
    params,
  })

  commit('READ', res.data.map(item => item.attributes))
}

export default {
  read,
}