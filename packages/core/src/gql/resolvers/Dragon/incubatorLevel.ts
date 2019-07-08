import { DragonResolver } from "./DragonResolver"
export const incubatorLevel: DragonResolver<number | string> = ({
  incubationBuildingLevelRequirement
}) => incubationBuildingLevelRequirement
