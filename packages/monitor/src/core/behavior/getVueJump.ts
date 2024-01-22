import { Report, BehaviorType } from '../../types'
type Value = {
  from: string
  to: string
  name: string
}

// VJ: Vue Jump 用户在页面跳转的时候

export function getVueJump(report: Report, router) {
  router.beforeEach((to, from, next) => {
    if (!from) {
      next()
      return
    }
    const value: Value = {
      from: from.fullPath,
      to: to.fullPath,
      name: to.name || to.path,
    }
    report(BehaviorType.VJ, value)
  })
}
