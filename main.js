const getScripts = async () => {
  const package$ = await import("./package.json")
  return package$.scripts
}
const isOdd = n => !!(n % 2)
const mapArgsToMap = args => {
  const res = args.map((n, i, arr) => {
    if (isOdd(i)) {
      console.log(arr[i - 1].match(/^-|^--/))

      return [
        arr[i - 1]
          .trim()
          .replace(/^--|^-/g, "")
          .trim(),
        n
      ]
    }
  })
  return new Map(res.filter(Boolean))
}

const argvMap = mapArgsToMap(process.argv.slice(2))
const scriptToRun = argvMap.get("s")
const { exec } = require("child_process")
getScripts().then(script => exec(script[scriptToRun]))
