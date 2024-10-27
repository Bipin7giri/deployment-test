export const clearTechnicalStorage = () => {
    // Get all keys from localStorage
    const keys = Object.keys(localStorage);

    // Filter keys that include "TRADINGVIEW"
    const tradingViewKeys = keys.filter(key => key.includes("tradingview"));

    // Remove items from localStorage based on the filtered keys
    tradingViewKeys.forEach(key => localStorage.removeItem(key));

}