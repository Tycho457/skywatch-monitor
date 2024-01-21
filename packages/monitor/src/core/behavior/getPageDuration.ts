import { onBeforeunload, getUrl } from '../../utils'
import { Report, BehaviorType } from '../../types'

export function getPageDuration(report: Report) {
  const startTime = performance.now()
  onBeforeunload(() => {
    report(BehaviorType.PD, {
      pageURL: getUrl(),
      duraion: performance.now() - startTime,
    })
  })
}
