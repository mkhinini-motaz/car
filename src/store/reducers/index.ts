import I18n from "./I18n";

export interface Action {
    type: string,
    payload: any,
}

function combineReducers(reducers: object) {
    const reducerKeys = Object.keys(reducers);

    return function combination(state = {}, action: Action) {
        const nextState = {};

        for (let key of reducerKeys) {
            const reducer = reducers[key];
            const previousStateForKey = state[key];
            nextState[key] = reducer(previousStateForKey, action);
        }

        return nextState
    }
}

export default combineReducers({ I18n });
