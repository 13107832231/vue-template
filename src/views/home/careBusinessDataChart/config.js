// 护理订单数量配置项
export const careOrderChartSettings = {
  labelMap: {
    homeCare: '居家护理',
    orgCare: '机构护理',
    consumableCare: '居家补贴',
    familyCare: '异地补贴',
    equipmentCare: '设备租赁'
  },
  yAxisType: 'KMB',
  yAxisName: ['单'],

}
export const careOrderExtend = {
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




// 护理订单方式分布区域统计配置项
export const careAreaChartSettings = {
  labelMap: {
    homeCareNum: '居家护理',
    orgCare: '机构护理',
    consumableCareNum: '居家补贴',
    familyCareNum: '异地补贴',
    equipmentCare: '设备租赁'
  },
  yAxisType: 'KMB',
  yAxisName: ['单']
}
export const careAreaHistogramExtend = {
  series: {
    // barWidth: 5
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

// 订单统计配置项
export const orderStatisticsSettings = {
  // labelMap: {
  //   abilityLevel: '评估等级',
  //   count: '人数'
  // },
  radius: ['30%', '50%'],
  offsetY: 150, 
}
export const orderStatisticsExtend = {
  series: {
    label: {
      show:false
    },
  },
  legend: {
    left: 0,
    top: 10,
    icon: 'circle'
  },
  title: [
    {
      text: '',
      top: 140,
      left: 'center',
      textStyle: {
        fontSize:14
      }
    }
  ]
}
// 订单金额统计配置项
export const orderAmountSettings = {
  radius: ['30%', '50%'],
  offsetY: 150
}
export const orderAmountExtend = {
  series: {
    label: {
      show:false
    },
  },
  legend: {
    left: 0,
    top: 10,
    icon: 'circle'
  },
  title: [
    {
      text: '',
      top: 140,
      left: 'center',
      textStyle: {
        fontSize:14
      }
    }
  ]
}
// 护理员职称构成配置项
export const caregiverProfessionSettings = {
  radius: ['30%', '50%'],
  offsetY: 150
}
export const caregiverProfessionExtend = {
  series: {
    label: {
      show:false
    },
  },
  legend: {
    left: 0,
    top: 10,
    icon: 'circle'
  },
  title: [
    {
      text: '',
      top: 140,
      left: 'center',
      textStyle: {
        fontSize:14
      }
    }
  ]
}
// 机构统计配置项
export const orgStatisticsSettings = {
  radius: ['30%', '50%'],
  offsetY: 150
}
export const orgStatisticsExtend = {
  series: {
    label: {
      show:false
    },
  },
  legend: {
    left: 0,
    top: 10,
    icon: 'circle'
  },
  title: [
    {
      text: '',
      top: 140,
      left: 'center',
      textStyle: {
        fontSize:14
      }
    }
  ]
}
