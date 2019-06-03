import { IDragon, Dragons } from "../../services/src/db/dragon"
import DragonService from "./../../services/src/Dragon"
import { ResolverContext } from "./ResolverContext"
const resolver = {
  tiers: (
    _root: IDragon,
    _,
    context: { dragons: { db: typeof Dragons; service: DragonService } }
  ) => context.dragons.service.getAllTiers(),
  dragons: (_root: IDragon, _, context: ResolverContext) => {}
}
