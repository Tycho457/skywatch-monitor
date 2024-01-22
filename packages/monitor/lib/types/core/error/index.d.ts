import type { InitOptions, ReportValue } from '../../types'
import { ErrorType } from '../../types'
import { ReportInfo } from '../../common'
declare class Error {
  reportInfo: ReportInfo
  constructor(options: InitOptions)
  init(options: InitOptions): void
  report(secondType: ErrorType, value: ReportValue): void
  handleJS(): void
  handleVueError(vue: any): void
  handleAjaxError(): void
}
export default Error
