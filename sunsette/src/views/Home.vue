<template>
  <div class="home">

    <div>
      {{this.$store.state.cities.cities}}
    </div>
    <br><br><br><br><br>
    <br><br><br><br><br>
    <br><br><br><br><br>
    <br><br><br><br><br>
    <br><br><br><br><br>

  </div>
  
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Home',
  components: {
    
  },

  computed : {
    hide() {
      return this.$store.state.cities.length == 0;
    },
  }
}
</script>
