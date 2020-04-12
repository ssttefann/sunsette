import Vue from "vue";

const state = {
  cities: [],
  stockImages: [
    require("@/assets/images/stock1.jpg"),
    require("@/assets/images/stock2.jpg"),
    require("@/assets/images/stock3.jpg"),
    require("@/assets/images/stock4.jpg")
  ]
};

const mutations = {
  addCity(state, newCity) {
    state.cities.push(newCity);
  },

  deleteCity(state, name) {
    state.cities = state.cities.filter(city => city.name !== name);
  },

  emptyCitiesArray(state) {
    state.cities = [];
  },

  updateDates(state, newDate) {
    for (let city of state.cities){
      if (city.date.getMinutes() != newDate)
        city.date.setMinutes(newDate);
    }
  },

  setImage(state, newImage) {
    state.cities[state.cities.length - 1].image = newImage;
  }
};

const actions = {
  async addCity({ commit, dispatch }, data) {
    let obj = {
      name: data,
      image: ""
    };

    let name = data.split(",")[0];
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${name}&appid=${Vue.$omwKey}`;

    try {
      let { data } = await Vue.$axios.get(url);
      obj.currWeatherData = data;
      let localTime = Date.now() - 2 * 3600 * 1000 + data.timezone * 1000;
      obj.date = new Date(localTime);

      // if after sunrise and before sunset
      // it means that its daytime
      if (Date.now() > data.sys.sunrise * 1000 && Date.now() < data.sys.sunset * 1000){
        obj.dateIcon = "twemoji:sun";
      }
      // else it is night time
      else{
        obj.dateIcon = "ic:round-nights-stay";
      }
    } catch (error) {
      console.log(error);
      alert(error.response.data);
      await commit("deleteCity", data);
      return;
    }

    await commit("updateDates", new Date().getMinutes());
    await commit("addCity", obj);
    dispatch("addImage");
  },

  async deleteCity({ commit }, data) {
    if (data.length == 0) {
      commit("emptyCitiesArray");
      return;
    }

    let names = state.cities.map(city => city.name);
    for (let name of names) {
      if (!data.includes(name)) {
        commit("deleteCity", name);
        break;
      }
    }
  },

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
