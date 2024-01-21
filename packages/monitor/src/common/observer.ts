type handler = {
  (entry: PerformanceEntry): void
}

// 观察者
export function observe(
  type: string, // 观察的目的类型，例如；'paint' 'resource' 'navigation'等
  handler: handler, // 观察到目标类型后的回调函数
): PerformanceObserver | undefined {
  if (PerformanceObserver.supportedEntryTypes.includes(type)) {
    const observer: PerformanceObserver = new PerformanceObserver((list) => {
      list.getEntries().forEach(handler)
    })
    observer.observe({ type, buffered: true })
    return observer
  }
}
