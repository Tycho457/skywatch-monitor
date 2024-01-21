import type { InitOptions } from '../types'
import { defaultOptions } from '../config'
import Performance from './performance'
import Error from './error'

class Monitor {
  constructor(options: InitOptions) {
    this.init(options)
  }

  init(options: InitOptions): void {
    if (!this.isSetCondition(options)) {
      return
    }

    this.setDefault(options)
    options.isCollectPer && new Performance(options)
    options.isCollectErr && new Error(options)
  }

  // 校验相关
  isSetCondition(options: InitOptions): boolean {
    if (!options.url) {
      console.error('请传入url')
      return false
    }

    if (!options.project) {
      console.error('请传入项目名称')
      return false
    }

    if (!options.version) {
      console.error('请传入项目版本')
      return false
    }

    if (!options.isVue && !options.vue) {
      console.log('如果isVue为true时,请在vue字段上传入Vue')
      return false
    }

    return true
  }

  // 设置默认值
  setDefault(options: InitOptions): void {
    Object.keys(defaultOptions).forEach((key: string) => {
      if (!options[key]) {
        options[key] = defaultOptions[key]
      }
    })
  }
}

export default Monitor
