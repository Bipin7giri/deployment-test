const entities = "[tools]";

const actions = {
    GET_ALL_IPO_DATA: `${entities} GET_ALL_IPO_DATA`,
    getAllIpoData: (payload) => ({
        type: actions.GET_ALL_IPO_DATA,
        payload,
    }),

    GET_AUCTION_DATA: `${entities} GET_AUCTION_DATA`,
    getAuctionData: (payload) => ({
        type: actions.GET_AUCTION_DATA,
        payload
    }),

    GET_BUY_CALCULATE: `${entities} GET_BUY_CALCULATE`,
    getBuyCalculate: (payload) => ({
        type: actions.GET_BUY_CALCULATE,
        payload,
    }),

    GET_SELL_CALCULATE: `${entities} GET_SELL_CALCULATE`,
    getSellCalculate: (payload) => ({
        type: actions.GET_SELL_CALCULATE,
        payload,
    }),

    GET_CALENDER_INFO: `${entities} GET_CALENDER_INFO`,
    getCalenderInfo: (payload) => ({
        type: actions.GET_CALENDER_INFO,
        payload,
    }),

    POST_PROMO_CODE_REQUEST: `${entities} POST_PROMO_CODE_REQUEST`,
    postPromoCodeRequest: (payload) => ({
        type: actions.POST_PROMO_CODE_REQUEST,
        payload,
    }),

    POST_SCREENER_V2: `${entities} POST_SCREENER_V2`,
    postScreenerV2: (payload) => ({
        type: actions.POST_SCREENER_V2,
        payload,
    }),

    SAVE_SCREENER: `${entities} SAVE_SCREENER`,
    saveScrenner: (payload) => ({
        type: actions.SAVE_SCREENER,
        payload,
    }),

    SET_SAVED_OR_LOADED: `${entities} SET_SAVED_OR_LOADED`,
    setSavedOrLoaded: (payload) => ({
        type: actions.SET_SAVED_OR_LOADED,
        payload,
    }),

    UPDATE_SCREENER: `${entities} UPDATE_SCREENER`,
    updateScreener: (payload) => {
        return {
            type: actions.UPDATE_SCREENER,
            payload,
        }
    },

    GET_ALL_SAVED_SCREENER: `${entities} GET_ALL_SAVED_SCREENER`,
    getAllSavedScrenner: (payload) => ({
        type: actions.GET_ALL_SAVED_SCREENER,
        payload,
    }),

    GET_SAVED_SCREENER_BY_ID: `${entities} GET_SAVED_SCREENER_BY_ID`,
    getSavedScrennerByID: (payload) => ({
        type: actions.GET_SAVED_SCREENER_BY_ID,
        payload,
    }),
    DELETE_SCREENER_BY_ID: `${entities} DELETE_SCREENER_BY_ID`,
    deleteScreenerById: (payload) => ({
        type: actions.DELETE_SCREENER_BY_ID,
        payload,
    }),
    GET_SECTOR_ROTATION: `${entities} GET_SECTOR_ROTATION`,
    sectorRotationData: () => ({
        type: actions.GET_SECTOR_ROTATION,
    }),


}
export default actions;