require("child_process").exec(
  "yarn tsc --traceResolution --noEmit -p ./packages/core/tsconfig.json",
  (_, stdout) => {
    require("fs").writeFileSync("./stdout.txt", stdout, {
      encoding: "utf-8"
    })
  }
)
