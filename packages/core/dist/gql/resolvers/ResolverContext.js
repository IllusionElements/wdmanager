import { Dragons, Tiers, Eggs, DragonService, TierService, EggService, Decks } from "@manager/services";
const createContext = (db, Service) => ({
    db,
    service: new Service()
});
const dragons = createContext(Dragons, DragonService);
const tiers = createContext(Tiers, TierService);
const eggs = createContext(Eggs, EggService);
const decks = createContext(Decks, class DeckService {
});
const context = {
    dragons,
    tiers,
    eggs,
    decks
};
export default context;
