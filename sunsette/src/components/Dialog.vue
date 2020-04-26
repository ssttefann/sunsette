<template>
  <v-card class="blue-grey darken-1 white--text macfont">
    <v-card-text class="pt-5 pb-1 cent white--text headline">
      {{ city.cityName }}
    </v-card-text>

    <div v-if="city != ''" class="white--text cent display-3">
      {{ city.current.temp + ' °' }}
    </div>

    <v-container id="dialogCard">
      <v-row class="px-3">
        <v-col>
          Today
        </v-col>
        <v-spacer></v-spacer>
        <v-col
          v-if="city != ''"
          cols="2"
          align="end"
          justify="end"
          class="ml-4 cent"
        >
          {{ city.current.temp_max + '°' }}
        </v-col>
        <v-col cols="2" justify="end" align="end" class="mintemp cent">
          {{ todayMinTemp }}
        </v-col>
      </v-row>

      <!-- Hourly info -->
      <v-divider class="grey"></v-divider>
      <v-row class="px-2">
        <v-col v-for="item in hoursItems" :key="item.dt" align="center">
          {{ item.localDate.getHours() + ':00' }}
        </v-col>
      </v-row>

      <v-row class="px-2">
        <v-col v-for="item in hoursItems" :key="item.id" align="center">
          <span
            class="iconify"
            :data-icon="item.icon"
            data-inline="false"
          ></span>
        </v-col>
      </v-row>

      <v-row class="pl-3">
        <v-col v-for="item in hoursItems" :key="item.dt" align="center">
          {{ item.temp + ' °' }}
        </v-col>
      </v-row>
      <v-divider class="grey"></v-divider>

      <v-row class="pl-4" v-for="item in daysItems" :key="item.dt">
        <v-col cols="5">
          {{ days[item.localDate.getDay()] }}
        </v-col>

        <v-col cols="3" class="pr-3">
          <span
            class="iconify"
            :data-icon="item.icon"
            data-inline="false"
          ></span>
        </v-col>

        <v-col class="cent">
          {{ item.temp_max + '°' }}
        </v-col>

        <v-col class="mintemp cent">
          {{ item.temp_min + '°' }}
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
export default {
  name: 'Dialog',
  props: ['city'],
  data() {
    return {
      days: [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
      ],
    };
  },
  methods: {},

  computed: {
    hoursItems() {
      if (this.city == '') return [];
      return this.city.today.slice(0, 6);
    },

    daysItems() {
      if (this.city == '') return [];
      let now = this.city.date.getDay();
      let firstEntry = this.city.daily[0].localDate.getDay();

      if (now == firstEntry) return this.city.daily.slice(1, 7);
      else return this.city.daily.slice(0, 6);
    },

    todayMinTemp() {
      if (this.city.today)
        return Math.min(...this.city.today.map(weather => weather.temp)) + ' °';
      return 0;
    },
  },
};
</script>

<style>
.mintemp {
  color: #9e9e9e;
}

#dialogCard .iconify {
  width: 30px;
  height: 30px;
}
</style>
