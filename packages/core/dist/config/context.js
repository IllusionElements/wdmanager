import Dataloader from "dataloader"

export default async () => {
  const { default: ctx } = await import("../gql/resolvers/ResolverContext")
  const secrets = new Map().set("MONGO_URL", process.env.MONGO_URL)
  return { ...ctx, secrets }
}
