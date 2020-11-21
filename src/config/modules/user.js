export default {
    state: {
        user: {}
    },
    mutations: {
        setUser(state, payload) {
            state.user = payload
            /*if (user) {
                this.context.rootState.menu.isMenuVisible = true
            } else {
                this.context.rootState.menu.isMenuVisible = false
            }*/
        }
    },
    getters: {
        user: state => state.user
    }
    /*actions: {
        myAction: ({ commit, rootState }) => {
            console.log('commit: ', commit)
            console.log(rootState.menu)
        }
    }*/
}