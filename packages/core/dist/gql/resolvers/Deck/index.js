import idx from "idx"
const pickPath = path => root =>
  idx(root, _ => ["newRoot", ...path].reduce((o, key) => o[key], _)) ||
  path.reduce((o, key) => o[key], root)
export default {
  _id: root => (
    console.log(root),
    root._id
      ? root._id
      : import("mongodb").then(({ ObjectID }) => new ObjectID())
  ),
  fragments: pickPath(["dragon", "numberOfFragmentsNeeded"]),
  dragon: pickPath(["dragon"]),
  probability: pickPath(["breedChance"])
}
