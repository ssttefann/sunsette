<template>
  <div class="home macfont ma-0 pa-0 mine bback">
    <v-container class="ma-0 pa-0 mine">
      <!-- City Images -->
      <v-row class="pt-2 px-12 mine mx-5" align="center" justify="center">
        <v-col cols="10" sm="12" lg="12">
          <CityImages class="mt-5" />
        </v-col>
      </v-row>

      <!-- Weather Table -->
      <v-row class="pt-12 px-12 mine mx-5" align="center" justify="center">
        <v-col cols="10" sm="12" lg="10">
          <WeatherTable />
        </v-col>
      </v-row>

      <!-- Weather Graph -->
      <div v-if="visible" class="pb-5">
        <v-row class="pt-12 px-12 mine mx-5" align="center" justify="center">
          <v-col cols="10" sm="12" lg="10" justify="center">
            <div>
              <h1 class="my-8 pb-5 white--text">Weather Graph</h1>
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
  width: 100%;
}

.bback {
  background-image: url('https://images.pexels.com/photos/2539460/pexels-photo-2539460.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260');
  height: 100%;
}

.home {
  background-color: #f8f9fb !important;
}
</style>
