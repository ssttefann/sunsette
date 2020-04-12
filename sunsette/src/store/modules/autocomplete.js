import Vue from "vue";

const state = {
  entries: []
};

const mutations = {
  addEntry(state, newEntry) {
    state.entries.push(newEntry);
  },

  deleteEntry(state, name) {
    state.entries = state.cities.filter(city => city.name !== name);
  },

  setEntries(state, entries) {
    state.entries = entries;
  },

  emptyEntriesArray(state) {
    state.entries = [];
  }
};

const actions = {

  async search({ commit }, data) {
    if (!data) return;

    let url = `https://api.teleport.org/api/cities/?search=${data}&limit=10`;
    let { data } = await Vue.$axios.get(url);
    let cities = data._embedded["city:search-results"];
    let new_entries = cities.map(city => {
      city = city.matching_full_name.replace(/\([^}]*\)/, "");
      city = city.replace(/,.*,/, ",");
      return city;
    });
    await commit("")
    this.entries.push(...new_entries);
  },
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
