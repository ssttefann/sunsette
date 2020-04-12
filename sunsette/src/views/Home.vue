<template>
  <div class="home">

    <CityImages/>

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

export default {
  name: 'Home',
  components: {
    CityImages
  },

  computed : {
    hide() {
      return this.$store.state.cities.length == 0;
    },
  }
}
</script>
