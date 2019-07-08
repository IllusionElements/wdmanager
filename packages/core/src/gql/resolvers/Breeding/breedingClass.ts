import { IEggs } from "@manager/services"
import { ResolverContext } from "../ResolverContext"
declare global {
  interface ObjectConstructor {
    keys<T extends object>(o: T): Array<keyof T>
  }
}
export default class Breeding {
  public id = (root: IEggs) => root.deck

  public async children(root: IEggs, _: any, context: ResolverContext) {
    const [
      { deck },
      {
        decks: { db: Deck }
      },
      { default: pipeline }
    ] = [root, context, await import("./pipeline")]
    const [children, breedMatches] = pipeline.$unwind
    const aggregation = Deck.aggregate()
    const results = aggregation
      .match(pipeline.$match(deck))
      .unwind(children)
      .lookup(pipeline.$lookup)
      .unwind(breedMatches)
      .replaceRoot(pipeline.$replaceRoot)

    const dragonChildren = await results.exec()

    return dragonChildren
  }

  public async parents(root: IEggs, _: any, context: ResolverContext) {
    const { firstDragonIdentifier, secondDragonIdentifier, deck } = root
    const { service: dragons } = context.dragons
    const firstParent = dragons
      .findDragon({ identifier: firstDragonIdentifier })
      .exec()
    const secondParent = dragons
      .findDragon({ identifier: secondDragonIdentifier })
      .exec()
    const [first, second] = await Promise.all([firstParent, secondParent])

    return {
      id: deck,
      first,
      second
    }
  }

  public eggNumber(root: IEggs, _: any, _context: ResolverContext) {
    return Number.parseInt(<string>(<unknown>root.eggNumber), 10)
  }
}
