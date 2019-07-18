import React from "react"
import { Route } from "react-router-dom"
import AppProviders from "./AppProviders"

declare global {
  interface Window {
    process: {
      env: Record<string, string | undefined> & {
        APP_NAME: string
      }
    }
  }
}
const Vault = React.lazy(() => import("./Vault"))
//@ts-ignore
type RouteP<T> = Pick<ReactPropsType<AppProviders<T>>, "client">

// type Prop<T> = ReactPropsType<Vault<T>>
//@ts-ignore
const Main = <T extends any = any>({ client, children }: RouteP<T>) => (
  //@ts-ignore
  <AppProviders<T> name={window.process.env.APP_NAME} client={client}>
    <Vault name={window.process.env.APP_NAME}>{children}</Vault>
  </AppProviders>
)

interface RouteProps<T> extends RouteP<T>, ReactPropsType<typeof Route> {} //@ts-ignore
export default <T extends any>(props: RouteProps<T>) => (
  <Route<typeof props> path="/dragons" component={Main} {...props} />
)
