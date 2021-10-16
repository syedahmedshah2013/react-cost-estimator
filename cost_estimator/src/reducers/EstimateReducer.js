/* eslint-disable import/no-anonymous-default-export */
import { FETCH_PRICES, ADD_PRICES, DELETE_PRICE } from '../actions/types';

export default (state = {}, action) => {
    switch(action.type) {
        case ADD_PRICES:
            if(state.cost && state.cost.items.length > 0) {
                action.payload.cost.items.map((item) => {
                    action.payload = state.cost.items.push(item)
                });
            }
            else action.payload = {...state, ...action.payload }

            return { ...state, ...action.payload }
        case FETCH_PRICES:
            return {...state, ...action.payload }
        case DELETE_PRICE:
            if(state.cost && state.cost !== null) {
                action.payload = state.cost.items.splice(action.payload.cost, 1);
            }
            else action.payload = {...state, ...action.payload }

            return { ...state, ...action.payload }
        default:
            return state;
    }
}