<template>
  <div class="card-box">
    <div v-if="title" class="title">
      <span>{{ title }}</span>
      <slot name="header-right"></slot>
    </div>

    <slot></slot>
  </div>
</template>
<script>
  export default {
    name: 'DataCard',
    props: {
      title: {
        type: String,
        default: ''
      }
    },
    data() {
      return {}
    }
  }
</script>
<style lang="less" scoped>
  .card-box {
    width: 100%;
    height: 100%;
    background-color: #fff;
    border-radius: 5px;
    padding: 12px;

    box-shadow: 0px 3px 10px 0px #e4ebe9;
    .title {
      font-size: 16px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }
</style>
