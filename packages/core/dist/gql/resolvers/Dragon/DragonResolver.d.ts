import { IDragon } from "@manager/services";
import { ResolverContext } from "../ResolverContext";
export declare type DragonResolver<R> = (dragon: IDragon, _: any, ctx: ResolverContext) => R;
