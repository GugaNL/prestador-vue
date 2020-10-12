export default {
    state: {
        categories: []
    },
    mutations: {
        setCategories(state, payload) {
            state.categories = payload
        }
    }
}