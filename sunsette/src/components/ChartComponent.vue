<template>
  <v-card class="px-5 py-6 grayish graph-card">
    <v-row align="center" justify="end" class="ml-5">
      <v-col lg="4" sm="6" class="grayish" align="begin" justify="begin">
        <v-tabs fixed-tabs v-model="tab" class="ml-0 grayish">
          <v-tab v-for="item in tabNames" :key="item" class="grayish">
            {{ item }}
          </v-tab>
        </v-tabs>
      </v-col>
      <v-col lg="4" sm="0"></v-col>
      <v-col lg="2" sm="3" align="end" justify="end" class="ma-0">
        <v-select
          v-model="selectedMeasurement"
          :items="measurementOptions"
          hide-details
          single-line
          class="unitSelection"
        >
        </v-select>
      </v-col>
      <v-col lg="2" sm="2" class="mt-5" align="begin" justify="begin">
        <v-btn>
          Dugme
        </v-btn>
      </v-col>
    </v-row>


    <v-tabs-items v-model="tab">
      <v-tab-item v-for="item in tabNames" :key="item" class="grayish">
        <div class="ma-7 mb-0 pa-7 pb-0">
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

export default {
  name: 'Chart',
  components: {
    LineChart,
  },

  data() {
    return {
      datacollection: null,
      tab: null,
      tabNames: ['Day', 'Week', '10 Days', '15 Days'],
      tabContent: ['One', 'Two', 'Three', 'Four'],
      measurementOptions: [{ text: 'Temperature (℃)' }, { text: 'Else (℃)' }],
      selectedMeasurement: 'Temperature (℃)',
    };
  },

  mounted() {},

  methods: {
    getRandomInt() {
      return Math.floor(Math.random() * (50 - 5 + 1)) + 5;
    },
  },

  computed: {
    myStyles() {
      return {
        height: `350px`,
        position: 'relative',
      };
    },

    items() {
      // alert(this.tab); 0 za prvi, 1 ...
      let datasets = this.$store.state.cities.cities.map(() => {
        return {
          label: 'Data One',
          backgroundColor: '#f87979',
          data: [
            this.getRandomInt(),
            this.getRandomInt(),
            this.getRandomInt(),
            this.getRandomInt(),
          ],
        };
      });

      let data = {
        datasets: datasets,
        labels: [],
        fill: false,
      };

      for (let i = 0; i < 4; i++) {
        data.labels.push(this.getRandomInt());
      }

      let aaa = {
        labels: [
          'January',
          'February',
          'March',
          'April',
          'May',
          'June',
          'July',
        ],
        datasets: [
          {
            label: 'My First dataset',
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'red',
            data: [0, 10, 5, 2, 20, 30, 45],
            fill: false,
          },
          {
            label: 'My First dataset',
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'blue',
            data: [13, 20, 25, 12, 10, 13, 54],
            fill: false,
          },
        ],
      };

      return aaa;
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
  max-width: 170px;
}

.grayish {
  background-color: #ffffff !important;
}

.graph-card {
  border-radius: 30px !important;
}
</style>
