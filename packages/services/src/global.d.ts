///<reference types="@types/node" />

import { Model, Document } from "mongoose"
import { ASTNode } from "graphql"
interface GenericMethod<T extends any[]> {
  [key: string]: (...args: T) => any
}
declare global {
  type ArgumentType<T> = T extends (...args: infer R) => any
    ? R
    : T extends new (...args: infer R) => any
    ? R
    : T extends GenericMethod<infer R>
    ? R
    : T extends Array<(...args: infer R) => any>
    ? R
    : never
  type $Value<T, K extends keyof T> = T[K]
}
declare type MongoResolver<
  T extends Document,
  Args extends {},
  Context extends {},
  R
> = (main: Model<T>, args: Args, ctx: Context, ast?: ASTNode) => Promise<R> | R

declare namespace NodeJS {
  export interface ProcessEnv {
    MONGO_URL: string
  }
}
