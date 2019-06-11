const pick = key => o => o[key]
export default async () =>
  import("./data/results/dragon.json").then(pick("default"))
