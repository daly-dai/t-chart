<template>
  <div class="basicChartBox">
    <base-bar-chart
      ref="barChart"
      :xAxisData="barChart.xAxisData"
      :seriesData="barChart.seriesData"
      :seriesOptions="barChart.seriesOptions"
      theme="light"
    ></base-bar-chart>
  </div>
</template>
<script>
export default {
  data() {
    return {
      barChart: {
        xAxisData: ['2013', '2014', '2015', '2016', '2017', '2018'],
        seriesData: [120, -200, 150, 80, 70, 110],
        seriesOptions: [
          {
            name: '相对值',
            barWidth: 30,
            itemStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: 'rgba(58, 253, 247, 1)' // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: 'rgba(29, 98, 255, 1)' // 100% 处的颜色
                  }
                ],
                global: false // 缺省为 false
              }
            }
          }
        ]
      }
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.$refs.barChart.initChart();
    });
  },
  methods: {}
};
</script>
<style>
.basicChartBox {
  /* margin-left: 20px; */
  width: 100%;
  height: 350px;
}
</style>
