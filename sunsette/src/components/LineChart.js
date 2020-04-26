import { Line, mixins } from 'vue-chartjs'; // We specify what type of chart we want from vue-chartjs and the mixins module
const { reactiveProp } = mixins;
export default {
  //We are extending the base chart class as mentioned above
  extends: Line,
  mixins: [reactiveProp],
  props: ['options'],
  data() {
    return {};
  },
  mounted() {
    // this.chartData is created in the mixin
    this.renderChart(this.chartData, this.options);
  },
};
// </script>
