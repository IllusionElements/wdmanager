import React from "react"
import { render } from "react-dom"
import { CssBaseline } from "@material-ui/core"
import { BrowserRouter } from "react-router-dom"
import "./index.css"
import * as serviceWorker from "./serviceWorker"
import { AppRoutes } from "./AppRoutes"
import { AppProviders } from "./AppProviders"
import { LoadIndicator } from "./views/LoadIndicator"
const HISTORY = "history" as const
const historyAPIIsSupported = HISTORY in window
const App: React.FC = () => (
  <BrowserRouter basename="/" forceRefresh={historyAPIIsSupported}>
    <AppProviders>
      <React.Suspense fallback={<LoadIndicator />}>
        <AppRoutes />
      </React.Suspense>
    </AppProviders>
  </BrowserRouter>
)

const root = document.getElementById("root")

render(
  <>
    <CssBaseline />
    <App />
  </>,
  root
)
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register()
