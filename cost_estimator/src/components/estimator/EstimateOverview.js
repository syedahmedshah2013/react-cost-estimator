import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import { FetchPrices } from '../../actions';
import { roundUpTo2Decimals } from '../../utils/general';

class EstimateOverview extends Component {
    // FEW CHANGES LEFT OVER HERE BECAUSE OF SHORTAGE OF TIME OTHERWISE ALL DONE
    state = { pricesStatus: 0 }

    componentDidMount() {
        this.fetchItemPricesOnLoad();
    }

    fetchItemPricesOnLoad = async () => {
        await this.props.FetchPrices();
        
        if(this.props.prices && this.props.prices.cost.items.length > 0) {
            this.setState({ pricesStatus: 200 });
        } else {
            this.setState({ pricesStatus: 500 });
        }
    }

    renderOverview = () => {
        if(this.state.pricesStatus === 200) {
            let total = 0;
            let average = 0;
            if(this.props.prices && this.props.prices.cost.items.length > 0) {
                let items = this.props.prices.cost.items;
                items.map((item) => {
                    total += parseFloat(item.net);
                });
                average = total / items.length;

                return (
                    <Fragment>
                        <div className="row">
                            <div className="col-md-4">Total Sum</div>
                            <div className="col-md-4">{roundUpTo2Decimals(total)} €</div>
                        </div>
                        <div className="row">
                            <div className="col-md-4">Average</div>
                            <div className="col-md-4">{roundUpTo2Decimals(average)} €</div>
                        </div>
                        <div className="row">
                            <div className="col-md-4">Total Items</div>
                            <div className="col-md-4">{items.length }</div>
                        </div>
                    </Fragment>
                );
            }
        } else {
            return (
                <Fragment>
                    <p>Oops! Unable to find relevant details</p>
                </Fragment>
            )
        }
    }

    render() {
        return(
            <Fragment>
                <div class="card bg-light">
                    <div class="card-body">
                        <h5 class="card-title">Overview</h5>
                        {this.renderOverview()}
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