db.getCollection("tiers").aggregate(

	// Pipeline
	[
		// Stage 1
		{
			$lookup: // Equality Match
			  {
			    from: "dragons",
			    //    localField: "tier",
			    //    foreignField: "defaultTierNumber",
			    let: { tier: "$tier" },
			    pipeline: [
			      {
			        $match: {
			          $expr: {
			            $and: [
			              {
			                $or: [
			                  {
			                    isAttainable: "1"
			                  },
			                  {
			                    isShrineDragon: "1"
			                  }
			                ]
			              },
			              {
			                $eq: ["$defaultTierNumber", "$$tier"]
			              }
			            ]
			          }
			        }
			      }
			    ],
			    as: "dragons"
			  }
		},

		// Stage 2
		{
			$sort: {
				tier: 1
			}
		},

	]

	// Created with Studio 3T, the IDE for MongoDB - https://studio3t.com/

);
