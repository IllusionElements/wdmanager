import { DocumentNode } from "graphql"
import gql from "graphql-tag.macro"

const cache = new Map<string, DocumentNode>()
// type ImportType<K extends ObjectKeyType, T> = {
//   [k in K]: T
// }

// type DefaultImport<T> = ImportType<'default', T>

// type AsyncImport<K extends ObjectKeyType, T> = Promise<ImportType<K, T>>

declare namespace Import {
  export type Type<K extends ObjectKeyType, T> = { [k in K]: T }
  export type Default<T> = Type<"default", T>

  export type AsyncDefault<T> = Promise<Default<T>>

  export type Async<K extends ObjectKeyType, T> = Promise<Type<K, T>>
}
declare enum Resp {
  ASYNC = "ASYNC",
  SYNC = "SYNC"
}
function gqlImport<R extends Resp>(
  path: string,
  r: Resp
): R extends Resp.ASYNC
  ? Promise<DocumentNode>
  : R extends Resp.SYNC
  ? DocumentNode
  : never {
  if (cache.has(path) && r === Resp.SYNC) {
    return cache.get(path) as R extends Resp.ASYNC
      ? Promise<DocumentNode>
      : R extends Resp.SYNC
      ? DocumentNode
      : never
  }

  const node: Import.AsyncDefault<string> = import(path)
  return node.then(gqlStr => {
    const docNode = gql(gqlStr.default)
    cache.set(path, docNode)
    return docNode
  }) as R extends Resp.ASYNC
    ? Promise<DocumentNode>
    : R extends Resp.SYNC
    ? DocumentNode
    : never
}
