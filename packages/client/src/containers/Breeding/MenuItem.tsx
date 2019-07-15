import React from "react"
import TextField, { TextFieldProps } from "@material-ui/core/TextField"
import MenuItem, { MenuItemProps } from "@material-ui/core/MenuItem"
import { Dragon } from "./Dragon/state"

type RenderInputProps = TextFieldProps & {
  classes: Record<
    | "root"
    | "container"
    | "paper"
    | "chip"
    | "inputRoot"
    | "inputInput"
    | "divider",
    string
  >
  ref?: React.Ref<HTMLDivElement>
}

export const renderInput: ReactFactory<RenderInputProps> = inputProps => {
  const { InputProps, classes, ref, ...other } = inputProps

  return (
    <TextField
      InputProps={{
        inputRef: ref,
        classes: {
          root: classes.inputRoot,
          input: classes.inputInput
        },
        ...InputProps
      }}
      {...other}
    />
  )
}

interface RenderDragonProps {
  dragon: Dragon
  index: number
  itemProps: MenuItemProps<"div", { button?: never }>
  highlightedIndex: number | null
  selectedItem: string
}

const memoStyle = <S extends string, T extends number, U extends number>(
  ...args: [S, Types.FNVoid<T>, Types.FNVoid<U>]
) => {
  const memoCache = new Map<boolean, Record<typeof args[0], T | U>>()
  return (a: boolean): { [s in S]: T | U } => {
    if (memoCache.has(a)) {
      return memoCache.get(a)!
    }
    const [key, branchA, branchB] = args

    const val = {
      [key]: a ? branchA() : branchB()
    } as { [s in S]: T | U }
    return memoCache.set(a, val) && val
  }
}
export const renderDragon: ReactFactory<
  RenderDragonProps
> = suggestionProps => {
  const {
    dragon,
    index,
    itemProps,
    highlightedIndex,
    selectedItem
  } = suggestionProps
  const isHighlighted = highlightedIndex === index
  const isSelected = selectedItem === dragon._id

  return (
    <MenuItem
      {...itemProps}
      key={dragon._id}
      selected={isHighlighted}
      component="div"
      style={{
        fontWeight: isSelected ? 500 : 400
      }}
    >
      {dragon.displayName}
    </MenuItem>
  )
}
