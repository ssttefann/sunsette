<template>
  <div class="home macfont">
    <v-container>

      <!-- City Images -->
      <!-- <CityImages class="mt-5" /> -->
      <v-row class="pt-8 px-12 mine" align="center" justify="center">
        <v-col cols="10" sm="12" lg="12">
          <CityImages class="mt-5" />
        </v-col>
      </v-row>

      <!-- Weather Table -->
      <v-row class="pt-12 px-12 mine" align="center" justify="center">
        <v-col cols="10" sm="12" lg="10">
          <WeatherTable />
        </v-col>
      </v-row>

      <!-- Weather Graph -->
      <div v-if="visible">
        <v-row class="pt-12 px-12 mine" align="center" justify="center">
          <v-col cols="10" sm="12" lg="10" justify="center">
            <div>
              <h1 class="my-8 pb-5">Weather Forecast</h1>
            </div>
            <ChartComponent />
          </v-col>
        </v-row>
      </div>
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
    visible() {
      return this.$store.state.cities.cities.length > 0;
    },
  },
};
</script>

<style>
.mine {
  /* background-color:#a1b9ec !important; */
  max-width: 100%;
}

.home {
  background-color: #f8f9fb !important;
}
</style>
