<template>
  <div class="basicChartBox">
    <base-bar-chart
      ref="barChart"
      :xAxisData="barChart.xAxisData"
      :seriesData="barChart.seriesData"
      :seriesOptions="barChart.seriesOptions"
      :barBackground="barChart.barBackground"
      :barWidth="30"
      theme="light"
      :barColor="barChart.barColor"
    ></base-bar-chart>
  </div>
</template>
<script>
export default {
  data() {
    return {
      barChart: {
        xAxisData: ['2013', '2014', '2015', '2016', '2017', '2018'],
        seriesData: [
          [120, -200, 150, 80, 70, 110],
          [100, -100, 150, 50, 70, 10]
        ],
        seriesOptions: [
          {
            name: '相对值'
          },
          {
            name: '绝对值'
          }
        ],
        barColor: [
          ['rgba(58, 253, 247, 1)', 'rgba(29, 98, 255, 1)'],
          ['rgba(91, 143, 249, 1)', 'rgba(255, 255, 255, 0)']
        ],
        barBackground: 'rgba(180, 180, 180, 0.2)'
      }
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.$refs.barChart.initChart();
    });
  }
};
</script>
<style>
.basicChartBox {
  width: 100%;
  height: 350px;
}
</style>
