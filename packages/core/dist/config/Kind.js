class Kinds {
  constructor(ResolverTypes) {
    this.ResolverTypes = new ResolverTypes()
    this.BREED = Symbol("@@BREEDING")
    this.PARENT_DRAG = Symbol("@@PARENT_DRAG")
  }
}
export const Kind = new Kinds(
  class ResolveType {
    constructor() {
      this.BREEDING = "Breeding"
      this.DRAGON_PARENTS = `DragonParents`
    }
  }
)
