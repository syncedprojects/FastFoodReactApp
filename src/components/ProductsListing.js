import React from 'react';
import { connect } from 'react-redux';
import numeral from 'numeral';
import { addToCart } from '../actions/index';

class ProductsListing extends React.Component {
    constructor( props ) {
        super( props );

        this.state = {
            filteredProducts: this.props.products,
        };

        this.onFilterChange = this.onFilterChange.bind( this );
    }

    onFilterChange( evt ) {
        let productName = evt.currentTarget.value.toLowerCase();
        const filteredProducts = this.props.products.filter( ( product ) => ( product.name.toLowerCase().indexOf( productName ) !== -1 ) );
        this.setState( {
            filteredProducts: filteredProducts,
        } );
    }

    render() {
        return (
            <React.Fragment>
                <form>
                    <div className="form-group">
                        <input className="form-control" type="text" onChange={ this.onFilterChange } placeholder={ `Название...` } />
                    </div>
                </form>
                <ul className="list-unstyled products-listing d-flex justify-content-around flex-wrap p-0">
                    {
                        this.state.filteredProducts.map( ( product, index ) => {
                            return (
                                <li key={ index } className="d-block col-12 col-md-6 col-lg-4" onClick={ () => this.props.productSelected( product.id ) }>
                                    <div className="card border-light mb-3">
                                        <div className="card-body p-0">
                                            <img src={ product.img } alt="" className="mw-100" />
                                        </div>
                                        <div className="card-footer">
                                            <div>{ product.name }</div>
                                            <div>{ numeral( product.price ).format( '0,0' ).replace( /,/g, ' ' ) } UZS</div>
                                        </div>
                                    </div>
                                </li>
                            );
                        } )
                    }
                </ul>
            </React.Fragment>
        );
    }
};

const mapStateToProps = ( state ) => {
    return {
        products: state.products,
    };
};

const mapDispatchToProps = ( dispatch ) => {
    return {
        productSelected: ( productId ) => dispatch( addToCart( productId ) ),
    };
};

export default connect( mapStateToProps, mapDispatchToProps )( ProductsListing );