<template>
  <div class="chartBox">
    <base-pie-chart
      ref="pieChart"
      :seriesOptions="pieChart.seriesOptions"
      :chartOptions="pieChart.chartOptions"
      :seriesData="pieChart.seriesData"
      :colorTheme="pieChart.colorTheme"
      :showLegend="true"
    ></base-pie-chart>
  </div>
</template>
<script>
export default {
  data() {
    return {
      initIndex: 0,
      pieChart: {
        colorTheme: ['rgb(0,203,213)', 'rgb(251,75,73)'], // 主题颜色设置 和下面的value值对应
        seriesData: [
          { name: '数据1', value: 20 },
          { name: '数据2', value: 30 },
          { name: '数据2', value: 50 }
        ],
        seriesOptions: [
          {
            radius: ['50%', '85%'], // 前面数值大 后面数值小 这样鼠标移入可以把扇形变小
            center: ['35%', '53%'], // 调整饼图 在div内部的位置
            itemStyle: {
              normal: {
                // 设置每块饼状图的边框
                borderColor: 'rgb(0,0,0)',
                borderWidth: 30
              }
            },
            silent: true, // 饼图不响应鼠标事件
            label: {
              show: true,
              position: 'center',
              formatter: () => {
                return '{a|80%}';
              },
              rich: {
                a: {
                  fontSize: 35,
                  color: 'red'
                }
              }
            }
          }
        ],
        chartOptions: {
          backgroundColor: 'rgb(0,0,0)'
          // tooltip: {
          //   show: false
          // }
        }
      }
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.$refs.pieChart.initChart();
      this.chartObj = this.$refs.pieChart.getChartObj(); // 获取echarts挂载的外部dom元素
      console.log(this.$refs.pieChart.getChartOptions());
    });
  },
  methods: {}
};
</script>
<style>
.chartBox {
  width: 500px;
  height: 300px;
}
</style>
