import React from "react"
import logo from "./logo.svg"
import { Link } from "react-router-dom"
import styled, { keyframes } from "styled-components"
const Main = styled.div`
  text-align: center;
`
const appLogoSpin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }

`
const Logo = styled.Logo`
  animation: ${appLogoSpin} infinite 20s linear;
  height: 40vmin;
  pointer-events: none;
`

const AppLink = styled.AppLink`
  color: #61dafb;
`
const AppHeader = styled.header`
  background-color: #282c34;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
`
const Code = styled.Code`
  font-family: source-code-pro, Menlo, Monaco, Consolas, "Courier New",
    monospace;
`
export const App: React.FC<{ path?: string }> = () => {
  return (
    <Main>
      <AppHeader>
        <Logo src={logo} alt="logo" />
        <p>
          Edit <Code>src/App.tsx</Code> and save to reload.
        </p>
        <Link to="/dragons">Dragons</Link>
        <Link to="/breeding">Breeding</Link>
        <AppLink
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </AppLink>
      </AppHeader>
    </Main>
  )
}
