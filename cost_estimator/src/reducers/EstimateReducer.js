/* eslint-disable import/no-anonymous-default-export */
import { FETCH_PRICES, ADD_PRICES } from '../actions/types';

export default (state = {}, action) => {
    switch(action.type) {
        case ADD_PRICES:
            return {...state, ...action.payload }
        case FETCH_PRICES:
            return {...state, ...action.payload }
        default:
            return state;
    }
}