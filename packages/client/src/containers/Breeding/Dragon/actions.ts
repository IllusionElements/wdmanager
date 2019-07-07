import { createAction } from "createAction"

export enum DragonActions {
  SET_DRAGONS
}
// eslint-disable-next-line @typescript-eslint/no-angle-bracket-type-assertion
export const action = <"SET_DRAGONS">DragonActions[DragonActions["SET_DRAGONS"]]

export type DragonAction = IAction<
  typeof action,
  typeof import("./state").dragonState["dragons"]
>

export const setDragon = createAction<DragonAction>(action)
