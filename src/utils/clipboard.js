import Vue from 'vue'
import Clipboard from 'clipboard'
/**
 * 复制结果提示
 * @param {string} type 
 * @param {string} msg 
 */
function copyTip(type,msg) {
  Vue.prototype.$message({
		center: true,
		customClass: 'me-msg ' + `${type}`,
		offset: 100,
    message: msg,
    type: type,
    duration: 1500
  })
}
/**
 * 文本复制
 * @param {string} text 需要被复制的内容
 * @param {*} event 触发复制的事件
 */
const handleCopy = (text, event) => {
  const clipboard = new Clipboard(event.target, {
    text: () => text
  })
  clipboard.on('success', () => {
    copyTip('success','复制成功')
    clipboard.destroy()
  })
  clipboard.on('error', () => {
    copyTip('error','复制失败')
    clipboard.destroy()
  })
  clipboard.onClick(event)
 }

export default handleCopy