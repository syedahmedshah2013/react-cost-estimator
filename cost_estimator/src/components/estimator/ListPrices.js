import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import { FetchPrices } from '../../actions';

class ListPrices extends Component {
    state = { pricesStatus: 0, prices: [], favorite: false }

    componentDidMount() {
        this.fetchItemPrices();
    }

    fetchItemPrices = async () => {
        await this.props.FetchPrices();
        console.log(this.props.prices);
        
        if(this.props.prices && this.props.prices.cost.items.length > 0) {
            this.setState({ pricesStatus: 200, prices: this.props.prices.cost.items })
        } else {
            this.setState({ pricesStatus: 500 });
        }
    }

    renderListItems = () => {
        if(this.state.pricesStatus === 200) {
            if(this.state.prices.length > 0) {
                return (
                    <tbody>
                        {this.state.prices.map(({ name, net, tax }, index) => {
                            let gross = parseFloat(net) + parseFloat(tax);
                            return (
                                <Fragment>
                                    <tr>
                                        <th scope="row">{name}</th>
                                        <td>{net} €</td>
                                        <td>{tax} €</td>
                                        <td>{gross} €</td>
                                        <td className="d-flex justify-content-between">
                                            <div className=""><i className="bi bi-x-lg"></i></div>
                                            <div><i className="bi bi-star"></i></div>
                                        </td>
                                    </tr>
                                </Fragment>
                            );
                        })}
                    </tbody>
                )
            } else {
                return (
                    <div>Oops! No items found.</div>
                );
            }
        } else {
            return (
                <div>Oops! Something went wrong while listing records.</div>
            )
        }
    }

    render() {
        return(
            <Fragment>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Net</th>
                            <th scope="col">Tax</th>
                            <th scope="col">Gross</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    
                    {this.renderListItems()}
                </table>
            </Fragment>
        );
    }
}

const mapStateToProps = ({ prices }) => {
    return { prices }
}

export default connect(mapStateToProps, { FetchPrices })(ListPrices);