import { isPerformanceObserver, onHidden } from '../../utils'
import { observe } from '../../common'
import { PerformanceType, LayoutShift, SetStore } from '../../types'

// CLS: Cumulative Layout Shift 累计布局偏移
// 从页面加载开始和其生命周期状态变为隐藏期间发生的所有意外布局偏移的累积分数

let value = 0

export function getCLS(setStore: SetStore) {
  if (!isPerformanceObserver()) {
    throw new Error('当前浏览器不支持 performance API')
  } else {
    const entryHandler = (entry: LayoutShift): void => {
      !entry.hadRecentInput && (value += entry.value)
    }

    const ob: PerformanceObserver = observe(PerformanceType.CLS, entryHandler)

    const stopListenging = () => {
      if (ob?.takeRecords) {
        ob.takeRecords().map((entry: LayoutShift) => {
          if (!entry.hadRecentInput) {
            value += entry.value
          }
        })
      }

      ob?.disconnect()

      setStore(PerformanceType.CLS, value.toFixed(2))
    }

    onHidden(stopListenging, true)
  }
}
