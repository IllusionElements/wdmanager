import { Document, Schema } from "mongoose";
export declare type TypeOfSchema<T> = {
    -readonly [K in keyof T]: K extends keyof typeof import("mongoose").Types ? T[K] : T[K] extends (...args: any[]) => any ? ReturnType<T[K]> : T[K] extends new (...args: any[]) => infer U ? U : T[K] extends any[] | object ? TypeOfSchema<T[K]> : K extends "_id" ? T[K] : K extends keyof Document ? T[K] : never;
};
export declare type MongoSchemaType<T> = T extends Schema<infer U> ? U : T;
