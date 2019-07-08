// import { logger } from "../logger"
export const dragonChildren = (
  _,
  { parents },
  { eggs: { service: eggService } }
) => {
  console.log({ parents })
  return eggService.findChildren(parents)
}
export const dragonParents = async (_, { child: { id: child } }, { eggs }) =>
  eggs.service.findParents({ child })
