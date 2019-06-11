declare class Dict<T> extends Map<T[keyof T] | keyof T, string> {
    static from<T>(a: T): Dict<T>;
    private dict?;
    private constructor();
    set(k: keyof T, v: string): this;
    get(key: keyof T | T[keyof T]): string | undefined;
}
declare const _default: (args: string[]) => Dict<{
    readonly m: "main";
    readonly o: "output";
    readonly e: "extension";
}>;
export default _default;
