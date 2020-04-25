<template>
  <v-card class="px-3 py-3 mb-5 grayish graph-card">
    <v-row align="center" justify="end" class="ml-5">
      <v-col lg="6" sm="6" class="grayish" align="begin" justify="begin">
        <!-- Tabs for charts -->
        <v-tabs fixed-tabs v-model="tab" class="ml-0 grayish">
          <v-tab v-for="item in tabNames" :key="item" class="grayish">
            {{ item }}
          </v-tab>
        </v-tabs>
      </v-col>

      <v-col lg="2" sm="0"></v-col>

      <!-- Measurement select -->
      <v-col lg="2" sm="3" align="end" justify="end" class="ma-0">
        <v-select
          v-model="selectedMeasurement"
          :items="measurementOptions"
          hide-details
          single-line
          solo
          dense
          class="unitSelection mt-5"
        >
        </v-select>
      </v-col>

      <!-- Download button -->
      <v-col lg="2" sm="2" class="mt-5" align="begin" justify="begin">
        <v-btn @click="downloadChart" id="download" class="white">
          <span
            class="iconify"
            data-icon="ion:cloud-download-outline"
            data-inline="false"
          ></span>
        </v-btn>
        <!-- <a href="" @click="downloadChart" id="download">
          <span class="iconify" data-icon="ion:cloud-download-outline" data-inline="false"></span>
        </a> -->
      </v-col>
    </v-row>

    <!-- Tab items -->
    <v-tabs-items v-model="tab">
      <v-tab-item v-for="item in tabNames" :key="item" class="">
        <div class="ma-7 mb-0 pa-7 pb-3">
          <line-chart
            class="chart"
            :chart-data="items"
            :styles="myStyles"
          ></line-chart>
        </div>
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>

<script>
import LineChart from './LineChart.js';
import { mapGetters } from 'vuex';

export default {
  name: 'Chart',
  components: {
    LineChart,
  },

  data() {
    return {
      datacollection: null,
      tabNames: ['Today', 'Tomorrow', 'Next Week'],
      tab: 1,
      tabContent: ['One', 'Two', 'Three', 'Four'],
      measurementOptions: [
        { text: 'Temperature (℃)' },
        { text: 'Air Pressure (hPa)' },
        { text: 'Humidity (%)' },
      ],
      selectedMeasurement: 'Temperature (℃)',
      colors: ['blue', 'red', 'green', 'black'],
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

  mounted() {},

  methods: {
    /** Returns x-axis labels based on current tab (today, tomorrow...) */
    getLabels() {
      let labels = [];

      //today
      if (this.tab == 0) {
        let now = new Date().getHours();
        for (let i = now; i < now + 12; i++) {
          labels.push(this.formatHours(i));
        }
      }
      //tomorrow
      else if (this.tab == 1) {
        let day = (new Date().getDay() + 1) % 7;
        for (let i = 6; i < 24; i++) {
          labels.push(this.days[day] + ' ' + this.formatHours(i));
        }
      }
      // next week
      else {
        let day = new Date().getDay();
        for (let i = 0; i < 5; i++) {
          let idx = (day + i) % 7;
          labels.push(this.days[idx]);
        }
      }

      return labels;
    },

    /** Nicely formatting hours for display */
    formatHours(hour) {
      hour = hour % 24;
      let formatted = hour + ':00';
      return hour < 10 ? '0' + formatted : formatted;
    },

    /** Downloads current chart as png image */
    downloadChart() {
      let canvas = document.getElementById('line-chart');
      var link = document.createElement('a');
      link.download = 'chart.png';
      link.href = canvas.toDataURL('image/png', 1.0);
      link.click();
    },
  },

  computed: {
    ...mapGetters({
      getSnackBar: 'snackbar/getSnackBar',
      getCities: 'cities/getCities',
    }),

    myStyles() {
      return {
        height: `350px`,
        position: 'relative',
      };
    },

    items() {
      // see which tab is active
      let property = 'today';
      if (this.tab == 1) {
        property = 'tomorrow';
      } else if (this.tab == 2) {
        property = 'daily';
      }

      // see which measurement is active
      let measurement = 'temp';
      if (this.selectedMeasurement.includes('Humidity'))
        measurement = 'humidity';
      else if (this.selectedMeasurement.includes('Pressure'))
        measurement = 'pressure';

      //get labels for chart's x-axis
      let labels = this.getLabels();

      let datasets = [];
      let i = 0;

      //extract data based on previous info
      for (let city of this.getCities) {
        let data = city[property].map(weather => weather[measurement]);
        datasets.push({
          label: city.name,
          data: data,
          backgroundColor: this.colors[i],
          borderColor: this.colors[i],
          fill: false,
        });
        i++;
      }

      return { labels, datasets };
    },
  },
};
</script>

<style>
.chart {
  /* max-width: 600px;
  margin: 150px auto; */
  /* max-width: 1500px; */
  width: 100%;
}

.unitSelection {
  max-width: 190px;
}

th {
  background-color: rgb(230, 233, 240);
  /* background-color:rgba(133, 190, 216, 0.397); */
}


.grayish {
  background-color: #ffffff !important;
}

.graph-card {
  border-radius: 30px !important;
}
button .iconify {
  width: 30px;
  height: 30px;
}
</style>
