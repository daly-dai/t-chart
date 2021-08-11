const darkTheme = {
  backgroundColor: 'rgba(0, 0, 0, 1)',
  xAxis: {
    type: 'category',
    data: [],
    axisTick: {
      show: false
    },
    axisLabel: {
      color: 'rgba(255, 255, 255, 85)',
      fontSize: 12,
      align: 'center'
    },
    axisLine: {
      // 设置轴线
      lineStyle: {
        color: '#fff'
      }
    }
  },
  yAxis: {
    type: 'value',
    data: [],
    splitLine: {
      lineStyle: {
        color: 'rgba(255, 255, 255, 0.2)',
        type: 'solid',
        width: 1
      }
    },
    axisLabel: {
      color: 'rgba(255, 255, 255, 85)',
      fontSize: 12,
      align: 'center'
    },
    axisLine: {
      show: false
    },
    axisTick: {
      show: false
    }
  },
  legend: {
    textStyle: {
      color: 'rgba(255, 255, 255, 100)',
      fontSize: 14
    }
  }
};

const lightTheme = {
  backgroundColor: 'rgba(255, 255, 255, 1)',
  xAxis: {
    type: 'category',
    data: [],
    axisTick: {
      show: false
    },
    axisLine: {
      show: true
    },
    axisLabel: {
      color: 'rgba(0, 0, 0, 85)',
      fontSize: 12,
      align: 'center'
    }
  },
  yAxis: {
    type: 'value',
    data: [],
    splitLine: {
      lineStyle: {
        color: 'rgba(255, 255, 255, 0.2)',
        type: 'solid',
        width: 1
      }
    },
    axisLabel: {
      color: 'rgba(0, 0, 0, 0.85)',
      fontSize: 12,
      align: 'center'
    },
    axisLine: {
      show: false
    },
    axisTick: {
      show: false
    }
  }
};

export default {
  darkTheme,
  lightTheme
};
