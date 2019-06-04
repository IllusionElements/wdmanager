import { IDragon, Tier } from "@manager/services";
import { ResolverContext } from "../ResolverContext";
export declare const Dragon: Record<string, (dragon: IDragon, _: any, ctx: ResolverContext) => unknown>;
export declare const TierType: Record<string, (tier: Tier, _: {}, context: ResolverContext) => unknown>;
export declare const breeding: {};
export declare const Query: {
    tiers: (_root: IDragon, _: any, context: ResolverContext) => Promise<IDragon[]>;
    dragons: (_root: any, _: any, context: ResolverContext) => Promise<any>;
};
