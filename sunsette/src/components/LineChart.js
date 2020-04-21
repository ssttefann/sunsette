// import { Line, mixins } from 'vue-chartjs'
// const { reactiveProp } = mixins

// export default {
//   extends: Line,
//   mixins: [reactiveProp],
//   // props: ['options'],
//   data() {
//     return {
//       options : {
//         responsive : true
//       }
//     }
//   },
//   mounted () {
//     // this.chartData is created in the mixin.
//     // If you want to pass options please create a local options object
//     this.renderChart(this.chartData, this.options)
//   }
// }


import {Line, mixins} from 'vue-chartjs' // We specify what type of chart we want from vue-chartjs and the mixins module
const { reactiveProp } = mixins
export default { //We are extending the base chart class as mentioned above
  extends: Line,
  mixins: [reactiveProp],
  data () {
    return {
      options: { //Chart.js options
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            },
            gridLines: {
              display: true
            }
          }],
          xAxes: [ {
            gridLines: {
              display: false
            }
          }]
        },
        legend: {
          display: true,
        },
        responsive: true,
        maintainAspectRatio: false
      }
    }
  },
  mounted () {
    // this.chartData is created in the mixin
    this.renderChart(this.chartData, this.options)
  }
}
// </script>