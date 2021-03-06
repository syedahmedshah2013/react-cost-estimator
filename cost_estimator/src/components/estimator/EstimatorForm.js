import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Field, Form } from 'react-final-form';

import { AddPrices } from '../../actions';
import { renderInput } from '../../utils/renderForm';

import numeral from 'numeral';
import { roundUpTo2Decimals } from '../../utils/general';

class EstimatorForm extends Component {
    state = { priceStatus: 0, tax: .0, gross: .0 }

    validate = (formValues) => {
        let errors = {};
    
        if(!formValues.item_name) {
            errors.item_name = 'Please enter Item name';
        }
    
        if(!formValues.item_price) {
            errors.item_price = 'Please enter a Item price greater than Zero for estimation.';
        }
    
        return errors;
    }

    onSubmit = async ({ item_name, item_price }) => {
        let prices = [];
        let id = Math.ceil((Math.random * 100) * 1000);
        let tax = (item_price * 16.00) / 100;
        let gross = parseFloat(item_price) + parseFloat(tax);

        prices.push({
            id,
            name: item_name,
            net: item_price,
            tax: tax,
            gross: gross 
        });

        await this.props.AddPrices(prices);

        if(this.props.prices.status === 200) {
            this.setState({ priceStatus: 200, tax, gross });
        } else {
            this.setState({ priceStatus: this.props.prices.status });
        }
    }

    renderAlertBanner = () => {
        if(this.state.priceStatus === 200) {
            return (
                <div class="alert alert-primary" role="alert">
                    Voila! Successfully Added The Cost.
                </div>
            )
        } else if(this.state.priceStatus === 500) {
            return (
                <div class="alert alert-danger" role="alert">
                    Oops! Something went wrong while adding the cost.
                </div>
            )
        }
    }

    renderForm = ({ handleSubmit, pristine, form, submitting }) => {
        return (
            <form onSubmit={handleSubmit}>
                <div className="row">
                    <div className="col-md-12">
                        <Field
                            type="text"
                            name="item_name"
                            label="Name*"
                            render={renderInput}
                            placeholder="Item Name" />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <Field
                            type="number"
                            name="item_price"
                            label="Net*"
                            render={renderInput}
                            placeholder="Item Price" />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-8"></div>
                    <div className="col-md-2">
                        <h5>Tax</h5>
                        <p>{roundUpTo2Decimals(this.state.tax)} | 16%</p>
                    </div>
                    <div className="col-md-2">
                        <h5>Gross</h5>
                        <p>{roundUpTo2Decimals(this.state.gross)} ???</p>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12 d-flex">
                        <button
                            className="btn btn-md btn-secondary float-right"
                            type="submit"
                            disabled={submitting}
                        >
                            Add
                        </button>
                        <button
                            className="btn btn-md btn-light"
                            type="button"
                            disabled={pristine || submitting}
                            onClick={form.reset}
                        >
                            Reset
                        </button>
                    </div>
                </div>
            </form>
        );
    }

    render() {
        return(
            <Fragment>
                {this.renderAlertBanner()}
                <Form
                    onSubmit={this.onSubmit}
                    validate={this.validate}
                    render={this.renderForm}
                >
                </Form>
            </Fragment>
        );
    }
}

const mapStateToProps = ({ prices }) => {
    return { prices }
}

export default connect(mapStateToProps, { AddPrices })(EstimatorForm);