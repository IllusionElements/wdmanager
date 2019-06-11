import * as Elements from "./Element"

const entries = [
  [
    "windElement",
    {
      displayName: "WIND",
      icon: "element-wind"
    }
  ],
  [
    "earthElement",
    {
      displayName: "EARTH",
      icon: "element-earth"
    }
  ],
  [
    "darkElement",
    {
      displayName: "DARK",
      icon: "element-dark"
    }
  ],
  [
    "fireElement",
    {
      displayName: "FIRE",
      icon: "element-fire"
    }
  ],
  [
    "iceElement",
    {
      displayName: "ICE",
      icon: "element-ice"
    }
  ]
] as const
const isValidInstance = <T extends Function>(n: unknown, klass: T): n is T =>
  n instanceof klass
class ElementMap extends Map<Elements.Keys, Elements.Values> {
  static instance?: ElementMap

  constructor() {
    super(entries)

    if (isValidInstance(ElementMap.instance, ElementMap)) {
      return ElementMap.instance
    } else {
      Object.defineProperty(ElementMap, "instance", {
        value: this,
        configurable: false,
        writable: false,
        enumerable: false
      })
    }
    for (const [k, el] of entries) {
      if (!this.has(k)) {
        super.set(k, el)
      }
      console.log({ k, el })
    }
  }

  public get(id: Elements.Keys) {
    console.log(id)
    return super.get(id)!
  }

  public set() {
    return this
  }
}

export default new ElementMap()
