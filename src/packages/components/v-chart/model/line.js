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
      fontSize: 12
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
      fontSize: 12
    },
    axisLine: {
      show: false
    },
    axisTick: {
      show: false
    }
  }
};

const lightTheme = {
  backgroundColor: 'rgba(255, 255, 255, 0.85)',
  xAxis: {
    type: 'category',
    data: [],
    axisTick: {
      show: false
    },
    axisLabel: {
      color: 'rgba(0, 0, 0, 0.85)',
      fontSize: 12
    }
  },
  yAxis: {
    type: 'value',
    data: [],
    splitLine: {
      lineStyle: {
        color: 'rgba(0, 0, 0, 0.2)',
        type: 'solid',
        width: 1
      }
    },
    axisLabel: {
      color: 'rgba(0, 0, 0, 0.85)',
      fontSize: 12
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
