/* eslint-disable import/no-anonymous-default-export */
import { FETCH_PRICES, ADD_PRICES } from '../actions/types';

export default (state = {}, action) => {
    switch(action.type) {
        case ADD_PRICES:
            console.log(state);
            if(state.cost && state.cost.items.length > 0) {
                action.payload.cost.items.map((item) => {
                    action.payload = state.cost.items.push(item)
                });
            }
            else action.payload = {...state, ...action.payload }

            return { ...state, ...action.payload }
        case FETCH_PRICES:
            return {...state, ...action.payload }
        default:
            return state;
    }
}