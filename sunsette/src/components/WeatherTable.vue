<template>
  <v-data-table
    :headers="headers"
    :items="items"
    hide-default-footer
    class="elevation-1"
    :hidden="hide"
  ></v-data-table>
</template>

<script>
export default {
  name: 'WeatherTable',
  components: {},

  data() {
    return {
      headers: [
        { text: 'Name', align: 'center', value: 'name' },
        { text: 'Weather', align: 'center', value: 'weather' },
        { text: 'Temperature', align: 'center', value: 'current' },
        { text: 'Min temperature', align: 'center', value: 'temp_min' },
        { text: 'Max temperature', align: 'center', value: 'temp_max' },
        { text: 'Air pressure', align: 'center', value: 'pressure' },
        { text: 'Humidity', align: 'center', value: 'humidity' },
        { text: 'Timestamp', align: 'center', value: 'timestamp' },
      ],
    };
  },

  computed: {
    items() {
      return this.$store.state.cities.cities.map(city => {
        return {
          name: city.name,
          date: city.date,
          weather: city.currWeatherData.weather[0].main,
          current: city.currWeatherData.main.temp,
          temp_min: city.currWeatherData.main.temp_min,
          temp_max: city.currWeatherData.main.temp_max,
          pressure: city.currWeatherData.main.pressure,
          humidity: city.currWeatherData.main.humidity,
          timestamp: new Date(
            city.currWeatherData.dt * 1000
          ).toLocaleDateString('se'),
        };
      });
    },
    hide() {
      return this.$store.state.cities.cities.length == 0;
    },
  },

  methods: {
    convert(value) {
      return value;
    },
  },

  watch: {},
};
</script>

<style>
.mine {
  /* background-color:#a1b9ec !important; */
  max-width: 100%;
}

tr {
  /* background-color: #a1b9ec; */
}
</style>
