<template>
  <div class="basicChartBox">
    <BaseBarLineChart
      ref="barLine"
      :seriesData="barLine.seriesData"
      :xAxisData="barLine.xAxisData"
      :seriesOptions="barLine.seriesOptions"
      :barWidth="30"
      :lineAreaColor="barLine.lineAreaColor"
      :barColor="barLine.barColor"
    >
    </BaseBarLineChart>
  </div>
</template>
<script>
export default {
  data() {
    return {
      barLine: {
        seriesData: [
          [30, 40, 50, 60, 90],
          [20, 50, 70, 80, 55],
          [0.3, 0.4, 0.36, 0.38, 0.7],
          [0.5, 0.8, 0.25, 0.77, 0.45]
        ],
        xAxisData: ['周一', '周二', '周三', '周四', '周五'],
        barColor: [
          'rgba(56, 122, 255, 1)',
          ['rgba(58, 253, 247, 1)', 'rgba(29, 98, 255, 1)']
        ],
        lineAreaColor: ['', ['rgba(232, 98, 32, 1)', 'rgba(232, 98, 32, 0)']],
        seriesOptions: [
          { name: '柱子一', type: 'bar' },
          { name: '柱子二', type: 'bar' },
          { name: '折线一', type: 'line', yAxisIndex: 1 },
          { name: '折线二', type: 'line', yAxisIndex: 1 }
        ]
      }
    };
  },
  mounted() {
    this.$refs.barLine.initChart();

    this.$nextTick(() => {
      console.log(this.$refs.barLine.getChartOptions(), 898989);
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
