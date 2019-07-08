export const dragon = async (_, { name: drag }, { dragons: { db } }) => {
  const drag$ = await db.findOne({ identifier: drag }).exec()

  return drag$
}
