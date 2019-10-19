import initialState from '../initialState';
import uuid from 'uuid';
import moment from 'moment';

function rootReducer( state = initialState, action ) {
    let cartTotal = 0;
    let newState = Object.assign( {}, state );
    switch ( action.type ) {
        case 'ADD_TO_CART':
            const existingProducts = newState.cart.products.filter( ( product ) => ( product.id === action.payload.productId ) );
            if ( typeof undefined === typeof existingProducts[ 0 ] ) {
                const products = newState.products.filter( ( product ) => ( product.id === action.payload.productId ) );
                if ( typeof undefined !== typeof products[ 0 ] ) {
                    const cartProduct = Object.assign( {}, products[ 0 ], { count: 1 } );
                    newState.cart.products = newState.cart.products.concat( cartProduct );
                }
            }
            else {
                const newCount = parseInt( existingProducts[ 0 ].count ) + 1;
                newState.cart.products = newState.cart.products.map( ( product ) => ( product.id === action.payload.productId ? Object.assign( {}, product, { count: newCount } ) : product ) );
            }
            for ( let i = 0; i < newState.cart.products.length; i++ ) {
                const cartProduct = newState.cart.products[ i ];
                cartTotal += parseFloat( cartProduct.price ) * parseInt( cartProduct.count );
            }
            newState.cart.total = cartTotal;
            return newState;
        case 'DELETE_FROM_CART':
            newState.cart.products = newState.cart.products.filter( ( product ) => ( product.id !== action.payload.productId ) );
            for ( let i = 0; i < newState.cart.products.length; i++ ) {
                const cartProduct = newState.cart.products[ i ];
                cartTotal += parseFloat( cartProduct.price ) * parseInt( cartProduct.count );
            }
            newState.cart.total = cartTotal;
            return newState;
        case 'DELETE_FROM_QUEUE':
            newState.queue = newState.queue.filter( ( order ) => ( order.orderId !== action.payload.orderId ) );
            return newState;
        case 'MAKE_ORDER':
            const orderId = uuid.v4();
            for ( let i = 0; i < newState.cart.products.length; i++ ) {
                const cartProduct = newState.cart.products[ i ];
                cartTotal += parseFloat( cartProduct.price ) * parseInt( cartProduct.count );
            }
            const timestamp = moment().format( 'YYYY-MM-DD HH:mm:ss' );
            const cartProducts = JSON.parse( JSON.stringify( newState.cart.products ) );
            const newOrder = {
                orderId: orderId,
                total: cartTotal,
                timestamp: timestamp,
                products: cartProducts,
            }
            newState.queue = newState.queue.concat( newOrder );
            newState.cart = {
                total: 0,
                products: [],
            };
            return newState;
        default:
            return state;
    }
}

export default rootReducer;