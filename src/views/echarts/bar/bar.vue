<template>
  <div class="basicChartBox">
    <!-- <base-bar-chart
      ref="barChart"
      :xAxisData="barChart.xAxisData"
      :seriesData="barChart.seriesData"
      :seriesOptions="barChart.seriesOptions"
      theme="light"
      :gird="{ left: '10%' }"
    ></base-bar-chart> -->
    <base-group-bar-chart ref="barChart" :groupData="barChart.groupData">
    </base-group-bar-chart>
  </div>
</template>
<script>
export default {
  data() {
    return {
      barChart: {
        groupData: [
          {
            label: '分组一',
            children: [
              {
                label: '测试一',
                value: 20
              },
              {
                label: '测试二',
                value: 20
              },
              {
                label: '测试三',
                value: 20
              },
              {
                label: '测试四',
                value: 20
              }
            ]
          },
          {
            label: '分组二',
            children: [
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
