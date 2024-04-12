// store/modules/auth.js

const state = {
    user: null, // Initial state for user data
    isAuthenticated: false // Initial authentication state
  };
  
  const getters = {
    getUser: state => state.user,
    isAuthenticated: state => state.isAuthenticated
  };
  
  const actions = {
    loginUser({ commit }, userData) {
      // Implement login logic here (make API call, etc.)
      // After successful login, commit user data and set isAuthenticated to true
      commit('setUser', userData);
      commit('setAuthentication', true);
    },
    logoutUser({ commit }) {
      // Implement logout logic here (clear user data, etc.)
      // After successful logout, commit null user data and set isAuthenticated to false
      commit('setUser', null);
      commit('setAuthentication', false);
    }
  };
  
  const mutations = {
    setUser(state, userData) {
      state.user = userData;
    },
    setAuthentication(state, isAuthenticated) {
      state.isAuthenticated = isAuthenticated;
    }
  };
  
  export default {
    state,
    getters,
    actions,
    mutations
  };
  