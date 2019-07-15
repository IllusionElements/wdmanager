import React, { useCallback } from "react"
import DragonSelect from "./Dragon"
import { DragonContext, useDragons } from "hooks/useSetDragon/DragonContext"
import Container from "@material-ui/core/Container"
import Grid from "@material-ui/core/Grid"
import { makeStyles, createStyles } from "@material-ui/styles"
import { Theme, Paper } from "@material-ui/core"
import { renderInput, renderDragon } from "./MenuItem"
import { GetLabelPropsOptions, GetItemPropsOptions } from "downshift"
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
  } as const)
)

const capitialize = (a: string) =>
  a.substr(0, 1).toLocaleUpperCase() + a.slice(1)
const DragonMenu: React.FC<{ position: "first" | "second" }> = ({
  position
}) => {
  const dragons = useDragons(position)
  const classes = useStyles()
  const mapDragons = useCallback(
    (
      getItemProps: (options: GetItemPropsOptions<any>) => any,
      highlightedIndex: number | null,
      selectedItem: string
    ) => {
      return dragons.map((dragon, index) =>
        renderDragon({
          dragon,
          index,
          itemProps: getItemProps({ item: dragon.displayName }),
          highlightedIndex,
          selectedItem
        })
      )
    },
    [dragons]
  )
  // opts.shr
  return (
    <DragonSelect position={position}>
      {({
        clearSelection,
        openMenu,
        getInputProps,
        getItemProps,
        getLabelProps,
        getMenuProps,
        highlightedIndex,
        isOpen,
        selectedItem
      }) => {
        const { onBlur, onChange, onFocus, ...inputProps } = getInputProps({
          onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
            if (event.target.value === "") {
              clearSelection()
            }
          },
          onFocus: openMenu,
          placeholder: "Search for a dragon"
        })
        return (
          <>
            <Grid>
              {renderInput({
                fullWidth: true,
                classes,
                label: capitialize(position).concat(" Parent"),
                InputLabelProps: {
                  ...getLabelProps(),
                  shrink: true
                },
                InputProps: { onBlur, onFocus },
                inputProps
              })}
            </Grid>
            <Grid {...getMenuProps()}>
              {isOpen ? (
                <Paper>
                  {mapDragons(getItemProps, highlightedIndex, selectedItem)}
                </Paper>
              ) : null}
            </Grid>
          </>
        )
      }}
    </DragonSelect>
  )
}
export default DragonMenu
