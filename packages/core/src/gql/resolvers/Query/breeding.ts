import { ResolverContext } from "../ResolverContext"

type Parent = {
  first: string
  second: string
}

export const dragonChildren = (
  _: any,
  args: { parents: Parent } | Parent,
  { eggs: { service: eggService } }: ResolverContext
) => eggService.findChildren("parents" in args ? args.parents : args)

export const dragonParents = (
  _: any,
  { child }: { child: string },
  { eggs }: ResolverContext
) => eggs.service.findParents({ child })
