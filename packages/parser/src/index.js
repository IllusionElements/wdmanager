import fs from "fs";
import path from "path";
import CSVParser from "./csvParser";
const argMap = new Map();
const [, main, ...commands] = process.argv;
let prevKey = "";
const isEven = (n) => !(n % 2);
for (const [index, keyValue] of commands.entries()) {
    if (isEven(index)) {
        prevKey = keyValue;
    }
    else {
        argMap.set(prevKey.substr(1).trim(), keyValue.trim());
    }
}
const base = `dragonUpgrades`;
const generateName = (tier, c, klass) => `t${tier}c${c}${klass}${base}`.toUpperCase();
const src = argMap.get("s");
const outputSrc = argMap.get("o");
const files = fs.readdirSync(path.join(main, src), {
    encoding: "utf-8"
});
const parser = new CSVParser([path.join("./data", generateName(12, 3, "sf"))]);
(async () => {
    const result = await parser.parse("./");
    console.log(result);
})();
