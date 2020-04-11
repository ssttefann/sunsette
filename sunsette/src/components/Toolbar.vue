<template>
  <header>
    <v-app-bar app height="210px" class="blue-grey darken-1 pt-5">
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
              dark
              v-model="cities"
              :disabled="isUpdating"
              v-on:input="limiter"
              :items="entries"
              :search-input.sync="search"
              :loading="isLoading"
              chips
              deletable-chips
              filled
              clearable
              hide-no-data
              hide-selected
              color="blue-grey lighten-2"
              label="Choose locations:"
              multiple
            >
              <!-- No data template -->
              <template v-slot:no-data>
                <v-list-item>
                  <v-list-item-title>
                    Search for your favorite
                    <strong>Cryptocurrency</strong>
                  </v-list-item-title>
                </v-list-item>
              </template>

              <!-- TEMPLATE -->
              <!-- <template v-slot:selection="data">
                <v-chip
                  v-bind="data.attrs"
                  :input-value="data.selected"
                  close
                  @click="data.select"
                  @click:close="remove(data.item)"
                >
                  {{ data.item.name }}
                </v-chip>
              </template> -->
            </v-autocomplete>
          </v-col>
        </v-row>
      </v-container>
    </v-app-bar>
  </header>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      friends: ["Sandra Adams", "Britta Holt"],
      isUpdating: false,
      people: [
        { name: "Sandra Adams" },
        { name: "Ali Connors" },
        { name: "Trevor Hansen" },
        { name: "Tucker Smith" },
        { name: "Britta Holt" },
        { name: "Jane Smith " },
        { name: "John Smith" },
        { name: "Sandra Williams" }
      ],

      entries: [],
      isLoading: false,
      model: null,
      search: null
    };
  },
  watch: {
    isUpdating(val) {
      if (val) {
        setTimeout(() => (this.isUpdating = false), 3000);
      }
    },

    search(val) {
      // Items have already been loaded
      // if (this.items.length > 0) return;
      if (!val) return;

      // Items have already been requested
      if (this.isLoading) return;

      this.isLoading = true;

      // Lazily load input items
      fetch(`https://api.teleport.org/api/cities/?search=${val}&limit=10`)
        .then(res => res.json())
        .then(res => {
          let cities = res._embedded["city:search-results"];
          let new_entries = cities.map(city => {
            city = city.matching_full_name.replace(/\([^}]*\)/, "");
            city = city.replace(/,.*,/, ",");
            return city;
          });

          this.entries.push(...new_entries);
        })
        .catch(err => {
          console.log(err);
        })
        .finally(() => (this.isLoading = false));
    }
  },

  computed: {
    cities: {
      get() {
        return this.$store.state.cities.cities;
      },
      set(value) {
        this.addCities(value);
        this.search = "";
      }
    }
  },

  methods: {
    ...mapActions({
      addCities: "cities/addCities"
    }),

    /* Limits the number of max locations to 4*/
    limiter(val) {
      console.log(this.$store.state.cities);
      if (val.length > 4) {
        val.pop();
        this.showSnackbar([
          "You can get weather data for maximum 4 locations at once!",
          "error",
          "bottom"
        ]);
      }
    }
  }
};
</script>

<style></style>
