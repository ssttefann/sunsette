<template>
  <div class="home">

    <CityImages class="mt-5"/>
    <WeatherTable/>

    <br><br><br><br><br>
    <br><br><br><br><br>
    <br><br><br><br><br>
    <br><br><br><br><br>
    <br><br><br><br><br>

  </div>
  
</template>

<script>
// @ is an alias to /src
import CityImages from './../components/CityImages'
import WeatherTable from './../components/WeatherTable'

export default {
  name: 'Home',
  components: {
    CityImages,
    WeatherTable,
  },

  computed : {
    hide() {
      return this.$store.state.cities.length == 0;
    },
  }
}
</script>
