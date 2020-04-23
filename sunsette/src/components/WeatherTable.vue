<template>
  <v-data-table
    :headers="headers"
    :items="items"
    hide-default-footer
    class="elevation-1 grayish crud-rounded"
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
        { text: 'City', align: 'center', value: 'name' },
        { text: 'Weather', align: 'center', value: 'weather' },
        { text: 'Temperature', align: 'center', value: 'current' },
        { text: 'Min Temperature', align: 'center', value: 'temp_min' },
        { text: 'Max Temperature', align: 'center', value: 'temp_max' },
        { text: 'Air Pressure', align: 'center', value: 'pressure' },
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
          weather: city.current.weather[0].main,
          current: city.current.temp,
          temp_min: city.current.temp_min,
          temp_max: city.current.temp_max,
          pressure: city.current.pressure,
          humidity: city.current.humidity,
          timestamp: new Date(
            city.current.dt * 1000
          ).toLocaleDateString('se'),
        };
      });
    },
    
    /** Hide table if there are no cities selected */
    hide() {
      return this.$store.state.cities.cities.length == 0;
    },
  },

  methods: {
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

.crud-rounded {
  border-radius: 10px !important;
}
</style>