<template>
  <transition name="viewer-fade">
    <div class="y-viewer" v-show="visible" :style="{ 'z-index': zIndex }">
      <div class="y-viewer-mask"></div>
      <div class="y-viewer-close" @click="close">
        <i class="el-icon-circle-close"></i>
      </div>
      <div class="y-viewer-content" @click.stop="close">
        <img @click.stop="() => {}" :style="imageStyle" :src="list[index]" />
      </div>
      <div class="img-map" v-if="list.length > 1">
        <div
          class="img-map-item"
          :class="{ 'is-active': index == i }"
          v-for="(item, i) in list"
          @click="index = i"
          :key="i"
        >
          <img :src="item" />
        </div>
      </div>
      <div class="y-viewer-actions">
        <span
          class="actions-item"
          :class="{ 'is-disabled': index == 0 }"
          v-if="list.length > 1"
          @click="prev"
          ><i class="el-icon-arrow-left"></i
        ></span>
        <span class="actions-item" @click="zoomOut">
          <i class="el-icon-zoom-out"></i
        ></span>
        <span class="actions-item" @click="zoomIn">
          <i class="el-icon-zoom-in"></i
        ></span>
        <span class="actions-item" @click="turnLeft"
          ><i class="el-icon-refresh-left"></i
        ></span>
        <span class="actions-item" @click="turnRight"
          ><i class="el-icon-refresh-right"></i
        ></span>
        <span
          class="actions-item"
          :class="{ 'is-disabled': index == list.length - 1 }"
          v-if="list.length > 1"
          @click="next"
          ><i class="el-icon-arrow-right"></i
        ></span>
      </div>
    </div>
  </transition>
</template>
<script>
  export default {
    name: 'MeViewer',
    data() {
      return {
        index: this.currentIndex,
        transform: {
          deg: 0,
          scale: 1
        },
        zoomRate: 0.2
      }
    },
    props: {
      visible: {
        type: Boolean,
        default: false
      },
      list: {
        type: Array,
        default: () => []
      },
      zIndex: {
        type: Number,
        default: 2000
      },
      currentIndex: {
        type: Number,
        default: 0
      }
    },
    computed: {
      imageStyle() {
        const style = {
          transform: `scale(${this.transform.scale})  rotate(${this.transform.deg}deg)`,
          transition: 'transform .3s'
        }
        return style
      }
    },
    watch: {
      currentIndex: {
        handler(val) {
          this.index = val
        },
        immediate: true
      },
      visible: {
        handler(val) {
          if (val) {
            document.body.style.overflow = 'hidden'
          } else {
            document.body.style.overflow = ''
          }
        },
        immediate: true
      }
    },
    methods: {
      prev() {
        const len = this.list.length
        this.index = (this.index - 1 + len) % len
      },
      next() {
        const len = this.list.length
        this.index = (this.index + 1) % len
      },
      turnLeft() {
        this.transform.deg -= 90
      },
      turnRight() {
        this.transform.deg += 90
      },
      zoomIn() {
        this.transform.scale = parseFloat(
          (this.transform.scale + this.zoomRate).toFixed(3)
        )
      },
      zoomOut() {
        if (this.transform.scale > 0.2) {
          this.transform.scale = parseFloat(
            (this.transform.scale - this.zoomRate).toFixed(3)
          )
        }
      },
      close() {
        this.transform = {
          deg: 0,
          scale: 1
        }
        this.$emit('update:visible', false)
        this.$emit('close')
      }
    }
  }
</script>
<style lang="less">
  .y-viewer {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1000;
    .y-viewer-mask {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      opacity: 0.5;
      background: #000;
      z-index: -1;
    }
    .y-viewer-close {
      position: absolute;
      z-index: 10;
      top: 20px;
      right: 20px;
      width: 40px;
      height: 40px;
      font-size: 40px;
      cursor: pointer;
      color: #fff;
    }
    .y-viewer-content {
      position: relative;
      width: 100%;
      height: 100%;
      overflow: auto;
      padding: 24px;
      display: flex;
      justify-content: center;
      align-items: center;
      img {
        max-width: 100%;
        max-height: 100%;
        width: auto;
        box-shadow: 0 5px 15px -5px rgba(0, 0, 0, 0.1);
      }
    }
    .img-map {
      position: absolute;
      right: 0;
      bottom: 0;
      bottom: 60px;
      display: flex;
      flex-direction: column;
      align-items: center;
      .img-map-item {
        position: relative;
        width: 30px;
        height: 30px;
        margin: 5px;
        border-radius: 5px;
        overflow: hidden;
        box-shadow: none;
        cursor: pointer;
        transition: all 0.3s;
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        &.is-active {
          transition: all 0.3s;
          box-shadow: 0 1px 10px 1px #ff362b;
        }
      }
    }
    .y-viewer-actions {
      position: absolute;
      z-index: 10;
      left: 50%;
      transform: translateX(-50%);
      width: 282px;
      height: 44px;
      padding: 0 23px;
      background-color: rgba(0, 0, 0, 0.5);
      border-color: #fff;
      border-radius: 22px;
      bottom: 0px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      box-shadow: 0 5px 15px -5px rgba(0, 0, 0, 0.1);
      .actions-item {
        color: #fff;
        font-size: 22px;
        cursor: pointer;
        &.is-disabled {
          cursor: inherit;
          opacity: 0.5;
        }
      }
    }
  }

  .viewer-fade-enter-active {
    animation: viewer-fade-in 0.3s;
  }

  .viewer-fade-leave-active {
    animation: viewer-fade-out 0.3s;
  }

  @keyframes viewer-fade-in {
    0% {
      transform: translate3d(0, -20px, 0);
      opacity: 0;
    }
    100% {
      transform: translate3d(0, 0, 0);
      opacity: 1;
    }
  }

  @keyframes viewer-fade-out {
    0% {
      transform: translate3d(0, 0, 0);
      opacity: 1;
    }
    100% {
      transform: translate3d(0, -20px, 0);
      opacity: 0;
    }
  }
</style>
