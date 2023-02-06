import { createStore } from 'vuex'
import users from './modules/users'

export default createStore({
  state: {
    tokens: {
      token: '',
      refresh_token: '',
      timeToUpdateToken: 0,
    },
    isMobile: false,
    inprogress: true,
  },
  actions: {
    setTokens({commit}, tokens){
      if(!tokens) tokens = {token:'', refresh_token: '', timeToUpdateToken: 0}
      commit('updateToken', tokens.token)
      commit('updateRefreshToken', tokens.refresh_token)
      commit('updateTimeToUpdateToken', tokens.timeToUpdateToken)
    },
    setToken({commit}, token){
      commit('updateToken',token)
    },
    setRefreshToken({commit}, refreshToken){
      commit('updateRefreshToken',refreshToken)
    },
    setTokenTimeLeft({commit}, timeLeft){
      commit('updateTimeToUpdateToken',timeLeft)
    }
  },
  mutations: {
    setInprogress(state, progress){
      state.inprogress = progress
    },
    setIsMobile(state, isMobile){
      state.isMobile = isMobile
    },
    updateToken(state, token){
      state.tokens.token = token
    },
    updateRefreshToken(state, refreshToken){
      localStorage.setItem('refresh-token', refreshToken)
      state.tokens.refresh_token = refreshToken
    },
    updateTimeToUpdateToken(state, timeToUpdateToken){
      state.tokens.timeToUpdateToken = timeToUpdateToken ? (timeToUpdateToken - 100) * 1000 : 800000
    }
  },
  getters: {
    isProgress(state){
      return state.inprogress
    },
    getIsMobile(state){
      return state.isMobile
    },
    getTokens(state){
      return state.tokens
    },
    getToken(state){
      return state.tokens.token
    },
    getRefreshToken(state){
      return state.tokens.refresh_token || localStorage.getItem('refresh-token')
    },
    getTimeToUpdateToken(state){
      return state.tokens.timeToUpdateToken
    }
  },
  modules: {
    users
  }
})
