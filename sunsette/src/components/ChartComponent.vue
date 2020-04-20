<template>
  <div v-if="visible">
  <v-card class="px-5 pt-6">
    <v-tabs v-model="tab">
      <v-tab v-for="item in tabNames" :key="item">
        {{ item }}
      </v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab">
      <v-tab-item v-for="item in tabNames" :key="item">
        <div class="ma-3 pa-3">
          <line-chart
            class="chart"
            :chart-data="items"
            :styles="myStyles"
          ></line-chart>
        </div>
      </v-tab-item>
    </v-tabs-items>
  </v-card>
  </div>
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
    };
  },

  mounted() {
    this.fillData();
  },

  methods: {
    fillData() {
      this.datacollection = {
        labels: [
          this.getRandomInt(),
          this.getRandomInt(),
          this.getRandomInt(),
          this.getRandomInt(),
        ],
        datasets: [
          {
            label: 'Data One',
            backgroundColor: '#f87979',
            data: [
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt(),
            ],
          },
          {
            label: 'Data Two',
            backgroundColor: '#2c2c2c',
            data: [
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt(),
            ],
          },
        ],
      };
    },
    getRandomInt() {
      return Math.floor(Math.random() * (50 - 5 + 1)) + 5;
    },
  },

  computed: {
    visible() {
      return this.$store.state.cities.cities.length > 0;
    },

    myStyles() {
      return {
        height: `500px`,
        position: 'relative',
      };
    },

    items() {
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
        datasets : datasets,
        labels : []
      }
      
      return data;
    },
  },
};
</script>

<style>
.chart {
  /* max-width: 600px;
  margin: 150px auto; */
  /* max-width: 1500px; */
  width: 90%;
}
</style>
