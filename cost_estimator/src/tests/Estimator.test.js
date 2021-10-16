import React from 'react';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import { shallow, mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import toJson from "enzyme-to-json";

import ListPrices from '../components/estimator/ListPrices';

const mockStore = configureStore([]);

const initState = {
    prices: {
      status: 200,
      type: 'success',
      msg: 'Successfully fetched the prices.',
      cost: {
        items: [
          {
            id: 1,
            name: 'Architect',
            net: '1000.0',
            tax: '160.0'
          },
          {
            id: 2,
            name: 'Bricks',
            net: '1500.32',
            tax: '240.0512'
          },
          {
            id: 3,
            name: 'Property',
            net: '2000.5',
            tax: '320.08'
          },
          {
            id: null,
            name: 'HR',
            net: '2500',
            tax: 400,
            gross: 2900
          },
          {
            id: null,
            name: 'Accountant',
            net: '3500',
            tax: 560,
            gross: 4060
          }
        ]
      }
    }
}

describe('<ListPrices/>', () => {
    let store;
    let component;

    beforeEach(() => {
        store = mockStore({
            initState: initState
        });
        component = renderer.create(
            <Provider store={store}>
                <ListPrices />
            </Provider>
        )
    });

    it('ListPrices component renders with given state from Redux Store', () => {
        expect(component.toJSON()).toMatchSnapshot();
    });
})