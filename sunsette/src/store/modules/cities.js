const state = {
  cities: [],
  stockImages: [
    "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/S%C3%A3o_Paulo_city_%28Bela_Vista%29.jpg/500px-S%C3%A3o_Paulo_city_%28Bela_Vista%29.jpg",
    "https://jooinn.com/images/urban-area-5.jpg",
    "https://www.un.org/en/development/desa/population/images/themes/urbanization.jpg",
    "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80"
  ]
};

const mutations = {

  addCity(state, newCity) {
    // should list all attributes 
    // so that reactive properties work
    let obj = {
      name: newCity,
      image : ""
    };
    state.cities.push(obj);
  },

  setImage(state, newImage) {
    state.cities[state.cities.length - 1].image = newImage;
  }
};

const actions = {
  async addCity({ commit, dispatch }, data) {
    // 
    await commit("addCity", data);
    dispatch("addImage")

  },

  // async delteCity({commit}, data) {
  //   let names = state.cities.map(city => city.city)
  // },

  addImage({ commit }) {
    // if there is no image of city choose random one
    let newImage =
      state.stockImages[~~(Math.random() * state.stockImages.length)];
    commit("setImage", newImage);
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
