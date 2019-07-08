export default async (root, _, ctx, ast) => {
  const { dragonParents } = await import("../Query/breeding")
  console.log({ root })
  const { identifier: id } = root
  return dragonParents(root, { child: { id } }, ctx, ast)
}
