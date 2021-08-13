<template>
  <div class="basicChartBox">
    <base-group-bar-chart
      :barWidth="'30%'"
      ref="groupBarChart"
      :groupData="barChart.groupData"
      :groupColor="barChart.groupColor"
      :props="barChart.props"
    ></base-group-bar-chart>
  </div>
</template>
<script>
export default {
  data() {
    return {
      barChart: {
        props: {
          label: 'name',
          value: 'data'
        },
        groupColor: [['#36EFFF', '#1F6BFF'], '#1F6BFF'],
        groupData: {
          分组一: [
            {
              name: '测试一',
              data: 20
            },
            {
              name: '测试二',
              data: 30
            },
            {
              name: '测试三',
              data: 40
            },
            {
              name: '测试四',
              data: 50
            }
          ],
          分组二: [
            {
              name: '测试四',
              data: 20
            },
            {
              name: '测试五',
              data: 20
            },
            {
              name: '测试六',
              data: 20
            },
            {
              name: '测试七',
              data: 20
            }
          ]
        }
      }
    };
  },
  mounted() {
    this.$refs.groupBarChart.initChart();
  }
};
</script>
<style>
.basicChartBox {
  width: 100%;
  height: 350px;
}
</style>
