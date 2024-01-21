import { isNavigator } from '../../utils'
import { PerformanceType, NavConnection, SetStore } from '../../types'

// 获取网络信息

export function getNavConnection(setStore: SetStore): void {
  if (!isNavigator()) {
    throw new Error('当前环境不支持 navigator API')
  } else {
    const connection: NavConnection =
      'connection' in navigator ? navigator['connection'] : {}
    const value = {
      downlink: connection.downlink,
      effective: connection.effectiveType,
      rtt: connection.rtt,
    }
    setStore(PerformanceType.NC, value)
  }
}
