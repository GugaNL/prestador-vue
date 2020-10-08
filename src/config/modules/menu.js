export default {
    state: {
        isMenuVisible: true
    },
    mutations: {
        toggleMenu(state, payload) {
            console.log('toggleMenu!')
            if (payload === undefined) {
                state.isMenuVisible = !state.isMenuVisible
            } else {
                state.isMenuVisible = payload
            }
        }
    }
}