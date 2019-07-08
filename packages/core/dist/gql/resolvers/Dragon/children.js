const findChildrenWithBothParents = async (parents, context) => {
  const { dragonChildren } = await import("../Query/breeding")
  return dragonChildren(context.root, { parents }, context.ctx, context.ast)
}

const findChildWithOnlyOneParent = async (parent, { ctx }) => {
  const {
    eggs: { db: Eggs }
  } = ctx
  const query = Eggs.find()
  const deck = await query
    .or([
      {
        firstDragonIdentifier: parent
      },
      { secondDragonIdentifier: parent }
    ])
    .exec()

  console.log({ deck })
  return deck
}
export default async (root, args, ctx, ast) => {
  const params = {
    root,
    ctx,
    ast
  }
  console.log("child:", { root, args })
  return args.pair
    ? findChildrenWithBothParents(
        { first: root.identifier, second: args.pair.id },
        params
      )
    : findChildWithOnlyOneParent(root.identifier, params)
}
