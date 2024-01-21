import { isPerformance, isNavigator, switchToMB } from '../../utils'
import { PerformanceType, SetStore } from '../../types'

// 获取内存信息

export function getMemory(setStore: SetStore): void {
  if (!isPerformance()) {
    throw new Error('当前浏览器不支持 performance API')
  }

  if (!isNavigator()) {
    throw new Error('当前环境不支持 navigator API')
  }

  const value = {
    deviceMemory: 'deviceMemory' in navigator ? navigator['deviceMemory'] : 0,
    hardwareConcurrency:
      'hardwareConcurrency' in navigator ? navigator['hardwareConcurrency'] : 0,
    // 内存大小限制
    jsHeapSizeLimit:
      'memory' in performance
        ? switchToMB(performance['memory']['jsHeapSizeLimit'])
        : 0,
    // 可使用的内存
    totalJSHeapSize:
      'memory' in performance
        ? switchToMB(performance['memory']['totalJSHeapSize'])
        : 0,
    // js对象占用的内存
    usedJSHeapSize:
      'memory' in performance
        ? switchToMB(performance['memory']['usedJSHeapSize'])
        : 0,
  }

  setStore(PerformanceType.MRY, value)
}
