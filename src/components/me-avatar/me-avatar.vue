<template>
  <div>
    <el-avatar
      :size="size"
      :src="src + '?x-oss-process=image/resize,w_300'"
      :shape="shape"
      @error="errorFun"
    >
      <img :src="defaultImg" />
    </el-avatar>
  </div>
</template>
<script>
  import bxjbImg from './images/gys.png'
  import pgjgImg from './images/gys.png'
  import hljgImg from './images/hljg.png'
  import hlyImg from './images/hly.png'
  import pgsImg from './images/pgs.png'
  import sqrImg from './images/sqr.png'
  import gysImg from './images/gys.png'
  export default {
    name: 'MeAvatar',
    props: {
      src: {
        type: String,
        default: ''
      },
      /**
       * userType
       * bxjb:保险经办;hljg:护理机构;hly:护理员;gys:供应商;sqr:申请人;pgjg:评估机构;pgs:评估师
       *  */
      userType: {
        type: String,
        default: ''
      },
      shape: {
        type: String,
        default: 'circle'
      },
      size: {
        type: [String, Number],
        default: 80
      }
    },
    data() {
      return {
        // 默认头像
        defaultImg: ''
      }
    },

    watch: {
      userType: {
        handler(val) {
          if (val) {
            switch (val) {
              case 'bxjb':
                this.defaultImg = bxjbImg
                break
              case 'pgs':
                this.defaultImg = pgsImg
                break
              case 'hljg':
                this.defaultImg = hljgImg
                break
              case 'hly':
                this.defaultImg = hlyImg
                break
              case 'sqr':
                this.defaultImg = sqrImg
                break
              case 'gys':
                this.defaultImg = gysImg
                break
              case 'pgjg':
                this.defaultImg = pgjgImg
                break

              default:
                this.defaultImg =
                  'https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png'
                break
            }
          }
        },
        immediate: true
      }
    },
    methods: {
      errorFun() {
        console.log('12313')
      }
    }
  }
</script>
<style lang="less" scoped></style>
