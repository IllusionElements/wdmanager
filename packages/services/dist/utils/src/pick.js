export const pick = (k, transform) => (o, ...args) => {
    if (transform) {
        return transform(o[k], ...args);
    }
    //@ts-ignore
    return o[k];
};
