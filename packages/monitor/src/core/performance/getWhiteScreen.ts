import { SetStore, InitOptions, PerformanceType } from '../../types'

// 获取白屏时间

export function getWhiteScreen(setStore: SetStore, options: InitOptions): void {
  const isSkeletonScreen = options.isSkeletonScreen
  let pooCount = 0
  const startSampLists: string[] = []
  let nowSampLists: string[] = []
  const containerLists = ['html', 'body', '#app', '#root']
  let timer = null

  if (options.isSkeletonScreen) {
    document.readyState != 'complete' && onSamp()
  } else {
    if (document.readyState === 'complete') {
      onSamp()
    } else {
      window.addEventListener('load', onSamp)
    }
  }

  function getSelector(element: any) {
    if (element.id) {
      return '#' + element.id
    } else if (element.className) {
      return '.' + element.className.split(' ').filter(Boolean).join('.')
    } else {
      return element.nodeName.toLowerCase()
    }
  }

  function isContainer(element: HTMLElement) {
    const selector = getSelector(element)
    if (isSkeletonScreen) {
      pooCount ? nowSampLists.push(selector) : startSampLists.push(selector)
    }
    return containerLists?.includes(selector)
  }

  // 采样对比
  function onSamp() {
    let points = 0

    for (let i = 0; i <= 9; i++) {
      const xElements = document.elementsFromPoint(
        (window.innerWidth * i) / 10,
        window.innerHeight / 2,
      )

      const yElements = document.elementsFromPoint(
        window.innerWidth / 2,
        (window.innerHeight * i) / 10,
      )

      isContainer(xElements[0] as HTMLElement) && points++
      // 避免重复计算
      i != 5 && isContainer(yElements[0] as HTMLElement) && points++
    }

    if (points != 17) {
      if (isSkeletonScreen) {
        if (!pooCount) return onLoop()
        if (nowSampLists.join() == startSampLists.join())
          setStore(PerformanceType.WHITE, { isWhite: true })
        return
      }
      if (timer) {
        clearTimeout(timer)
        timer = null
      }
    } else {
      if (!timer) {
        onLoop()
      }
    }

    setStore(PerformanceType.WHITE, { isWhite: points == 17 ? true : false })
  }

  // 白屏轮询检测
  function onLoop() {
    if (timer) return
    timer = setInterval(() => {
      if (isSkeletonScreen) {
        pooCount++
        nowSampLists = []
      }
      onSamp()
    }, 1000)
  }
}
