import React, { LazyExoticComponent } from "react"
import { Route } from "react-router-dom"

interface ReactLazyExoticComponent<T extends React.ComponentType<any>>
  extends LazyExoticComponent<T> {
  displayName: string
}

export default <T extends React.ComponentType<any>>({
  component: factory,
  path
}: {
  component: () => Promise<{
    default: T
  }>
  path: string
}) => {
  const LazyComponent = React.lazy<T>(factory) as ReactLazyExoticComponent<T>
  LazyComponent.displayName = `${path
    .substr(0)
    .toUpperCase()
    .concat(path.substr(1))}(LazyRoute(${LazyComponent.displayName}))`

  return <Route path={path} component={LazyComponent} />
}
