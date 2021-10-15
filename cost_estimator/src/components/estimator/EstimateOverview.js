import React, { Component, Fragment } from 'react';

class EstimateOverview extends Component {
    render() {
        return(
            <Fragment>
                <div class="card bg-light">
                    <div class="card-body">
                        <h5 class="card-title">Overview</h5>
                        <div className="row">
                            <div className="col-md-4">Total Sum</div>
                            <div className="col-md-4">200000€</div>
                        </div>
                        <div className="row">
                            <div className="col-md-4">Average</div>
                            <div className="col-md-4">200000€</div>
                        </div>
                        <div className="row">
                            <div className="col-md-4">Total Items</div>
                            <div className="col-md-4">2</div>
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default EstimateOverview;