import React from "react"

import { storiesOf } from "@storybook/react"
import { action } from "@storybook/addon-actions"
import { linkTo } from "@storybook/addon-links"
//@ts-ignore
import { Button, Welcome } from "@storybook/react/demo"

import TierList from "../components/Query/TierList"
import App from "../App"
import client from "../apollo/client"
storiesOf("Welcome", module).add("to Storybook", () => (
  <Welcome showApp={linkTo("Button")} />
))

storiesOf("Button", module)
  .add("with text", () => (
    <Button onClick={action("clicked")}>Hello Button</Button>
  ))
  .add("with some emoji", () => (
    <Button onClick={action("clicked")}>
      <span role="img" aria-label="so cool">
        😀 😎 👍 💯
      </span>
    </Button>
  ))
storiesOf("TierList", module).add("to Storybook", () => (
  <App name="DragonVault" client={client}>
    <TierList />
  </App>
))
