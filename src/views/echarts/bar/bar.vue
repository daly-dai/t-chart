<template>
  <div class="basicChartBox">
    <base-group-bar-chart
      :barWidth="'30%'"
      ref="barChart"
      :groupData="barChart.groupData"
      :chartOptions="chartOptions"
    >
    </base-group-bar-chart>
  </div>
</template>
<script>
export default {
  data() {
    return {
      barChart: {
        groupData: {
          分组一: [
            {
              label: '测试一',
              value: 20
            },
            {
              label: '测试二',
              value: 30
            },
            {
              label: '测试三',
              value: 40
            },
            {
              label: '测试四',
              value: 50
            }
          ],
          分组二: [
            {
              label: '测试四',
              value: 20
            },
            {
              label: '测试五',
              value: 20
            },
            {
              label: '测试六',
              value: 20
            },
            {
              label: '测试七',
              value: 20
            }
          ]
        }
      }
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.$refs.barChart.initChart();
    });
  },
  methods: {
    chartOptions(options) {
      console.log(options, 7777);

      return options;
    }
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
