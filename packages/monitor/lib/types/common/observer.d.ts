type handler = {
  (entry: PerformanceEntry): void
}
export declare function observe(
  type: string, // 观察的目的类型，例如；'paint' 'resource' 'navigation'等
  handler: handler,
): PerformanceObserver | undefined
export {}
