import gateway from '../api';
import { FETCH_PRICES } from './types';

export const AddPrices = formValues => async (dispatch, getState) => {
    try {
        // SIMULATION OF ADD / CREATE PRICING API
        const prices = formValues;

        dispatch({
            type: FETCH_PRICES,
            payload: { 
                status: 200,
                type: 'success',
                msg: 'Successfully added the prices.',
                prices 
            }
        });
    } catch(err) {
        dispatch({
            type: FETCH_PRICES,
            payload: { 
                status: 500, 
                type: 'error', 
                msg: 'We are sorry, unable to fetch the prices at the moment. Please try again later.', 
                prices: null 
            }
        });
    }
};

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