import { ApolloServer } from "apollo-server"
import dotenv from "dotenv"
import { Breeding, Dragon, Tier, Deck, Query } from "./gql/resolvers"
import typeDefs from "./schema"
dotenv.config({
  debug: true
})

export const server = new ApolloServer({
  typeDefs,
  context: async () => {
    const { default: ctx } = await import("./gql/resolvers/ResolverContext")
    const secrets = new Map().set("MONGO_URL", process.env.MONGO_URL)
    return { ...ctx, secrets }
  },
  resolvers: {
    Breeding: () => Breeding,
    Dragon,
    Tier,
    Deck,
    Query
  }
})
// class MongoID extends ObjectID {
//   public serialize() {
//     const _id = this.toHexString()
//     const oid = { _id }
//     return {
//       oid
//     }
//   }
// }
// type IDRecord<T> = T extends object
//   ? { _id: string } & T
//   : { _id: string; data: T }
// type Opts = "DOUBLE" | "SINGLE"
// type Node<T extends Opts, V> = T extends "DOUBLE"
//   ? {
//       value: V
//       next?: Node<T, V> | null
//       prev?: Node<T, V> | null
//     }
//   : T extends "SINGLE"
//   ? {
//       value: V
//       next?: Node<T, V>
//     }
//   : never
// class ListNode<T> {
//   constructor(
//     public value: T,
//     public next: Node<Opts, T> | null = null,
//     public prev: Node<Opts, T> | null = null
//   ) {}
// }

// class SinglyLinkedList<T = any> {
//   public head?: Node<"DOUBLE", T>
//   public tail?: Node<"DOUBLE", T>

//   public prepend(value: T) {
//     let node: ListNode<T>
//     if (this.head) {
//       const { head } = this
//       node = new ListNode(value, head)
//       head.next = node
//     } else {
//       node = new ListNode(value)
//     }

//     this.head = node

//     return this
//   }

//   public add(value: T) {
//     let node: ListNode<T>
//     const { tail } = this
//     if (tail) {
//       node = new ListNode(value, null, tail)
//       tail.next = node
//     } else {
//       node = new ListNode(value)
//     }

//     this.tail = node
//     return this
//   }

//   public pop(): T | null {
//     if (this.tail) {
//       const { tail } = this
//       const newTail = tail.prev!
//       if (newTail !== null) {
//         this.tail = newTail
//         newTail.next = null
//       }
//       tail.prev = tail.next = null
//       return tail.value
//     }
//     return null
//   }

//   public shift(): T | null {
//     if (this.head) {
//       const { head } = this
//       if (head.next) {
//         this.head = head.next
//         head.next.prev = head.next = head.prev = null
//         return this.head.value
//       } else {
//         head.prev = null
//         this.head = undefined
//       }
//     }
//     return null
//   }
// }
// const isPlainObject = (o: unknown): o is object => typeof o === "object"
// const map = new WeakMap<IDMap<unknown>, Map<MongoID, IDRecord<any>>>()
// class IDMap<T> {
//   constructor() {
//     map.set(this, new Map<MongoID, IDRecord<T>>())
//   }
//   private pointers = new SinglyLinkedList()

//   add(item: T) {
//     const dict: Map<MongoID, IDRecord<T>> = map.get(this)!

//     let key: string | number
//     if (
//       isPlainObject(item) ||
//       Array.isArray(item) ||
//       typeof item === "symbol"
//     ) {
//       key = item.toString()
//     } else {
//       switch (typeof item) {
//         case "number":
//         case "bigint":
//           key = Number(item)
//           break
//         case "string":
//           const n = Number.parseInt(item, 10)
//           if (Object.is(n, NaN) || n !== n) key = item
//           else key = n
//           break
//         default:
//           key = `${item}`
//       }
//     }

//     const mid = new MongoID(key)
//     const { oid } = mid.serialize()
//     let record: IDRecord<T> | IDRecord<Exclude<T, object>>
//     if (!Array.isArray(item) && typeof item === "object") {
//       record = {
//         ...oid,
//         ...item
//       } as IDRecord<T>
//       dict.set(mid, record)
//     } else {
//       record = {
//         ...oid,
//         data: item
//       } as IDRecord<Exclude<T, object>>
//     }

//     dict.set(mid, record)

//     this.pointers.add(mid)

//     return this
//   }

//   private removeHead() {
//     const dict: Map<MongoID, IDRecord<T>> = map.get(this)!
//     const mid = this.pointers.shift()
//     if (mid instanceof MongoID) {
//       dict.delete(mid)
//     }
//   }

//   private removeTail() {
//     const dict: Map<MongoID, IDRecord<T>> = map.get(this)!
//     const mid = this.pointers.pop()
//     if (mid instanceof MongoID) {
//       dict.delete(mid)
//     }
//   }

//   public shift() {
//     if (this.pointers.head) this.removeHead()
//   }

//   public pop() {
//     if (this.pointers.tail) this.removeTail()
//   }
// }
// const splice = <T>(tar: T[], i: [number, number?]): T[] => [...tar].splice(...i)

// const list = new WeakMap<IDList<any>, any[]>()
// class IDList<T> {
//   constructor(el?: IDRecord<T>[]) {
//     if (el) {
//       this._list = el
//       list.set(this, el)
//     } else list.set(this, [])
//   }
//   private _list: IDRecord<T>[] = []
//   private createItem(item: T): IDRecord<T> {
//     let key: string | number
//     if (!Array.isArray(item) && isPlainObject(item)) {
//       key = item.toString()
//     } else if (typeof item === "number" || typeof item === "bigint") {
//       key = Number(item)
//     } else key = `${item}`

//     const mid = new MongoID(key)
//     const { oid } = mid.serialize()
//     if (!Array.isArray(item) && isPlainObject(item)) {
//       return {
//         ...oid,
//         ...item
//       } as IDRecord<T & object>
//     }

//     return {
//       ...oid,
//       data: item
//     } as IDRecord<Exclude<T, object>>
//   }

//   public push(item: T) {
//     const record = this.createItem(item)
//     this._list.push(record)
//     list.get(this)!.push(item)
//     return this
//   }

//   public get length() {
//     return this._list.length
//   }

//   public pop() {
//     this._list.pop()
//     list.get(this)!.pop()
//     return this
//   }

//   public splice(start: number, finish?: number) {
//     const { _list: l } = this
//     const i = <[number, number?]>[start, finish]
//     this._list = splice(l, i)
//     list.set(this, splice(list.get(this)!, i))
//     return this
//   }

//   public map<R>(f: (o: T, k: string, i: number) => R) {
//     const { _list } = this
//     const l = _list.map(({ _id, ...rest }, i) => {
//       //@ts-ignore
//       if ((rest as IDRecord<Exclude<T, object>> & { data: T }).data) {
//         return {
//           _id,
//           data: f(
//             (rest as IDRecord<Exclude<T, object>> & { data: T }).data,
//             _id,
//             i
//           )
//         }
//       }

//       return { _id, ...f((rest as unknown) as T, _id, i) }
//     })

//     return new IDList<R>(l as IDRecord<R>[])
//   }

//   public filter(...s: ArgumentType<IDRecord<T>[]["filter"]>) {
//     const l = this._list.filter(...s)
//     return new IDList(l)
//   }

//   *[Symbol.iterator]() {
//     for (const val of this._list) yield val
//   }

//   public *ids() {
//     for (const { _id } of this) yield _id
//   }

//   public *values() {
//     for (const { _id, ...rest } of this) yield rest
//   }

//   public keys() {
//     return this._list.keys()
//   }

//   public entries() {
//     return this._list.entries()
//   }
// }
