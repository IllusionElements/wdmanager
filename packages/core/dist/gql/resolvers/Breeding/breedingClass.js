import * as Events from "./Emitter"
Events.Emitter.on(Events.INSTALLED, ({ args }) => console.log(args))
export default class Breeding {
  constructor() {
    this.id = root => root.deck.deck
  }
  async children(root, _, context) {
    console.group("Breeding.Children")
    if (Array.isArray(root)) {
      const result = root.map(model => this.children(model, _, context))
      return Promise.all(result)
    }
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
      .limit(100)
    console.log({ results })
    const dragonChildren = await results.exec()
    console.log("dragonChildren", dragonChildren)
    console.groupEnd("Breeding.Children")
    return dragonChildren
  }
  parents(root) {
    throw new Error(require("util").inspect(root, { depth: 5 }))
    console.log({ root })
  }
  eggNumber(root, _, _context) {
    return Number.parseInt(root.eggNumber, 10)
  }
}
