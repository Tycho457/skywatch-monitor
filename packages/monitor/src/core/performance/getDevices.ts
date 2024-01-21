import { PerformanceType, SetStore, DevicesInfo } from '../../types'

// 获取设备信息
export function getDevices(setStore: SetStore): void {
  if (!window.location) {
    throw new Error('当前环境不支持 window.location')
  }

  const {
    host,
    hostname,
    href,
    protocol,
    origin,
    port,
    pathname,
    search,
    hash,
  } = location

  const { width, height } = window.screen

  const info: DevicesInfo = {
    host,
    hostname,
    href,
    protocol,
    origin,
    port,
    pathname,
    search,
    hash,
    userAgent: 'userAgent' in navigator ? navigator.userAgent : '',
    screenResolution: `${width}*${height}`,
  }
  setStore(PerformanceType.DICE, info)
}
