import { onBeforeunload, getUrl } from '../../utils'
import { Report, BehaviorType } from '../../types'

// PD: Page Duration 用户在页面停留的时长

export function getPageDuration(report: Report) {
  const startTime = performance.now()
  onBeforeunload(() => {
    report(BehaviorType.PD, {
      pageURL: getUrl(),
      duraion: performance.now() - startTime,
    })
  })
}
