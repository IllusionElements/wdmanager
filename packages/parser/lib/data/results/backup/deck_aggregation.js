db.getCollection("decks").aggregate(

	// Pipeline
	[
		// Stage 1
		{
			$match: {
				deck: "deck0001"
			}
		},

		// Stage 2
		{
			$unwind: "$children"
		},

		// Stage 3
		{
			$lookup: // Equality Match
			{
			    from: "breeding",
			    let: {
			    	"ids": "$children"
			    },
			    pipeline: [{
			    	$match: {
			    		$expr: {
			    			$eq: ["$_id", "$$ids"]
			    		}
			    	}
			    }, {
			    	$lookup: {
			    from: "dragons",
			    localField: "dragonIdentifier",
			    foreignField: "identifier",
			    as: "dragon"
			}
			    }, {
			    	$project: {
			    		_id: 1,
			    		dragonIdentifier: 1,
			    		breedChance: 1,
			    		dragon: 1
			    	}
			    },{
			    	$unwind: "$dragon"
			    }],
			
			    as: "breedMatches"
			}
			
			// Uncorrelated Subqueries
			// (supported as of MongoDB 3.6)
			// {
			//    from: "<collection to join>",
			//    let: { <var_1>: <expression>, …, <var_n>: <expression> },
			//    pipeline: [ <pipeline to execute on the collection to join> ],
			//    as: "<output array field>"
			// }
		},

		// Stage 4
		{
			$unwind: "$breedMatches"
		},

		// Stage 5
		{
			$replaceRoot: {
			    newRoot: {
			    	_id: "$breedMatches._id",
			    	breedChance: "$breedMatches.breedChance",
			    	dragon: "$breedMatches.dragon"
			    }
			}
		},

	]

	// Created with Studio 3T, the IDE for MongoDB - https://studio3t.com/

);
