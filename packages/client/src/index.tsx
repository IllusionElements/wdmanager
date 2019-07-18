import React from "react"
import ReactDOM from "react-dom"
import { CircularProgress } from "@material-ui/core"
import { BrowserRouter, Switch, Route } from "react-router-dom"
import client from "./apollo/client"
import { App } from "./App"
import Vault from "./containers"
import TierList from "./containers/TierList"
import { CloudinaryProvider } from "./hooks/useCloudinary"
import "./index.css"
import * as serviceWorker from "./serviceWorker"
import { ApolloClient } from "apollo-client"
import { ApolloProvider } from "./hooks/useApollo"
import { BreedProvider } from "containers/Breeding/Context"
import { DragonProvider } from "hooks/useSetDragon/DragonContext"
const DragonMain = React.lazy(() => import("./containers/Dragon"))
const Breeding = React.lazy(() => import("./containers/Breeding"))

const Dragon = ({ dragon, ...props }: { dragon?: string; path?: string }) => {
  return <DragonMain dragon={dragon} {...props} />
}
const Body = () => (
  <Switch>
    <Route path="/" component={App} exact />
    <Route path="/dragons" component={TierList} />

    <DragonProvider>
      <Breeding />
    </DragonProvider>
  </Switch>
)

// const ApolloContext = Context!
const Main: React.FC<{ forceRefresh?: boolean }> = ({
  forceRefresh = false
}: {
  forceRefresh?: boolean
} = {}) => (
  <BrowserRouter basename="/" forceRefresh={forceRefresh}>
    <ApolloProvider client={client}>
      <BreedProvider>
        <CloudinaryProvider cloudName="dl55xp184">
          <React.Suspense fallback={<CircularProgress />}>
            <Body />
          </React.Suspense>
        </CloudinaryProvider>
      </BreedProvider>
    </ApolloProvider>
  </BrowserRouter>
)

const root = document.getElementById("root")
const HISTORY = "history" as const
const historyAPIIsSupported = HISTORY in window
const render = (comp: React.ReactNode) =>
  ReactDOM.render(<React.StrictMode>{comp}</React.StrictMode>, root)
if (historyAPIIsSupported) {
  render(<Main />)
} else {
  render(<Main forceRefresh />)
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register()
