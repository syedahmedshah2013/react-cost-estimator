import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import { FetchPrices } from '../../actions';
import { roundUpTo2Decimals } from '../../utils/general';

class EstimateOverview extends Component {
    state = { pricesStatus: 0, prices: [], favorite: false, total: .0, average: .0 }

    componentDidMount() {
        this.fetchItemPricesOnLoad();
    }

    fetchItemPricesOnLoad = async () => {
        await this.props.FetchPrices();
        console.log(">>>>>>", this.props.prices);
        
        if(this.props.prices && this.props.prices.cost && this.props.prices.cost.items && this.props.prices.cost.items.length > 0) {
            this.calculateTotalAvg(this.props.prices);
        } else {
            this.setState({ pricesStatus: 500 });
        }
    }

    calculateTotalAvg = (prices) => {
        let total = 0;

        prices.cost.items.map((item) => {
            total += parseFloat(item.net);
        });

        let average = total / prices.cost.items.length;

        this.setState({ 
            pricesStatus: 200,
            prices: prices.cost.items,
            total,
            average 
        });
    }

    render() {
        return(
            <Fragment>
                <div class="card bg-light">
                    <div class="card-body">
                        <h5 class="card-title">Overview</h5>
                        <div className="row">
                            <div className="col-md-4">Total Sum</div>
                            <div className="col-md-4">{roundUpTo2Decimals(this.state.total)} €</div>
                        </div>
                        <div className="row">
                            <div className="col-md-4">Average</div>
                            <div className="col-md-4">{roundUpTo2Decimals(this.state.average)} €</div>
                        </div>
                        <div className="row">
                            <div className="col-md-4">Total Items</div>
                            <div className="col-md-4">{ this.state.prices.length }</div>
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }
}

const mapStateToProps = ({ prices }) => {
    return { prices };
}

export default connect(mapStateToProps, { FetchPrices })(EstimateOverview);