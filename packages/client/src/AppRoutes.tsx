import React from "react"
import { Switch, Route } from "react-router-dom"
import { App } from "./App"
import { DragonProvider } from "hooks/useSetDragon/DragonContext"
const Breeding = React.lazy(() => import("./containers/Breeding"))
const TierList = React.lazy(() => import("./containers/TierList"))
export const AppRoutes = () => (
  <Switch>
    <Route path="/" component={App} exact />
    <Route path="/dragons" component={TierList} />
    <DragonProvider>
      <Breeding />
    </DragonProvider>
  </Switch>
)
