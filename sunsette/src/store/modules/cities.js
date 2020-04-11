const state = {
  cities: []
};

const mutations = {
  setCities(state, newCities) {
    state.cities = newCities;
  }
};

const actions = {

  addCities({commit}, data) {
    commit('setCities', data);
  }
};

const getters = {
  getCities: state => state.cities
};

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions
};
