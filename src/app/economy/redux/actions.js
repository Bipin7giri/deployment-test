const entities = "[economy]";

const economyActions = {
  GET_MOF_ANNUAL_REQ: `${entities}  GET_MOF_ANNUAL_REQ`,
  GET_Highlights_Import_Export: `${entities}  GET_Highlights_Import_Export`,
  GET_Calculated_HighLights: `${entities}  GET_Calculated_HighLights`,

  // revenueandexpenditure
  GET_ECONOMY_CHARTDATA_REQ: `${entities} GET_ECONOMY_CHARTDATA_REQ`,
  economyChart: (payload) => ({
    type: economyActions.GET_ECONOMY_CHARTDATA_REQ,
    payload,
  }),
};
export default economyActions;
