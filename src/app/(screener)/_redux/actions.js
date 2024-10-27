const entities = "[screener]";

const actions = {
  GET_PRICE_UP_VOLUME_UP_DATA: `${entities}  GET_PRICE_UP_VOLUME_UP_DATA`,
  priceUpVolumeUpData: (payload) => ({
    type: actions.GET_PRICE_UP_VOLUME_UP_DATA,
    payload,
  }),
  GET_PRICE_DOWN_VOLUME_UP_DATA: `${entities}  GET_PRICE_DOWN_VOLUME_UP_DATA`,
  priceDownVolumeUpData: (payload) => ({
    type: actions.GET_PRICE_DOWN_VOLUME_UP_DATA,
    payload,
  }),
  GET_PROMOTER_SHARE_DATA: `${entities}  GET_PROMOTER_SHARE_DATA`,
  promoterShareData: (payload) => ({
    type: actions.GET_PROMOTER_SHARE_DATA,
    payload,
  }),
};

export default actions;
