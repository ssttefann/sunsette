// :href="`https:/www.google.com/search?q=${city.name}`" // target="_blank"
<template>
  <v-container>
    <v-row class="mx-12 px-12" align="center" justify="center">
      <template v-for="city in cities">
        <v-col cols="6" lg="3" class="" v-bind:key="city.name">
          <v-card hover class="rounded-card" @click.stop="openDialog(city)">
            <v-img height="200px" :src="city.image" class="align-end">
              <v-row align="end" justify="end">
                <v-card primary class="px-6 py-2 rounded-card" hover>
                  <v-card-text class="pa-0">
                    {{ time(city) }}
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
    <!-- <v-btn @click.stop="dialog = true">Dugme</v-btn> -->
    <v-dialog  v-model="dialog" max-width="430">
      <Dialog v-bind:city="dialogCity"/>
    </v-dialog>
  </v-container>
</template>

<script>
import Dialog from './Dialog';
export default {
  name: 'CityImages',
  components: { Dialog },

  data() {
    return {
      dialog: false,
      selectedCity: null,
    };
  },

  methods: {
    /** Nicely formatting time for given city */
    time(city) {
      let hours = city.date.getHours();
      let minutes = city.date.getMinutes();

      if (hours < 10) hours = '0' + hours;
      if (minutes < 10) minutes = '0' + minutes;
      return hours + ':' + minutes;
    },

    openDialog(city) {
      this.selectedCity = city.name;
      this.dialog = true;
    },
  },

  computed: {
    cities: {
      get() {
        return this.$store.state.cities.cities;
      },
    },

    dialogCity() {
      let x =  this.$store.state.cities.cities.find(
        city => city.name == this.selectedCity
      );
      return x;
    },
  },

  watch: {},
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
