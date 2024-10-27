const entities = "[payment]";

const actions = {
    ADD_SUBSCRIPTION: `${entities} ADD_SUBSCRIPTION`,
    addSubscription: (payload) => ({
        type: actions.ADD_SUBSCRIPTION, 
        payload,
    }),
    
}
export default actions;