class Dict extends Map {
    constructor(entry) {
        super();
        this.dict = Array.isArray(entry) ? undefined : entry;
    }
    static from(a) {
        return new Dict(a);
    }
    set(k, v) {
        if (this.dict) {
            return super.set(this.dict[k], v).set(k, v);
        }
        return super.set(k, v);
    }
    get(key) {
        if (this.dict && key in this.dict) {
            return super.get(this.dict[key]);
        }
        return super.get(key);
    }
}
const get = (t, k) => Reflect.get(t, k);
export default (args) => {
    const keys = Dict.from({
        m: "main",
        o: "output",
        e: "extension"
    });
    const argv = args.slice(2);
    const flags = argv.filter((_, i) => !(i % 2));
    const res = argv.filter((_, i) => i % 2);
    for (const [i, v] of res.entries()) {
        const key = get(flags, i).substr(1);
        keys.set(key, v);
    }
    return keys;
};
