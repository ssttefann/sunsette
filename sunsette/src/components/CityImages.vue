<template>
  <v-container>
    <v-row class="mx-12 px-12" align="center" justify="center">
      <template v-for="city in cities">
        <v-col cols="6" lg="3" class="" v-bind:key="city.name">
          <v-card hover class="rounded-card">
            <v-img height="200px" :src="city.image" class="align-end">
              <v-row align="end" justify="end">
                <v-card primary class="px-6 py-2 rounded-card" hover>
                  <v-card-text class="pa-0">
                    {{city.date.getHours() + ":" + city.date.getMinutes()}}
                    <!-- {{ time(city) }} -->
                    <span
                      class="iconify"
                      :data-icon="city.dateIcon"
                      data-inline="false"
                    ></span>
                  </v-card-text>
                </v-card>
              </v-row>
            </v-img>
          </v-card>
          <div class="text-center mt-4">
            {{ city.name }}
          </div>
        </v-col>
      </template>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "CityImages",
  components: {},

  data() {
    return {
    };
  },

  computed: {
    cities: {
      get() {
        return this.$store.state.cities.cities;
      }
    },
    time: function(city) {
      console.log(city);
      return city.date.getHours() + ":" + city.date.getMinutes();
    }
  },

  watch: {}
};
</script>

<style>
.rounded-card {
  border-radius: 10px !important;
  max-width: 350px !important;
}

.iconify {
  padding-bottom: 2px;
  margin-left: 5px;
  width: 20px;
  height: 20px;
}
</style>
