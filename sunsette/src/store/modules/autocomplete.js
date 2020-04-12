import Vue from "vue";

const state = {
  entries: []
};

const mutations = {
  addEntries(state, newEntries) {
    state.entries.push(...newEntries);
  },

  deleteEntry(state, name) {
    state.entries = state.cities.filter(city => city.name !== name);
  },

  setEntries(state, entries) {
    state.entries = entries;
  },

  deleteUnused(state, names) {
    state.entries = state.entries.filter(entry => names.includes(entry));
  }
};

const actions = {
  async search({ commit }, data) {
    if (!data) return;

    let url = `https://api.teleport.org/api/cities/?search=${data}&limit=10`;
    let resp = await Vue.$axios.get(url);
    let cities = resp.data._embedded["city:search-results"];
    let newEntries = cities.map(city => {
      city = city.matching_full_name.replace(/\([^}]*\)/, "");
      city = city.replace(/,.*,/, ",");
      return city;
    });
    await commit("addEntries", newEntries);
  },

  async deleteUnused({ commit }, names) {
    commit("deleteUnused", names);
  }
};

const getters = {
  getEntries: state => state.entries
};

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions
};
