import OssUpload from './oss-upload'
import  { MeUpload,MeUploadList} from './me-upload'
import MeCard from './me-card/index'
import MeMeta from './me-meta/index'
import HkLayout from './hk-layout/index'
import MeRange from './me-range/index'
import MeViewer from './me-viewer/index'

export const list = [OssUpload, MeCard, MeMeta, HkLayout, MeRange, MeViewer,MeUpload,MeUploadList]

const install = function(Vue) {
  list.forEach((component) => {
    Vue.component(component.name, component)
  })
}
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default {
  install,
  OssUpload,
  MeCard,
  MeMeta,
  HkLayout,
  MeRange,
  MeViewer,
  MeUpload,
  MeUploadList
}
