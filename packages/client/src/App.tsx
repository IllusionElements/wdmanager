import React from "react"
import logo from "./logo.svg"
import { NameProvider } from "./components/hooks/useName"
import { ApolloProvider } from "./components/hooks/useApollo"
import "./App.css"
import { ApolloClient } from "apollo-client"
import { Link } from "@reach/router"
import Typography from "@material-ui/core/Typography"
export const App: React.FC<{ path?: string }> = () => {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <Link to="/dragons">Dragons</Link>
      </header>
    </div>
  )
}

export default <T extends any>(props: {
  name: string
  client: ApolloClient<T>
  path?: string
  children?: React.ReactNode
}) => (
  <ApolloProvider client={props.client || {}}>
    <NameProvider name={props.name || ""}>
      <Typography variant="h1" >WELCOME TO DRAGON VAULT</Typography>
      <Link to="/app">App</Link>
      <br />
      <Link to="/dragons">Dragons</Link>
      {props.children}
    </NameProvider>
  </ApolloProvider>
)
