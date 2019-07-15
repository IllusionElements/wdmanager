import React from "react"
import { Link, Route } from "react-router-dom"
import TierMenu from "./Tier"
import DragonMenu from "./Menu"
import Container from "@material-ui/core/Container"
import Grid, { GridSize } from "@material-ui/core/Grid"
import { useDragonsDispatch } from "hooks/useSetDragon/DragonContext"
import { DragonQueryAction } from "hooks/useSetDragon/dragons"
const Item: React.FC<{
  sizes: Optional<Record<"lg" | "xl" | "sm" | "xs" | "med" | "xl", GridSize>>
}> = props => <Grid {...props.sizes}>{props.children}</Grid>
const LARGE = 6
const SMALL = 12
const XS = 4 as const
const defaultSizes = {
  lg: LARGE,
  med: LARGE,
  sm: SMALL,
  xs: SMALL
} as const
const menuSize = {
  lg: XS,
  xl: XS,
  sm: XS,
  xs: XS,
  med: XS
}

const Tier = () => {
  const dispatch = useDragonsDispatch()
  const dispatchTier = React.useCallback(
    (tier: number) =>
      dispatch({
        type: DragonQueryAction.UPDATE_TIER,
        payload: { tier }
      }),
    [dispatch]
  )
  return (
    <Item sizes={menuSize}>
      <TierMenu setTier={dispatchTier} />
    </Item>
  )
}
const BreedingSearch = () => (
  <>
    <Item sizes={defaultSizes}>
      <DragonMenu position="first" />
    </Item>
    <Item sizes={defaultSizes}>
      <DragonMenu position="second" />
    </Item>
  </>
)
const BreedingSearchContainer: React.FC = () => {
  return (
    <Container>
      <Tier />
      <BreedingSearch />
      <Link to="/home" />
    </Container>
  )
}

export default () => (
  <Route path="/breeding" component={BreedingSearchContainer} />
)

// function combine<T>(...funcs: ((x: T) => void)[]): (x: T) => void {
//     return x => {
//         for (const f of funcs) f(x);
//     }
// }
