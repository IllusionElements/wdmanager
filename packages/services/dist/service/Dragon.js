var __decorate =
  (this && this.__decorate) ||
  function(decorators, target, key, desc) {
    var c = arguments.length,
      r =
        c < 3
          ? target
          : desc === null
          ? (desc = Object.getOwnPropertyDescriptor(target, key))
          : desc,
      d
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      r = Reflect.decorate(decorators, target, key, desc)
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if ((d = decorators[i]))
          r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r
    return c > 3 && r && Object.defineProperty(target, key, r), r
  }
var __metadata =
  (this && this.__metadata) ||
  function(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
      return Reflect.metadata(k, v)
  }
const INVALID_CHARS = [/{/, /}/, /\$/, /\\/, /\//]
var DragonService_1
import { service } from "../service"
import { Dragons, Tiers } from "../db"
import { Rarities } from "../Rarity"
let DragonService = (DragonService_1 = class DragonService {
  constructor() {
    this.rarity = DragonService_1.rarity
    // console.log(this.db)
  }
  findDragon({ identifier }) {
    console.log({arguments})
    return this.db.Dragons.findOne({
      identifier
    })
  }

  queryDragons({ displayName: name }) {
    const invalidChar = INVALID_CHARS.find(r => !name.match(r))
    if (invalidChar) {
      throw new Error(`invalid char ${invalidChar} detected in input`)
    }
    const displayName = new RegExp(`^${displayName}.*`, "i")
    return this.db.Dragons.find({
      displayName,
      isAttainable: true,
      isEvolveDragon: true
    })
  }
})
DragonService.rarity = new Map(Rarities)
DragonService = DragonService_1 = __decorate(
  [
    service(() => ({
      Dragons,
      Tiers
    })),
    __metadata("design:paramtypes", [])
  ],
  DragonService
)
export default DragonService
