import gateway from '../api';
import { FETCH_PRICES } from './types';

export const ListPrices = formValues => async (dispatch, getState) => {
    try {
        const response = await gateway.post('/prod', formValues);

        dispatch({
            type: FETCH_PRICES,
            payload: response.data
        });
    } catch(err) {
        dispatch({
            type: FETCH_PRICES,
            payload: { status: 500, type: 'error', msg: `We're sorry as we're unable to fetch the prices at the moment. Please try again later.` }
        });
    }
};