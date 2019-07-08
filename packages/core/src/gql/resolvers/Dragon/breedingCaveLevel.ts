import { DragonResolver } from "./DragonResolver"
export const breedingCaveLevel: DragonResolver<number> = ({
  minBreedingCaveBuildingLevelToBreed
}: {
  minBreedingCaveBuildingLevelToBreed: number
}) => minBreedingCaveBuildingLevelToBreed
