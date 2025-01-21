interface Price {
    priceKey: string;
    priceValue: number;
  }
  
export const containsDuplicate = (arr: Price[]): boolean => {
    const keySet = new Set<string>(); // Set to track unique priceKeys
  
    for (const item of arr) {
      if (keySet.has(item.priceKey)) {
        return true; // Duplicate found
      }
      keySet.add(item.priceKey); // Add key to the set
    }
  
    return false; // No duplicates found
  }