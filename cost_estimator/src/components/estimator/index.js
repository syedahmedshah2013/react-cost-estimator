import React, { Component, Fragment } from 'react';
import EstimateOverview from './EstimateOverview';
import EstimatorForm from './EstimatorForm';
import ListPrices from './ListPrices';

class Estimator extends Component {
    render() {
        return(
            <Fragment>
                <div className="row mt-5">
                    <div className="col-md-6">
                        <EstimatorForm />
                    </div>
                    <div className="col-md-6">
                        <EstimateOverview />
                    </div>
                </div>
                <div className="row mt-5 mb-4">
                    <div className="col-md-12">
                        <ListPrices />
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default Estimator;