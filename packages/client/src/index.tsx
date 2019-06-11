//@ts-nocheck
import React from "react"
import ReactDOM from "react-dom"
import { Router } from "@reach/router"
import "./index.css"
import client from "./apollo/client"
import Vault, { App } from "./App"
import * as serviceWorker from "./serviceWorker"
import TierList from "./components/Query/TierList"
import { CloudinaryProvider } from "./components/hooks/useCloudinary"
import { CircularProgress } from "@material-ui/core"
const withStrictMode = (Child: React.ComponentType) => () => (
  <React.StrictMode>
    <Child />
  </React.StrictMode>
)
const DragonMain = React.lazy(() => import("./components/Query/Dragon"))
const Dragon = ({ dragon, ...props }: { dragon?: string; path?: string }) => {
  return <DragonMain dragon={dragon} {...props} />
}
// import { Query } from 'react-apollo';
const Main: React.FC = () => (
  <CloudinaryProvider cloudName="dl55xp184">
    <Router>
      <App path="/app" />
      <Vault name="DragonVault" client={client} path="/dragons">
        <TierList path="/" />
        <Dragon path="/:dragon" />
      </Vault>
    </Router>
  </CloudinaryProvider>
)
ReactDOM.render(
  <React.StrictMode>
    <React.Suspense fallback={<CircularProgress />}>
      <Main />
    </React.Suspense>
  </React.StrictMode>,
  document.getElementById("root")
)
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
