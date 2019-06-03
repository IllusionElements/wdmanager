const command = "tsc -p ./ --traceResolution --noEmit"

require("child_process").exec(command, (err, stdout) => {
  require("fs").writeFileSync("./ouput.txt", stdout)
})
