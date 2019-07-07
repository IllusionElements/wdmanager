import React from "react"
import { Link } from "react-router-dom"
import Typography from "@material-ui/core/Typography"
import { VaultProps } from "./VaultProps"

const Entry = <T extends any>(
  props: Pick<VaultProps<T>, "name" | "children">
) => (
  <>
    <Typography variant="h1">WELCOME TO {props.name}</Typography>
    <Link to="/app">App</Link>
    <br />
    <Link to="/dragons">Dragons</Link>
    {props.children}
  </>
)
export default Entry
