declare const _default: {
    readonly $match: (deck: string) => {
        deck: string;
    };
    readonly $unwind: readonly ["$children", "$breedMatches"];
    $lookup: {
        readonly from: "breeding";
        let: {
            readonly ids: "$children";
        };
        pipeline: readonly [{
            $match: {
                $expr: {
                    readonly $eq: readonly ["$_id", "$$ids"];
                };
            };
        }, {
            $lookup: {
                readonly from: "dragons";
                readonly localField: "dragonIdentifier";
                readonly foreignField: "identifier";
                readonly as: "dragon";
            };
        }, {
            $project: {
                readonly _id: 1;
                readonly dragonIdentifier: 1;
                readonly breedChance: 1;
                readonly dragon: 1;
            };
        }, {
            readonly $unwind: "$dragon";
        }];
        readonly as: "breedMatches";
    };
    $replaceRoot: {
        newRoot: {
            readonly _id: "$breedMatches._id";
            readonly breedChance: "$breedMatches.breedChance";
            readonly dragon: "$breedMatches.dragon";
        };
    };
};
export default _default;
