const red = state => state.itens.filter(item => item.status == 'red')

const yellow = state => state.itens.filter(item => item.status == 'yellow')

const green = state => state.itens.filter(item => item.status == 'green')

export default {
    red,
    yellow,
    green,
}
