export default {
  match: dragonIdentifier => {
    if (typeof dragonIdentifier !== "string") {
      throw new TypeError(
        `expected type STRING for dragonIndentifier but found ${typeof dragonIdentifier} instead`
      )
    }
    return {
      dragonIdentifier
    }
  },
  $lookup: {
    from: "eggs",
    let: {
      id: "$deck"
    },
    pipeline: [
      {
        $match: {
          $expr: {
            $eq: ["$deck", "$$id"]
          }
        }
      },
      {
        $lookup: {
          from: "dragons",
          let: {
            first_drag: "$firstDragonIdentifier",
            second_drag: "$secondDragonIdentifier"
          },
          pipeline: [
            {
              $match: {
                $expr: {
                  $or: [
                    {
                      $eq: ["$identifier", "$$first_drag"]
                    },
                    {
                      $eq: ["$identifier", "$$second_drag"]
                    }
                  ]
                }
              }
            }
          ],
          as: "parents"
        }
      }
    ],
    as: "decks"
  },
  $unwind: "$decks"
}
