<template>
  <header>
    <v-app-bar app height="180px" class="blue-grey darken-1 pt-2">
      <v-container fluid>
        <v-row class="mt-5 mb-2">
          <v-col align="center" justify="center">
            <v-btn class="d-flex align-center text-none" text disabled>
              <v-img
                alt="Logo"
                class="shrink mr-2"
                contain
                src="http://icons.iconarchive.com/icons/google/noto-emoji-travel-places/128/42519-sunset-icon.png"
                transition="scale-transition"
                width="50"
              />

              <span class="display-1 font-weight-light">
                <span class="orange--text">sun</span>
                <span class="blue--text">sette</span>
              </span>
            </v-btn>
          </v-col>
        </v-row>

        <!-- Autocomplete -->
        <v-row align="center" justify="center">
          <v-col cols="8" lg="6">
            <v-autocomplete
              class="overfl"
              dark
              v-model="cities"
              :disabled="isUpdating"
              :items="getEntries"
              :search-input.sync="search"
              v-on:input="limiter"
              :loading="isLoading"
              chips
              deletable-chips
              filled
              clearable
              hide-no-data
              hide-selected
              color="blue-grey lighten-2"
              placeholder="Choose locations:"
              prepend-icon="mdi-magnify"
              item-text="name"
              multiple
            >
            </v-autocomplete>
          </v-col>
        </v-row>
      </v-container>
    </v-app-bar>
  </header>
</template>

<script>
// import Vue from "vue";
import { mapActions, mapGetters } from 'vuex';

export default {
  data() {
    return {
      // entries: [],
      isLoading: false,
      isUpdating: false,
      model: null,
      search: null,
      maxLocationsAllowed: 4,
    };
  },
  watch: {
    isUpdating(val) {
      if (val) {
        setTimeout(() => (this.isUpdating = false), 3000);
      }
    },
    async search(val) {
      if (!val) return;
      await this.searchEntries(val);
    },
  },

  computed: {
    ...mapGetters({
      getEntries: 'autocomplete/getEntries',
    }),

    cities: {
      get() {
        return this.$store.state.cities.cities;
      },
      async set(value) {
        //deletion
        if (value.length < this.cities.length) {
          await this.deleteCity(value);
          return;
        }

        // reset the input value
        this.search = '';

        //addition

        // if already full
        if (this.limiter(this.cities)) return;

        // last item is the newly added city
        await this.addCity(value[value.length - 1]);

        // delete unused ac options
        let names = this.cities.map(city => city.name);
        this.deleteUnused(names);
      },
    },
  },

  methods: {
    ...mapActions({
      addCity: 'cities/addCity',
      deleteCity: 'cities/deleteCity',
      showSnackbar: 'snackbar/showSnackbar',
      searchEntries: 'autocomplete/search',
      deleteUnused: 'autocomplete/deleteUnused',
    }),

    /* Limits the number of max input locations*/
    limiter(val) {
      if (val.length > this.maxLocationsAllowed) {
        val.pop();
        this.showSnackbar([
          'You can get weather data for maximum 4 locations at once!',
          'error',
          'bottom',
        ]);
      }

      if (val.length == this.maxLocationsAllowed) return true;
    },
  },
};
</script>

<style></style>
