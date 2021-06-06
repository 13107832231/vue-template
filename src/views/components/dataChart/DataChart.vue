<template>
  <div class="chart-box">
    <ve-funnel
      v-if="chartType == 'funnel'"
      :data="data"
      :settings="settings"
      :extend="extend"
      height="100%"
    ></ve-funnel>
    <ve-ring
      v-if="chartType == 'ring'"
      height="100%"
      :data="data"
      :settings="settings"
      :extend="extend"
    ></ve-ring>
    <ve-histogram
      v-if="chartType == 'histogram'"
      height="100%"
      :data="data"
      :settings="settings"
      :extend="extend"
    ></ve-histogram>
    <ve-line
      v-if="chartType == 'line'"
      height="100%"
      :data="data"
      :settings="settings"
      :extend="extend"
    ></ve-line>
    <ve-bar
      v-if="chartType == 'bar'"
      height="100%"
      :data="data"
      :settings="settings"
      :extend="extend"
    ></ve-bar>
    <ve-pie
      v-if="chartType == 'pie'"
      height="100%"
      :data="data"
      :settings="settings"
      :extend="extend"
    ></ve-pie>
  </div>
</template>
<script>
  import VCharts from 'v-charts'
  import Vue from 'vue'
  Vue.use(VCharts)
  export default {
    name: 'DataChart',
    props: {
      chartType: {
        type: String
      },
      data: {
        type: Object,
        default: () => {
          return {}
        }
      },
      settings: {
        type: Object,
        default: () => {
          return {}
        }
      },
      extend: {
        type: Object,
        default: () => {
          return {}
        }
      }
    },
    data() {
      return {}
    }
  }
</script>
<style lang="less" scoped>
  .chart-box {
    width: 100%;
    height: 100%;
  }
</style>
