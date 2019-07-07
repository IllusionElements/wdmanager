import { createTheme } from "../createTheme"
enum Grey {
  LIGHT = "#212121",
  DARK = "#1c1c1c",
  HIGHLIGHT = "#0f1214"
}

enum TextColor {
  DARK = "#a6a6a6",
  LIGHT = "#FFFFFF"
}

export default createTheme(
  Grey.LIGHT,
  Grey.DARK,
  TextColor.LIGHT,
  TextColor.DARK,
  {
    background: {
      highlight: Grey.HIGHLIGHT
    }
  } as const
)
