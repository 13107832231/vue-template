<template>
  <div class="me-meta">
    <div class="me-meta-label">
      <slot name="label"> {{ label }}</slot>
    </div>
    <div class="me-meta-value">
      <slot> {{ value }}</slot>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'MeMeta',
    props: {
      label: {
        type: [String, Number]
      },
      value: {
        type: [String, Number]
      }
    }
  }
</script>
<style lang="less" scoped>
  .me-meta {
    display: flex;
    align-items: flex-start;
    .me-meta-label {
      // width: 65px;
      white-space: nowrap;
    }
    .me-meta-value {
      word-break: break-word;
    }
  }
</style>
