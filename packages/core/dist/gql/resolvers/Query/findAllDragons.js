// Aggregation lookup for levels
const levelLookup = {
    from: "levels",
    localField: "identifier",
    foreignField: "identifier",
    as: "levels"
};
export const findAllDragons = async (_root, _, context) => {
    const { dragons: { db } } = context;
    const aggregate = db.aggregate();
    const dragonsLookup = aggregate.lookup(levelLookup);
    const data = await dragonsLookup.exec();
    if (data.rarity &&
        ![...context.dragons.service.rarity.values()].some(rarity => rarity === data.rarity)) {
        return {
            ...data,
            rarity: context.dragons.service.rarity.get(data.rarity)
        };
    }
    return data;
};
