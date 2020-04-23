import Vue from 'vue';

const state = {
  cities: [],
  stockImages: [
    require('@/assets/images/stock1.jpg'),
    require('@/assets/images/stock2.jpg'),
    require('@/assets/images/stock3.jpg'),
    require('@/assets/images/stock4.jpg'),
  ],
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
    for (let city of state.cities) {
      if (city.date.getMinutes() != newDate) city.date.setMinutes(newDate);
    }
  },

  setImage(state, newImage) {
    state.cities[state.cities.length - 1].image = newImage;
  },
};

const actions = {
  async addCity({ commit, dispatch }, data) {
    let obj = {
      name: data,
      image: '',
    };

    try {
      await addCurrentWeatherToCity(obj);
      await addDailyForecastToCity(obj);
    } catch (error) {
      console.log(error);
      await commit('deleteCity', data);
      return;
    }

    // await commit('updateDates', new Date().getMinutes());
    await commit('addCity', obj);
    dispatch('addImage', obj);
  },

  async deleteCity({ commit }, data) {
    if (data.length == 0) {
      commit('emptyCitiesArray');
      return;
    }

    let names = state.cities.map(city => city.name);
    for (let name of names) {
      if (!data.includes(name)) {
        commit('deleteCity', name);
        break;
      }
    }
  },

  addImage({ commit }, city) {
    let image;

    // try to find city image in assets
    try {
      image = require(`@/assets/images/${city.name}.jpg`);
    } catch {
      // if it doesn't exist choose random stock image
      image = state.stockImages[~~(Math.random() * state.stockImages.length)];
    } finally {
      commit('setImage', image);
    }
  },
};

const getters = {
  getCities: state => state.cities,
};

/** Adds forecast information for next 48hrs and next 5 days */
async function addDailyForecastToCity(city) {
  let lat = city.coord.lat;
  let lon = city.coord.lon;
  let url = `http://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${Vue.$omwKey}`;

  let { data } = await Vue.$axios.get(url);
  data.daily.map(weather => {
    weather.temp_min = kelvinToCelsius(weather.temp.min);
    weather.temp_max = kelvinToCelsius(weather.temp.max);
    weather.localDate = convertToLocalDate(weather.dt, city.timezone);
    weather.temp = kelvinToCelsius(weather.temp.day);
    weather.icon = getWeatherIcon(weather.weather[0].icon);
  });
  city.daily = data.daily;


  //convert hourly forecast to celsius
  data.hourly.map(weather => {
    weather.temp = kelvinToCelsius(weather.temp);
    weather.localDate = convertToLocalDate(weather.dt, city.timezone);
    weather.icon = getWeatherIcon(weather.weather[0].icon);
  });
  city.today = data.hourly.slice(1, 13);

  let firstNextIdx = 0;
  let firstNextDate = data.hourly[0].localDate.getDate();

  for (let i = 1; i < data.hourly.length; i++) {
    // if (data.hourly[i].localDate.getDate() > firstNextDate){
    if (new Date(data.hourly[i].dt).getDate() > firstNextDate) {
      firstNextIdx = i;
      break;
    }
  }

  // start tomorrow data at 06:00
  firstNextIdx += 6;

  //end at 23:00
  if (firstNextIdx + 17 <= data.hourly.length - 1)
    city.tomorrow = data.hourly.slice(firstNextIdx, firstNextIdx + 18);
  else city.tomorrow = data.hourly.slice(firstNextIdx, data.hourly.length);
}

/** Adds curernt weather information for the city */
async function addCurrentWeatherToCity(city) {
  let name = city.name.split(',')[0];
  let url = `http://api.openweathermap.org/data/2.5/weather?q=${name}&appid=${Vue.$omwKey}`;

  let { data } = await Vue.$axios.get(url);
  city.cityName = name;
  city.coord = data.coord;
  city.current = data.main;
  city.current.wind = data.wind;
  city.current.dt = data.dt;
  city.timezone = data.timezone;
  city.current.weather = data.weather;
  city.current.temp = kelvinToCelsius(data.main.temp);
  city.current.temp_min = kelvinToCelsius(data.main.temp_min);
  city.current.temp_max = kelvinToCelsius(data.main.temp_max);

  let localTime = Date.now() - 2 * 3600 * 1000 + data.timezone * 1000;
  city.date = new Date(localTime);

  if (
    Date.now() > data.sys.sunrise * 1000 &&
    Date.now() < data.sys.sunset * 1000
  ) {
    city.dateIcon = 'twemoji:sun';
  }
  // else it is night time
  else {
    city.dateIcon = 'ic:round-nights-stay';
  }
}

// async function addHistoricWeatherToCity(city) {
//   let lat = city.info.coord.lat;
//   let lon = city.info.coord.lon;
//   let fivedays = Date.now() + 1 * 3600 * 1000;
//   console.log(fivedays)
//   console.log(new Date(fivedays))
//   let url = `http://api.openweathermap.org/data/2.5/onecall/timemachine?lat=${lat}&lon=${lon}&dt=${fivedays}&appid=${Vue.$omwKey}`

//   let { data } = await Vue.$axios.get(url);
//   console.log(data);
// }

/** Converts temperature to celsius */
function kelvinToCelsius(degree) {
  return Math.round(degree - 273.15);
}

/* Converts iso time to local date*/
function convertToLocalDate(dt, timezone) {
  let offset = 3600;
  return new Date(dt * 1000 - 2 * offset * 1000 + timezone * 1000);
}

/** Get Iconify icon for given open weather icon */
function getWeatherIcon(iconId) {
  switch (iconId) {
    case '01d':
      return 'twemoji:sun';
    case '01n':
      return 'ic:round-nights-stay';
    case '02d':
      return 'twemoji-sun-behind-large-cloud';
    case '03d':
    case '04d':
      return 'twemoji-sun-behind-cloud';    
    case '03n':
    case '04n':
      return 'twemoji-cloud';
    case '09d':
    case '10d':
      return 'twemoji-sun-behind-rain-cloud';
    case '09n':
    case '10n':
      return 'twemoji-cloud-with-rain';
    case '11d':
    case '11n':
      return 'twemoji-cloud-with-lightning-and-rain';
    case '13d':
    case '13n':
      return 'twemoji-cloud-with-snow';
    default:
      return 'twemoji:sun';
  }
}

// function convertToCEST(dt){
//   return new Date(dt * 1000);
// }

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions,
};
