<template>
  <v-container>
    <v-row class="mx-12 px-12" align="center" justify="center">
      <template v-for="city in cities">
        <v-col cols="6" lg="3" v-bind:key="city.name">
          <v-card hover class="rounded-card">
            <v-img height="200px" :src="city.image" class="align-end">
              <v-row align="end" justify="end">
                <v-card primary class="px-6 py-2 rounded-card" hover>
                  <v-card-text class="pa-0">
                    21:30
                    <span
                      class="iconify"
                      data-icon="twemoji:sun"
                      data-inline="false"
                    ></span>
                    <!-- <span
                      class="iconify"
                      data-icon="ic:round-nights-stay"
                      data-inline="false"
                    ></span> -->
                  </v-card-text>
                </v-card>
              </v-row>
            </v-img>
          </v-card>
          <div class="text-center mt-4">
            {{city.name}}
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
      stockImages: [
        "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/S%C3%A3o_Paulo_city_%28Bela_Vista%29.jpg/500px-S%C3%A3o_Paulo_city_%28Bela_Vista%29.jpg",
        "https://jooinn.com/images/urban-area-5.jpg",
        "https://www.un.org/en/development/desa/population/images/themes/urbanization.jpg",
        "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80"
      ]
    };
  },

  computed: {
    cities: {
      get() {
        return this.$store.state.cities.cities;
      }
    }
  }
};
</script>

<style>
.rounded-card {
  border-radius: 10px !important;
}

.iconify {
  padding-bottom: 2px;
  margin-left: 5px;
  width: 20px;
  height: 20px;
}
</style>
