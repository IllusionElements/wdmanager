import path from "path";
class CSVParser {
    constructor(fileList) {
        this.fileList = fileList;
    }
    static singleParser(file) {
        return new CSVParser([file]);
    }
    async parse(dest) {
        const { promises: { readFile } } = await import("fs");
        const files = this.fileList.map(async (file) => {
            const src = path.join(process.cwd(), file);
            const csv = await readFile(src);
            return this.convert(csv, { type: "JSON" });
        });
        const list = await Promise.all(files);
        const fileMap = new Map();
        for (const [i, src] of this.fileList.entries()) {
            fileMap.set(src.replace("./", ""), list[i]);
        }
        return [...fileMap].reduce((o, [k, v]) => ({
            ...o,
            [k]: v
        }), {});
    }
    async convert(file, opts) {
        if (opts.type === "CSV")
            return {};
        const csvString = file.toString();
        const [_keys, _, ...values] = csvString.split(/\n/);
        const [keys, ...vals] = [_keys, ...values].map(arr => arr.split(","));
        const valSet = new Set();
        vals.forEach(val => {
            const o = {};
            for (const [i, el] of val.entries()) {
                Reflect.set(o, keys[i], el);
            }
            valSet.add(o);
        });
        return [...valSet];
    }
}
export default CSVParser;
