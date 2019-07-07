export interface Colors<
  T extends {
    background?: Record<string, string>
    text?: Record<string, string>
  }
> {
  background: Record<"primary" | "secondary" | keyof T["background"], string>
  text?: Record<"primaryText" | "secondaryText" | keyof T["text"], string>
}
export const createTheme = <
  T extends {
    background?: Record<string, string>
    text?: Record<string, string>
  }
>(
  primary: string,
  secondary: string,
  primaryText: string,
  secondaryText: string,
  { background = {}, text = {} }: T
) =>
  ({
    background: {
      primary,
      secondary,
      ...background
    },
    text: {
      primaryText,
      secondaryText,
      ...text
    }
  } as Colors<T>)
