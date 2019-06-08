export declare const pipeline: {
    $lookup: {
        readonly from: "decks";
        let: {
            readonly deck: "$possibleRawEggDistribution";
        };
        pipeline: readonly [{
            $match: {
                $expr: {
                    readonly $eq: readonly ["$$deck.type", "$identifier"];
                };
            };
        }, {
            readonly $unwind: "$possibleOutcomeDistribution";
        }, {
            $lookup: {
                readonly from: "dragons";
                let: {
                    readonly pair: "$possibleOutcomeDistribution.id";
                };
                pipeline: readonly [{
                    $match: {
                        $expr: {
                            readonly $eq: readonly ["$identifier", "$$pair"];
                        };
                    };
                }];
                readonly as: "name";
            };
        }, {
            readonly $unwind: "$name";
        }, {
            $replaceRoot: {
                newRoot: {
                    readonly _id: "$_id";
                    readonly identifier: "$identifier";
                    possibleOutcomeDistribution: {
                        readonly _id: "$possibleOutcomeDistribution.id";
                        readonly name: "$name.displayName";
                        readonly distribution: "$possibleOutcomeDistribution.distribution";
                        readonly probability: "$possibleOutcomeDistribution.probability";
                        readonly fragments: "$name.numberOfFragmentsNeeded";
                    };
                };
            };
        }, {
            $group: {
                readonly _id: "$_id";
                breeding: {
                    readonly $push: "$possibleOutcomeDistribution";
                };
            };
        }];
        readonly as: "breedDeck";
    };
    $unwind: {
        readonly path: "$breedDeck";
    };
    $replaceRoot: {
        newRoot: {
            readonly _id: "$_id";
            readonly identifier: "$identifier";
            readonly firstDragon: "$firstDragonIdentifier";
            readonly secondDragon: "$secondDragonIdentifier";
            readonly eggDistribution: "$possibleRawEggDistribution";
            readonly eggNumber: "$eggNumber";
            readonly breedDeck: "$breedDeck.breeding";
        };
    };
};
