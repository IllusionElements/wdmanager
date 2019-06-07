export { lazy } from "./lazy";
export { pick } from "./pick";
export function loadGlobalPolyfills(...paths) {
    if (!paths) {
        require("./allSettled");
    }
    else {
        const pathList = paths.map(path => {
            const loader = () => require(path);
            return loader;
        });
        pathList.forEach(f => f());
    }
}
