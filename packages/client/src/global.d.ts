type Functor<Returns, Args extends any[] = []> = (...args: Args) => Returns
type VoidFunctor<A = [void]> = Functor<void, A extends any[] ? A : [A]>
type AnyFunctor = Functor<any, any[]>
type ArgumentType<T> = T extends (...args: infer R) => any ? R : any[]
type TemplateString = string | TemplateStringsArray
class ObjectID {}
type ID =
  | ObjectID
  | string
  | number
  | {
      _id: {
        $oid: ID
      }
    }
type Int = number & {
  _brand: "INT"
}
type $Partial<T, K extends keyof T> = Pick<T, K> & Partial<Omit<T, K>>
declare module "graphql-tag.macro" {
  import { DocumentNode } from "graphql"
  const gql: (
    literal: TemplateString,
    ...placeholders: Array<TemplateString | DocumentNode>
  ) => DocumentNode
  export default gql
}

type ConstructorType<T> = T extends new (...args: any[]) => infer R ? R : T
type ExtractPrimitive<T extends Primitive> = T extends ConstructorType<infer U>
  ? U
  : never

type TypeOf<T> = { [K in keyof T]: ExtractPrimitive<T[K]> }
type Functor<R = any, A extends any[] = any[]> = (...args: A) => R
declare module "@manager/utils" {
  export const isNull: (u: unknown) => u is null
}
type ObjectKeyType = string | symbol | number
type Unpack<T> = T extends Array<infer U>
  ? U
  : T extends Set<infer U>
  ? U
  : T extends Promise<infer U>
  ? U
  : T extends Map<any, infer U>
  ? U
  : T extends Record<ObjectKeyType, infer U>
  ? U
  : T extends Functor<infer U>
  ? U
  : T extends { [K in keyof T]: infer U }
  ? U
  : T extends ConstructorType<infer U>
  ? U
  : never

type $Value<T, K extends keyof T = keyof T> = T[K]
type $Keys<T> = keyof T

interface IAction<T = any, P = any> {
  type: T
  payload: P
}

type DispatchAction<T extends IAction<any, any>> = T extends IAction<
  infer Action,
  any
>
  ? Action
  : never
type DispatchPayload<T extends IAction<any, any>> = T extends IAction<
  any,
  infer Payload
>
  ? Payload
  : never
type ActionDispatch<T extends IAction<any, any>> = React.Dispatch<{
  type: DispatchAction<T>
  payload: DispatchPayload<T>
}>

type ExtractAction<T extends AnyFunctor> = T extends (
  d: React.Dispatch<infer Action>
) => AnyFunctor
  ? Action
  : never

type ReactPropsType<
  T extends React.ComponentType<any>
> = T extends React.ComponentType<infer Props>
  ? Props
  : React.PropsWithChildren<{}>
type ReactFactory<T> = Functor<React.ReactNode, [React.PropsWithChildren<T>]>

declare namespace Types {
  export type FN<A extends any[] = [], R = any> = Functor<R, A>
  export type FNVoid<R = any> = FN<[], R>
}

type Identity<T, K = null> = K extends $Keys<T> ? T[K] : T
type MapKeys<T extends Map> = T extends Map<infer K, any> ? K : T
type AsyncFunctor<A, R> = (...args: A extends any[] ? A : [A]) => Promise<R>
type ActionPayload<T> = T extends IAction<any, infer Payload> ? Payload : T
type ActionType<T extends IAction> = T extends IAction<infer Type>
  ? Type
  : string

type StringRecord<K extends ObjectKeyType> = Record<K, string>
type NumberRecord<K extends ObjectKeyType> = Record<K, number>
