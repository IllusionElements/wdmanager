export const service = (db) => (ServiceModel) => {
    return class Service extends ServiceModel {
        constructor() {
            super(...arguments);
            //@ts-ignore
            this.db = db();
        }
    };
};
