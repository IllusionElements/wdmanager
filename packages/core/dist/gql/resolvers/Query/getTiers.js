export function getTiers(_root, _, context) {
    return context.tiers.service.getAllTiers();
}
