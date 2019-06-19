//@ts-nocheck
import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter } from "react-router-dom"
import "./index.css"
import client from "./apollo/client"
import { App } from "./App"
import Vault from "./components"
import * as serviceWorker from "./serviceWorker"
import TierList from "./components/TierList"
import { CloudinaryProvider } from "./hooks/useCloudinary"
import { CircularProgress } from "@material-ui/core"

const DragonMain = React.lazy(() => import("./components/Dragon"))
const Dragon = ({ dragon, ...props }: { dragon?: string; path?: string }) => {
  return <DragonMain dragon={dragon} {...props} />
}

const Main: React.FC<{ forceRefresh?: boolean }> = ({
  forceRefresh = false
}: {
  forceRefresh?: boolean
} = {}) => (
  <CloudinaryProvider cloudName="dl55xp184">
    <React.Suspense fallback={<CircularProgress />}>
      <BrowserRouter basename="/" forceRefresh={forceRefresh}>
        <Vault<{}> client={client}>
          <TierList path="/dragons" />
          <Dragon path="/dragons/:dragon" />
        </Vault>
        <App />
      </BrowserRouter>
    </React.Suspense>
  </CloudinaryProvider>
)

const doFork = <T extends boolean, F>(
  predicate: T,
  a: () => F,
  b: () => F
): F => {
  if (predicate) {
    return a()
  }

  return b()
}
const HISTORY = "history" as const
const isHistoryAPISupported = HISTORY in window
ReactDOM.render(
  <React.StrictMode>
    {doFork(
      isHistoryAPISupported,
      () => (
        <Main />
      ),
      () => (
        <Main forceRefresh />
      )
    )}
  </React.StrictMode>,
  document.getElementById("root")
)
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
