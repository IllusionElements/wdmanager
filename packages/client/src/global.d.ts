type Functor<Returns = any, Args extends any[] = []> = (
  ...args: Args
) => Returns
type AnyFunctor = Functor<any, any[]>
type ArgumentType<T> = T extends Functor<any, infer R> ? R : any[]
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
    ...placeholders: TemplateString[]
  ) => DocumentNode
  export default gql
}

type ConstructorType<T> = T extends new (...args: any[]) => infer R ? R : T
type ExtractPrimitive<T extends Primitive> = T extends ConstructorType<infer U>
  ? U
  : never

type TypeOf<T> = { [K in keyof T]: ExtractPrimitive<T[K]> }
