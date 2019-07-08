import { ResolverContext } from "../ResolverContext"

export const dragon = (
  _: any,
  drag: string,
  { dragons: { db } }: ResolverContext
) => db.find({ identifier: drag }).exec()
