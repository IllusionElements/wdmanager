export const pipeline = {
    $lookup: {
        from: "decks",
        let: {
            deck: "$possibleRawEggDistribution"
        },
        pipeline: [
            {
                $match: {
                    $expr: {
                        $eq: ["$$deck.type", "$identifier"]
                    }
                }
            },
            {
                $unwind: "$possibleOutcomeDistribution"
            },
            {
                $lookup: {
                    from: "dragons",
                    let: {
                        pair: "$possibleOutcomeDistribution.id"
                    },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $eq: ["$identifier", "$$pair"]
                                }
                            }
                        }
                    ],
                    as: "name"
                }
            },
            {
                $unwind: "$name"
            },
            {
                $replaceRoot: {
                    newRoot: {
                        _id: "$_id",
                        identifier: "$identifier",
                        possibleOutcomeDistribution: {
                            _id: "$possibleOutcomeDistribution.id",
                            name: "$name.displayName",
                            distribution: "$possibleOutcomeDistribution.distribution",
                            probability: "$possibleOutcomeDistribution.probability",
                            fragments: "$name.numberOfFragmentsNeeded"
                        }
                    }
                }
            },
            {
                $group: {
                    _id: "$_id",
                    breeding: {
                        $push: "$possibleOutcomeDistribution"
                    }
                }
            }
        ],
        as: "breedDeck"
    },
    $unwind: {
        path: "$breedDeck"
    },
    $replaceRoot: {
        newRoot: {
            _id: "$_id",
            identifier: "$identifier",
            firstDragon: "$firstDragonIdentifier",
            secondDragon: "$secondDragonIdentifier",
            eggDistribution: "$possibleRawEggDistribution",
            eggNumber: "$eggNumber",
            breedDeck: "$breedDeck.breeding"
        }
    }
};
