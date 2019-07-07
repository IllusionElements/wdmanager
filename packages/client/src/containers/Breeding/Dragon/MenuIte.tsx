import React, { useMemo } from "react"
import PropTypes from "prop-types"
import deburr from "lodash/deburr"
import Downshift from "downshift"
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"
import TextField, { TextFieldProps } from "@material-ui/core/TextField"
import Popper from "@material-ui/core/Popper"
import Paper from "@material-ui/core/Paper"
import MenuItem, { MenuItemProps } from "@material-ui/core/MenuItem"
import Chip from "@material-ui/core/Chip"
import { Dragon } from "./state"

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      height: 250
    },
    container: {
      flexGrow: 1,
      position: "relative"
    },
    paper: {
      position: "absolute",
      zIndex: 1,
      marginTop: theme.spacing(1),
      left: 0,
      right: 0
    },
    chip: {
      margin: theme.spacing(0.5, 0.25)
    },
    inputRoot: {
      flexWrap: "wrap"
    },
    inputInput: {
      width: "auto",
      flexGrow: 1
    },
    divider: {
      height: theme.spacing(2)
    }
  })
)
type RenderInputProps = TextFieldProps & {
  classes: ReturnType<typeof useStyles>
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
  highlightedIndex: number
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
const createMemoStyle = memoStyle("fontWeight", () => 500, () => 400)
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
  const isSelected = Boolean(~(selectedItem || "").indexOf(dragon._id))
  const style = createMemoStyle(isSelected)
  return (
    <MenuItem
      {...itemProps}
      key={dragon._id}
      selected={isHighlighted}
      component="div"
      style={style}
    >
      {dragon.displayName}
    </MenuItem>
  )
}
