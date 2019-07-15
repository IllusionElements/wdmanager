import React from "react"
import ReactDOM from "react-dom"
import { CircularProgress } from "@material-ui/core"
import { BrowserRouter, Switch } from "react-router-dom"
import client from "./apollo/client"
import { App } from "./App"
import Vault from "./containers"
import TierList from "./containers/TierList"
import { CloudinaryProvider } from "./hooks/useCloudinary"
import "./index.css"
import * as serviceWorker from "./serviceWorker"
const DragonMain = React.lazy(() => import("./containers/Dragon"))
const Breeding = React.lazy(() => import("./containers/Breeding"))

const Dragon = ({ dragon, ...props }: { dragon?: string; path?: string }) => {
  return <DragonMain dragon={dragon} {...props} />
}
const Body = () => (
  <Switch>
    <Vault<{}> client={client}>
      <TierList path="/dragons" />
      <Dragon path="/dragons/:dragon" />
    </Vault>
    <Breeding />
    <App />
  </Switch>
)
const Main: React.FC<{ forceRefresh?: boolean }> = ({
  forceRefresh = false
}: {
  forceRefresh?: boolean
} = {}) => (
  <CloudinaryProvider cloudName="dl55xp184">
    <React.Suspense fallback={<CircularProgress />}>
      <BrowserRouter basename="/" forceRefresh={forceRefresh}>
        <Body />
      </BrowserRouter>
    </React.Suspense>
  </CloudinaryProvider>
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
