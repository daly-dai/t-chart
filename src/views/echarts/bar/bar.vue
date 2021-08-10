<template>
  <div class="basicChartBox">
    <base-bar-chart
      ref="barChart"
      :barWidth="20"
      :yAxisData="barChart.yAxisData"
      :seriesData="barChart.seriesData"
      :seriesOptions="barChart.seriesOptions"
      :chartOptions="barChart.chartOptions"
      theme="dark"
    ></base-bar-chart>
  </div>
</template>
<script>
export default {
  data() {
    return {
      barChart: {
        yAxisData: [
          ['单位营业收入用水', '单位营业收入用电量'],
          ['星期二', '星期三']
        ],
        seriesData: [
          [50, 60],
          [50, 40]
        ],
        seriesOptions: [
          {
            name: '数据一'
          },
          {
            name: '数据二'
          }
        ],
        chartOptions: {
          xAxis: {
            show: false,
            type: 'value'
          },
          yAxis: [
            {
              type: 'category',
              offset: -80, // 设置y轴向右移动 当为负值时需要配合onZero: false
              axisLabel: {
                show: true,
                margin: -80,
                fontSize: 16,
                padding: [0, 0, 90, 0], // 设置轴文字上下偏移
                formatter: ['{value}'].join('\n')
              }
            },
            {
              type: 'category',
              axisLabel: {
                show: true,
                margin: 50
              }
            }
          ],
          legend: {
            left: 10,
            top: 30,
            itemWidth: 20,
            itemHeight: 20
          }
        }
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
  /* margin-left: 20px; */
  width: 100%;
  height: 350px;
}
</style>
