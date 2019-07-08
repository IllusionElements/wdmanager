import { lazy } from "@manager/utils"

export const Dragon = {
  rarity: lazy(() => import("./rarity"), "rarity"),
  incubatorLevel: lazy(() => import("./incubatorLevel"), "incubatorLevel"),
  breedableLevel: lazy(() => import("./breedableLevel"), "breedableLevel"),
  breedingCaveLevel: lazy(
    () => import("./breedingCaveLevel"),
    "breedingCaveLevel"
  ),
  isDivine: lazy(() => import("./isDivine"), "isDivine"),
  frags: lazy(() => import("./frags"), "frags"),
  class: lazy(() => import("./dragonClass"), "dragonClass"),
  title: lazy(() => import("./title"), "title"),
  defaultIconFileName: lazy(
    () => import("./defaultIconFileName"),
    "defaultIconFileName"
  ),
  levels: lazy(() => import("./levels"), "levels")
}
