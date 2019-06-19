import { configure } from "@storybook/react"

function loadStories() {
  require("../disttouc/stories")
}

configure(loadStories, module)
