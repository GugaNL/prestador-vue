export default {
    state: {
        isMenuVisible: false
    },
    mutations: {
        toggleMenu(state, payload) {
            console.log('Entrou no mutation toggleMenu: ', payload)
            /*if (!this.context.rootState.user) { //Caso nao tenha usuário ele já seta como false e faz o return, evitando executar o resto do codigo abaixo
                state.isMenuVisible = false
                return
            }*/
            //console.log('toggleMenu!')
            if (payload === undefined) {
                state.isMenuVisible = !state.isMenuVisible
            } else {
                state.isMenuVisible = payload
            }
        }
    },
    getters: {
        isMenuVisible: state => state.isMenuVisible
    }
}