import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import { FetchPrices, DeletePrice } from '../../actions';

class ListPrices extends Component {
    state = { 
        pricesStatus: 0,
        prices: [],
        favorites: [],
        deletedStatus: 0,
        showFavorites: false
    }

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

    removeItem = async (index) => {
        await this.props.DeletePrice(index);

        if(this.props.prices && this.props.prices.status === 200) {
            this.setState({ deletedStatus: 200 });
        } else {
            this.setState({ deletedStatus: 500 });
        }
    }

    removeFavItem = async (index) => {
        let favs = this.state.favorites;
        favs.splice(index, 1);
        this.setState({ deletedStatus: 200, favorites: favs });
    }

    addFavorites = async (item, e) => {
        e.target.classList.remove('bi-star');
        e.target.classList.add('bi-star-fill');

        let favs = this.state.favorites;
        favs.push(item);
        this.setState({ favorites: favs });
    }

    renderListItems = () => {
        if(this.state.pricesStatus === 200) {
            if(this.state.prices.length > 0) {
                return (
                    <tbody>
                        {this.state.prices.map(({ name, net, tax }, index) => {
                            let gross = parseFloat(net) + parseFloat(tax);
                            return (
                                <Fragment key={index}>
                                    <tr>
                                        <th scope="row">{name}</th>
                                        <td>{net} €</td>
                                        <td>{tax} €</td>
                                        <td>{gross} €</td>
                                        <td className="d-flex justify-content-between">
                                            <div className="" onClick={e => this.removeItem(index)}><i className="bi bi-x-lg"></i></div>
                                            <div><i className="bi bi-star" onClick={e => this.addFavorites({ id: index, name, net, tax, gross }, e)}></i></div>
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

    renderFavsListItems = () => {
        if(this.state.favorites.length > 0) {
            return (
                <tbody>
                    {this.state.favorites.map(({ name, net, tax }, index) => {
                        let gross = parseFloat(net) + parseFloat(tax);
                        return (
                            <Fragment key={index}>
                                <tr>
                                    <th scope="row">{name}</th>
                                    <td>{net} €</td>
                                    <td>{tax} €</td>
                                    <td>{gross} €</td>
                                    <td className="d-flex justify-content-between">
                                        <div className="" onClick={e => this.removeFavItem(index)}><i className="bi bi-x-lg"></i></div>
                                        <div><i className="bi bi-star-filled"></i></div>
                                    </td>
                                </tr>
                            </Fragment>
                        );
                    })}
                </tbody>
            )
        } else {
            return (
                <div>Oops! No favorite items found.</div>
            );
        }
    }

    toggleFavs = () => {
        if(!this.state.showFavorites) {
            this.setState({ showFavorites: true });
        } else {
            this.setState({ showFavorites: false });
        }
    }

    render() {
        return(
            <Fragment>
                <div className="row">
                    <div className="col-12">
                        <button 
                            className="btn btn-sm btn-success"
                            onClick={e => this.toggleFavs() }
                        >Show Favorites</button>
                    </div>
                </div>
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
                    
                    {this.state.showFavorites ?
                        this.renderFavsListItems() : 
                        this.renderListItems()}
                </table>
            </Fragment>
        );
    }
}

const mapStateToProps = ({ prices }) => {
    return { prices }
}

export default connect(
    mapStateToProps,
    { 
        FetchPrices,
        DeletePrice
    }
)(ListPrices);