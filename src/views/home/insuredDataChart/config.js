// 申请人次趋势配置项
export const sqOrderChartSettings = {
  labelMap: {
    firstApply: '首次申请',
    againApply: '再次申请',
    reviewApply: '复评申请'
  },
  yAxisType: 'KMB',
  yAxisName: ['数值'],
  stack: { 用户: ['firstApply', 'againApply', 'reviewApply'] }
}
export const sqOrderExtend = {
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

// 保障对象参保类型占比配置项
export const cbChartSettings = {
  labelMap: {
    insuredType: '参保人类型',
    count: '人数'
  },
  dataType: 'KMB',
  radius: ['50%', '75%'],
  label: {
    show: false
  },
  offsetY: 125
}
export const cbExtend = {
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
        
      }
    }
  ]
}

// 保障对象失能等级占比配置项
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
  offsetY: 130
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
       
      }
    }
  ]
}

// 保障对象分布区域统计配置项
export const insuredAreaChartSettings = {
  labelMap: {
    insuredNum: '参保人数',
    applyNum: '人数申请',
    disabilityNum: '失能人数'
  },
  yAxisType: 'KMB',
  yAxisName: ['数值']
}
export const insuredAreaHistogramExtend = {
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

// 保障对象年龄分布占比配置项
export const ageChartSettings = {
  // labelMap: {
  //   abilityLevel: '评估等级',
  //   count: '人数'
  // },
  // dataType: 'KMB',
  // radius: ['50%', '75%'],
  offsetY: 130,
  radius: 60,
 
}
export const ageExtend = {
  legend: {
    type: 'scroll',
    orient: 'vertical',
    formatter: function(name, v) {
      return name
    },
    left: 0,
    top: 'center',
    icon: 'circle',
    
  },
  series: {
    left: 105,
    label: {
      formatter: '{d}%'
    },
    itemStyle: {
      normal: {
          label: {
              position: "inner",
              show: true,
              textStyle: {
                  fontSize: 12,
                  color: "#ffffff"
              },
              formatter: "{c}"
          },
          lableLine: {
              "show": false
          }
      },
      // emphasis: {
      //     shadowBlur: 10,
      //     shadowOffsetX: 0,
      //     shadowColor: "rgba(0, 0, 0, 0.5)"
      // }
  }
  }
}
// 保障对象性别分布占比配置项
export const sexChartSettings = {
  labelMap: {
    sex: '性别',
    count: '人数'
  },
  // dataType: 'KMB',
  radius: ['30%', '50%'],
  offsetY: 130
}
export const sexExtend = {
  series: {
    label: {
      formatter: '{d}%'
    },
  },
  legend: {
    right: 0,
    top: 0,
    icon: 'circle'
  },
  title: [
    {
      text: '',
      top: 'center',
      left: 'center',
      textStyle: {
        fontSize:14
      }
    }
  ]
}
