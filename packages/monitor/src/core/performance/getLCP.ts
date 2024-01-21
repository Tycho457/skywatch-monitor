import { isPerformanceObserver } from '../../utils'
import { observe } from '../../common'
import { PerformanceType, SetStore } from '../../types'

// LCP: Largest Contentful Paint
// 从页面加载开始到最大文本块或图像元素在屏幕上完成渲染的时间

let lcpDone = false
export function isLCPDone() {
  return lcpDone
}

export function getLCP(setStore: SetStore) {
  if (!isPerformanceObserver()) {
    lcpDone = true
    throw new Error('当前浏览器不支持PerformanceObserver')
  } else {
    const entryHandler = (entry: PerformanceEntry): void => {
      if (entry.startTime < 0 || entry.startTime > 1e12) {
        return
      }
      lcpDone = true
      observer && observer.disconnect()
      setStore(PerformanceType.LCP, {
        value: entry.startTime.toFixed(2),
        event: entry.name,
      })
    }

    const observer = observe(PerformanceType.LCP, entryHandler)
  }
}
