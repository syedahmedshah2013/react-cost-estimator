import { combineReducers } from 'redux';

import estimateReducer from './EstimateReducer';

export default combineReducers({
    prices: estimateReducer,
});