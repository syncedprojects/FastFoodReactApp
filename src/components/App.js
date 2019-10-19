import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ProductsListing from './ProductsListing';
import Cart from './Cart';
import Queue from './Queue';

class App extends React.Component {
    static propTypes = {
        match: PropTypes.object.isRequired,
        location: PropTypes.object.isRequired,
        history: PropTypes.object.isRequired,
    };

    render() {
        return (
            <React.Fragment>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div id="app-container" className="d-flex pt-2 pb-3 flex-wrap">
                                <div id="products-listing" className="col-md-6">
                                    <ProductsListing />
                                </div>
                                <div id="cart" className="col-md-3">
                                    <h6 className="pt-2">{ `Заказ` }</h6>
                                    <Cart />
                                </div>
                                <div className="col-md-3">
                                    <h6 className="pt-2">{ `Очередь` }: { this.props.queue.length }</h6>
                                    <Queue />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
};

const mapStateToProps = ( state ) => {
    return {
        queue: state.queue,
    };
};

const mapDispatchToProps = ( dispatch ) => {
    return {
        //
    };
};

export default connect( mapStateToProps, mapDispatchToProps )( App );