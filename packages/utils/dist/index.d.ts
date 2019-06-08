declare global {
    type Functor<Returns, A extends unknown[] = any[]> = (...args: A) => Returns;
    type AnyFunctor = Functor<any>;
    type AnyReturnFunctor<A extends unknown[] = any[]> = Functor<any, A>;
    type ArgumentType<F extends AnyFunctor> = F extends AnyReturnFunctor<infer R> ? R : any[];
    const enum PromiseStatus {
        RESOLVED = "RESOLVED",
        REJECTED = "REJECTED"
    }
    type Union<A, B> = A | B;
    namespace Keys {
        type SUCCESS = "SUCCESS";
        type FAIL = "FAIL";
    }
    type SettledKeys = Union<Keys.SUCCESS, Keys.FAIL>;
    type AllSettled<Key extends SettledKeys, R = null> = Key extends Keys.SUCCESS ? {
        result: R;
        status: PromiseStatus.RESOLVED;
    } : Key extends Keys.FAIL ? {
        reason: string;
        status: PromiseStatus.REJECTED;
    } : never;
    type ArrayParamType<T> = T extends (infer R)[] ? R : T;
}
export { lazy } from "./lazy";
export { pick } from "./pick";
export declare function loadGlobalPolyfills<T extends any[]>(...paths: string[]): void;
