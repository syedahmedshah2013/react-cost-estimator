import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import estimateReducer from './EstimateReducer';

export default combineReducers({
    prices: estimateReducer,
    form: formReducer
});