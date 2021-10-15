import gateway from '../api';
import { ADD_PRICES, DELETE_PRICE, FETCH_ALL_PRICES, FETCH_PRICES } from './types';

export const AddPrices = formValues => async (dispatch, getState) => {
    try {
        // SIMULATION OF ADD / CREATE PRICING API
        const prices = formValues;

        dispatch({
            type: ADD_PRICES,
            payload: { 
                status: 200,
                type: 'success',
                msg: 'Successfully added the prices.',
                cost: { items: prices } 
            }
        });
    } catch(err) {
        dispatch({
            type: ADD_PRICES,
            payload: { 
                status: 500, 
                type: 'error', 
                msg: 'We are sorry, unable to Add the prices at the moment. Please try again later.', 
                cost: {} 
            }
        });
    }
};

export const DeletePrice = formValues => async (dispatch, getState) => {
    try {
        // SIMULATION OF ADD / CREATE PRICING API
        const index = formValues;

        dispatch({
            type: DELETE_PRICE,
            payload: { 
                status: 200,
                type: 'success',
                msg: 'Successfully deleted the price.',
                cost: index
            }
        });
    } catch(err) {
        dispatch({
            type: DELETE_PRICE,
            payload: { 
                status: 500, 
                type: 'error', 
                msg: 'We are sorry, unable to delete the price at the moment. Please try again later.', 
                cost: null 
            }
        });
    }
};

export const FetchPrices = formValues => async (dispatch, getState) => {
    try {
        const response = await gateway.get('/prod', formValues);

        dispatch({
            type: FETCH_PRICES,
            payload: { 
                status: 200,
                type: 'success',
                msg: 'Successfully fetched the prices.',
                cost: response.data
            }
        });
    } catch(err) {
        dispatch({
            type: FETCH_PRICES,
            payload: { 
                status: 500,
                type: 'error',
                msg: `We're sorry as we're unable to fetch the prices at the moment. Please try again later.`,
                cost: {}
            }
        });
    }
};