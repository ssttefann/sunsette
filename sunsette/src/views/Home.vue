<template>
  <div class="home">
    <v-container>
      <CityImages class="mt-5" />
      <!-- <v-container class="pt-12 px-12 mine"> -->
      <v-row class="pt-12 px-12 mine" align="center" justify="center">
        <v-col cols="10">
          <WeatherTable />
        </v-col>
      </v-row>

      <v-row class="pt-12 px-12 mine" align="center" justify="center">
        <v-col cols="10" justify="center">
          <ChartComponent />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
// @ is an alias to /src
import CityImages from './../components/CityImages';
import WeatherTable from './../components/WeatherTable';
import ChartComponent from './../components/ChartComponent';

export default {
  name: 'Home',
  components: {
    CityImages,
    WeatherTable,
    ChartComponent,
  },

  computed: {
    hide() {
      return this.$store.state.cities.length == 0;
    },
  },
};
</script>

<style>
.mine {
  /* background-color:#a1b9ec !important; */
  max-width: 100%;
}
</style>
