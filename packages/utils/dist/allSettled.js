export const allSettled = async (promises) => {
    const promiseList = [];
    for (const prom of promises) {
        try {
            const result = await prom;
            promiseList.push({
                status: "RESOLVED" /* RESOLVED */,
                result
            });
        }
        catch (e) {
            promiseList.push({
                status: "REJECTED" /* REJECTED */,
                reason: e.message
            });
        }
    }
    return promiseList;
};
Promise.allSettled = allSettled;
