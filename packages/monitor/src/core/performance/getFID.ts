import { isPerformanceObserver } from '../../utils'
import { observe } from '../../common'
import { PerformanceType, SetStore } from '../../types'

// FID: First Input Delay
// 测量用户首次与您的站点交互时的时间（即，当他们单击链接，点击按钮或使用自定义的JavaScript驱动控件时）到浏览器实际能够的时间回应这种互动。

export function getFID(setStore: SetStore) {
  if (!isPerformanceObserver()) {
    throw new Error('当前浏览器不支持PerformanceObserver')
  } else {
    const entryHandler = (entry: PerformanceEventTiming) => {
      observer && observer.disconnect()
      setStore(PerformanceType.FID, {
        value: entry.startTime.toFixed(2),
        event: entry.name,
      })
    }

    const observer = observe(PerformanceType.FID, entryHandler)
  }
}
