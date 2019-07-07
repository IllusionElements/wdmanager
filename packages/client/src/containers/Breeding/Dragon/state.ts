export interface Dragon {
  _id: string
  displayName: string
  identifier: string
  element: string
}

export interface DragonState {
  dragons: Dragon[]
}

export const dragonState: DragonState = {
  dragons: []
}
