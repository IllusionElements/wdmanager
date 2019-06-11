import React, { ReactNode } from "react"
import AppBar from "@material-ui/core/AppBar"
import Drawer from "@material-ui/core/Drawer"

const Dash: React.FC<{
  drawer: ReactNode
}> = props => (
  <AppBar position="fixed">
    <Drawer>{props.drawer}</Drawer>
    {props.children}
  </AppBar>
)

export default Dash
