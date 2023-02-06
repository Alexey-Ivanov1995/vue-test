
export default {
    state: {
        userId:'',
    },
    actions: {
        setUserId({commit}, userId){
            commit('setUserId', userId)
        }
    },
    mutations: {
        setUserId(state, userId){
            localStorage.setItem('userId', userId)
            state.userId = userId
        }
    },
    getters: {
        getUserId(state){
            return state.userId || localStorage.getItem('userId') || ''
        }
    }
}
