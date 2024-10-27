const entities = "[watchlist]";

const watchListActions = {
  GET_WATCH_LIST_REQ: `${entities} GET_WATCH_LIST_REQ`,
  ADD_WATCH_LIST_REQ: `${entities} ADD_WATCH_LIST_REQ`,
  DELETE_WATCH_LIST_REQ: `${entities} DELETE_WATCH_LIST_REQ`,
  getWatchList: (payload) => ({
    type: watchListActions.GET_WATCH_LIST_REQ,
    payload,
  }),

  addWatchList: (payload) => ({
    type: watchListActions.ADD_WATCH_LIST_REQ,
    payload,
  }),
  deleteWatchList: (payload) => ({
    type: watchListActions.DELETE_WATCH_LIST_REQ,
    payload,
  }),
};
export default watchListActions;
