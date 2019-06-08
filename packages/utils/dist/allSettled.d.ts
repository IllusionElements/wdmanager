export declare const allSettled: <T extends Promise<any> | Promise<any>[]>(promises: T extends infer R ? R extends Promise<any>[] ? R : R[] : Promise<T>[]) => Promise<({
    reason: string;
    status: PromiseStatus.REJECTED;
} | {
    result: T extends Promise<infer U>[] ? U : any;
    status: PromiseStatus.RESOLVED;
})[]>;
declare global {
    interface PromiseConstructor {
        allSettled: typeof allSettled;
    }
}
