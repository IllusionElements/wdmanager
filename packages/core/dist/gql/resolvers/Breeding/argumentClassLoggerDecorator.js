const decorator = (log, label) => {
  const utils = require("util")
  const logger = {
    inspect: args =>
      utils.inspect(args, {
        showHidden: true,
        depth: Infinity
      }),
    _log: (k, args) => log(k, `${label}: \n ${args}`),
    log(key, a) {
      const { inspect } = this
      this._log(key, inspect(a))
      if (a.error) {
        throw a.error
      }
      return a.arguments || a.result || a
    }
  }
  return (_, key, descriptor) => {
    const oldMethod = descriptor.value
    return {
      ...descriptor,
      value(...args) {
        logger.log(key, {
          arguments: args
        })
        const returnValue = oldMethod.apply(this, args)
        if (returnValue instanceof Promise) {
          return returnValue
            .then(result => logger.log(key, { result }))
            .catch(error => logger.log(key, { error }))
        }

        return logger.log(key, {
          result: returnValue
        })
      }
    }
  }
}
const __decorate = (Klass, decorators, keys) => {
  const proto = Klass.prototype
  for (const deco of decorators) {
    for (const key of keys) {
      const descriptor = deco(
        proto,
        key,
        Reflect.getOwnPropertyDescriptor(proto, key)
      )
      if (descriptor) {
        Reflect.defineProperty(proto, key, descriptor)
      }
    }
  }
}
export default decorator
export { __decorate }
