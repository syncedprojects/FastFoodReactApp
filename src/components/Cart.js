import React from 'react';
import { connect } from 'react-redux';
import numeral from 'numeral';
import { deleteFromCart, makeOrder } from '../actions/index';

const Cart = ( props ) => {
    return (
        <React.Fragment>
            <p>{ `Итого` }: { numeral( props.total ).format( '0,0' ).replace( /,/g, ' ' ) } UZS</p>
            <ul className="list-unstyled cart-items">
                {
                    props.products.map( ( product, index ) => {
                        return (
                            <li key={ index }>
                                <div className="card border-light mb-3">
                                    <div className="card-footer">
                                        <div>{ product.name } <span className="float-right"><strong>&times;</strong> <span className="badge badge-primary">{ product.count }</span></span></div>
                                        <div>{ numeral( parseFloat( product.price ) * parseInt( product.count ) ).format( '0,0' ).replace( /,/g, ' ' ) } UZS</div>
                                        <button type="button" className="btn btn-link p-0" onClick={ () => props.deleteProduct( product.id ) }>{ `Удалить` }</button>
                                    </div>
                                </div>
                            </li>
                        );
                    } )
                }
            </ul>
            {
                ( props.products.length > 0 ) ?
                    <button id="makeOrderBtn" type="button" className="btn btn-primary" onClick={ () => props.makeOrder() }>{ `Заказать` }</button>
                    :
                    null
            }
        </React.Fragment>
    );
};

const mapStateToProps = ( state ) => {
    return {
        total: state.cart.total,
        products: state.cart.products,
    };
};

const mapDispatchToProps = ( dispatch ) => {
    return {
        deleteProduct: ( productId ) => dispatch( deleteFromCart( productId ) ),
        makeOrder: () => dispatch( makeOrder() ),
    };
};

export default connect( mapStateToProps, mapDispatchToProps )( Cart );