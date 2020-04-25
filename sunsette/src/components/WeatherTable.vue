<template>
  <div>
    <v-data-table
      :headers="getHeaders"
      :items="items"
      hide-default-footer
      class="elevation-1 grayish crud-rounded"
      :hidden="hide"
      @click:row="openDialog"
    >
      <template v-slot:top>
        <v-toolbar flat class="crud-rounded">
          <v-toolbar-title>Weather Information</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-select
            v-model="selectedOption"
            :items="intervalOptions"
            hide-details
            single-line
            solo
            dense
            class="unitSelection"
          >
          </v-select>
        </v-toolbar> </template
    ></v-data-table>
    <v-dialog v-model="dialog" max-width="430">
      <Dialog v-bind:city="dialogCity" />
    </v-dialog>
  </div>
</template>

<script>
import Dialog from './Dialog';
import { mapGetters } from 'vuex';

export default {
  name: 'WeatherTable',
  components: { Dialog },

  data() {
    return {
      headers: [
        { text: 'City', align: 'center', value: 'name' },
        { text: 'Temperature', align: 'center', value: 'current' },
        { text: 'Min Temperature', align: 'center', value: 'temp_min' },
        { text: 'Max Temperature', align: 'center', value: 'temp_max' },
        { text: 'Air Pressure', align: 'center', value: 'pressure' },
        { text: 'Humidity', align: 'center', value: 'humidity' },
        { text: 'Visibility', align: 'center', value: 'visibility' },
        { text: 'Timestamp', align: 'center', value: 'timestamp' },
      ],
      dialog: false,
      selectedCity: null,
      intervalOptions: [
        { text: 'Today' },
        { text: 'Tomorrow' },
        { text: 'Next week' },
      ],
      selectedOption: 'Today',
    };
  },

  computed: {
    ...mapGetters({
      getSnackBar: 'snackbar/getSnackBar',
      getCities: 'cities/getCities',
    }),
    items() {
      let property = 'today';
      if (this.selectedOption == 'Tomorrow') property = 'tomorrow';
      else if (this.selectedOption == 'Next week') property = 'daily';

      return this.$store.state.cities.cities.map(city => {
        return {
          name: city.name,
          date: city.date,
          current: city[property][0].temp,
          temp_min: Math.min(...city[property].map(weather => weather.temp)),
          temp_max: Math.max(...city[property].map(weather => weather.temp)),
          pressure: city[property][0].pressure,
          humidity: city[property][0].humidity,
          visibility: city.current.visibility,
          timestamp: this.getLocalTimestamp(city.current.dt, city.timezone),
        };
      });
    },

    /** Return city which was clicked  */
    dialogCity() {
      return this.$store.state.cities.cities.find(
        city => city.name == this.selectedCity
      );
    },

    /** Hide table if there are no cities selected */
    hide() {
      return this.$store.state.cities.cities.length == 0;
    },

    /** Return headers based on the current selected table view */
    getHeaders() {
      if (this.selectedOption != 'Today')
        return this.headers.filter(
          header => !['Timestamp', 'Temperature', 'Visibility'].includes(header.text)
        );

      return this.headers;
    },
  },

  methods: {
    openDialog(city) {
      this.selectedCity = city.name;
      this.dialog = true;
    },

    getLocalTimestamp(dt, timezone) {
      let offset = 3600;
      let date = new Date(dt * 1000 - 2 * offset * 1000 + timezone * 1000);
      return date.getDate() + "." + (date.getMonth() + 1)  + " " + date.getHours() + ":" + date.getMinutes();
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

tr {
  cursor: pointer;
}

.crud-rounded {
  border-radius: 10px !important;
}
</style>
