import React from "react"
import { Route } from "react-router-dom"
import AppProviders from "./AppProviders"
import Vault from "./Vault"
declare global {
  interface Window {
    process: {
      env: Record<string, string | undefined> & {
        APP_NAME: string
      }
    }
  }
  type ReactPropsType<T> = T extends React.FC<infer Props>
    ? Props
    : T extends React.Component<infer Props> | React.PureComponent<infer Props>
    ? Props
    : T extends React.ComponentType<infer Props>
    ? Props
    : never
}

// type Prop<T> = ReactPropsType<Vault<T>>
const Main = <T extends any = any>({
  client,
  children
}: Pick<ReactPropsType<AppProviders<T>>, "client" | "children">) => (
  <AppProviders<T> name={window.process.env.APP_NAME} client={client}>
    <Vault<T> name={window.process.env.APP_NAME}>{children}</Vault>
  </AppProviders>
)

interface RouteProps<T>
  extends Pick<ReactPropsType<AppProviders<T>>, "client">,
    ReactPropsType<typeof Route> {}
export default <T extends any>(props: RouteProps<T>) => (
  <Route<typeof props> path="/dragons" component={Main} {...props} />
)
