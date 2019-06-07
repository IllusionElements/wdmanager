export const lazy = (lazyLoad, moduleName) => {
    return async (...args) => {
        const importedModule = await lazyLoad();
        return importedModule[moduleName](...args);
    };
};
