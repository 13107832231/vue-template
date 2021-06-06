// 评估订单配置项
export const pgOrderChartSettings = {
  labelMap: {
    firstApply: '首次申请',
    againApply: '再次申请',
    reviewApply: '复评申请'
  },
  yAxisType: 'KMB',
  yAxisName: ['数值'],
  stack: { 用户: ['firstApply', 'againApply', 'reviewApply'] }
}
export const pgOrderExtend = {
    series: {
      barMaxWidth: 30,
      itemStyle: {
        barBorderRadius: 2,   
      }
    },
    legend: {
      top: 10,
      icon: 'circle'
    },
    icon: 'circle',
    yAxis(item) {
      item[0].splitLine = {
        show: false
      }
      item[0].axisLine = {
        show: true,
        lineStyle: {
          color: '#aaa'
        }
      }
      return item
    },
    xAxis: {
      splitLine: {
        show: false
      },
      axisLine: {
        show: true,
        lineStyle: {
          color: '#aaa'
        }
      }
    }
}

// 评估师占比配置项
export const pgsChartSettings = {
  labelMap: {
    evaluatorType: '评估师类型',
    count: '人数'
  },
  dataType: 'KMB',
  radius: ['50%', '75%'],
  label: {
    show: false
  },
  offsetY: 100
}
export const pgsExtend = {
  legend: {
    type: 'scroll',
    orient: 'vertical',
    formatter: function(name, v) {
      return name
    },
    // bottom: 50,
    left: 0,
    top: 'center',
    icon: 'circle'

    // padding: [-30, 5, 10, 5]
  },
  title: [
    {
      text: '',
      top: 'center',
      left: 'center',
      textStyle: {
        rich: {
          name: {
            fontSize: 14,
            fontWeight: 'normal',
            color: '#666666',
            padding: [10, 0]
          },
          val: {
            fontSize: 32,
            fontWeight: 'bold',
            color: '#333333'
          }
        }
      }
    }
  ]
}

// 评估人数登记占比配置项
export const pgrsChartSettings = {
  labelMap: {
    abilityLevel: '评估等级',
    count: '人数'
  },
  dataType: 'KMB',
  radius: ['50%', '75%'],
  label: {
    show: false
  },
  offsetY: 100
}
export const pgrsExtend = {
  legend: {
    type: 'scroll',
    orient: 'vertical',
    formatter: function(name, v) {
      return name
    },
    left: 0,
    top: 'center',
    icon: 'circle'
  },
  title: [
    {
      text: '',
      top: 'center',
      left: 'center',
      textStyle: {
        rich: {
          name: {
            fontSize: 14,
            fontWeight: 'normal',
            color: '#666666',
            padding: [10, 0]
          },
          val: {
            fontSize: 32,
            fontWeight: 'bold',
            color: '#333333'
          }
        }
      }
    }
  ]
}

// 评估订单分布区域统计配置项
export const pgAreaChartSettings = {
  labelMap: {
    firstApply: '首次申请',
    againApply: '再次申请',
    reviewApply: '复评申请'
  },
  yAxisType: 'KMB',
  yAxisName: ['数值']
}
export const pgAreaHistogramExtend = {
  series: {
    // barWidth: 10
  },
  icon: 'circle',
  legend: {
    top: 10,
    icon: 'circle'
  },
  yAxis(item) {
    item[0].splitLine = {
      show: false
    }
    item[0].axisLine = {
      show: true,
      lineStyle: {
        color: '#aaa'
      }
    }
    return item
  },
  xAxis: {
    splitLine: {
      show: false
    },
    axisLine: {
      show: true,
      lineStyle: {
        color: '#aaa'
      }
    }
  }
}
// 评估费用区域统计配置项
export const pgFeeChartSettings = {
  labelMap: {
    firstEvaluateFee: '首次评估费用',
    againEvaluateFee: '再次评估费用',
    reviewEvaluateFee: '复评评估费用'
  },
  yAxisType: 'KMB',
  yAxisName: ['数值']
}
export const pgFeeExtend = {
  series: {
    symbol: 'circle',
    symbolSize: 6,
    smooth: false
  },
  icon: 'circle',
  legend: {
    top: 10,
    icon: 'circle'
  },
  yAxis(item) {
    item[0].splitLine = {
      show: false
    }
    item[0].axisLine = {
      show: true,
      lineStyle: {
        color: '#aaa'
      }
    }
    return item
  },
  xAxis: {
    splitLine: {
      show: false
    },
    axisLine: {
      show: true,
      lineStyle: {
        color: '#aaa'
      }
    }
  }
}