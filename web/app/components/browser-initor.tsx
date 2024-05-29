'use client'

class StorageMock {
  data: Record<string, string>

  constructor() {
    this.data = {} as Record<string, string>
  }

  setItem(name: string, value: string) {
    this.data[name] = value
  }

  getItem(name: string) {
    return this.data[name] || null
  }

  removeItem(name: string) {
    delete this.data[name]
  }

  clear() {
    this.data = {}
  }
}

let localStorage, sessionStorage

// 尝试获取全局的 localStorage 和 sessionStorage
try {
  localStorage = globalThis.localStorage
  sessionStorage = globalThis.sessionStorage
}
catch (e) {
  // 获取失败，例如在 SSR 环境下 globalThis 没有 localStorage
  // 则会使用 StorageMock 来创建一个新的模拟存储系统
  localStorage = new StorageMock()
  sessionStorage = new StorageMock()
}

Object.defineProperty(globalThis, 'localStorage', {
  value: localStorage,
})

Object.defineProperty(globalThis, 'sessionStorage', {
  value: sessionStorage,
})

const BrowerInitor = ({
  children,
}: { children: React.ReactElement }) => {
  // console.log(globalThis)
  return children
}

export default BrowerInitor
