import { getUid, onLoaded, getUrl } from '../../utils'
import { Report, BehaviorType } from '../../types'

// PV: Page View 用户访问页面的次数

export function getPv(report: Report) {
  onLoaded(() => {
    report(BehaviorType.PV, {
      uuid: getUid(),
      pageURL: getUrl(),
      referrer: document.referrer,
    })
  })
}
