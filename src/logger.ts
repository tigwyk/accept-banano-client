const createLogger = () => {
  let enabled = false

  const configure = ({ isEnabled }: { isEnabled: boolean }) => {
    enabled = isEnabled
  }

  const log = (namespace: string, ...args: unknown[]) => {
    if (enabled) {
      console.log(`[AcceptBanano-${namespace}]`, ...args)
    }
  }

  return {
    configure,
    log,
  }
}

export const logger = createLogger()
