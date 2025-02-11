"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.containsDuplicate = void 0;
const containsDuplicate = (array) => {
    const keySet = new Set(); // Set to track unique priceKeys
    for (const item of array) {
        if (keySet.has(item.priceKey)) {
            return true; // Duplicate found
        }
        keySet.add(item.priceKey); // Add key to the set
    }
    return false; // No duplicates found
};
exports.containsDuplicate = containsDuplicate;
