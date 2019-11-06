import React from 'react';
import { connect } from 'react-redux';
import numeral from 'numeral';
import { deleteFromQueue } from '../actions/index';

const Queue = ( props ) => {
    return props.queue.map( ( order, orderIndex ) => {
        return (
            <div key={ orderIndex } className="order-card card card-primary mb-2">
                <div className="card-body">
                    <p className="p-0 m-0"><strong>№{ order.orderId.substr( 0, order.orderId.indexOf( '-' ) ) }</strong> | { order.timestamp }</p>
                    <ul className="list-unstyled order-items p-0 m-0">
                        {
                            order.products.map( ( product, productIndex ) => {
                                return (
                                    <li key={ productIndex }>
                                        <div><strong>{ product.name }</strong> <span className="float-right"><strong>&times;</strong> <span className="badge badge-primary">{ product.count }</span></span></div>
                                        <div>{ numeral( parseFloat( product.price ) * parseInt( product.count ) ).format( '0,0' ).replace( /,/g, ' ' ) } UZS</div>
                                    </li>
                                );
                            } )
                        }
                    </ul>
                    <hr className="p-0 m-0" />
                    <p className="p-0 m-0"><strong>{ `Итого` }: { numeral( order.total ).format( '0,0' ).replace( /,/g, ' ' ) }</strong> UZS</p>
                    <button type="button" className="btn btn-sm btn-link p-0 removeOrderBtn" onClick={ () => props.deleteOrder( order.orderId ) }>{ `Удалить` }</button>
                </div>
            </div>
        );
    } );
};

const mapStateToProps = ( state ) => {
    return {
        queue: state.queue,
    };
};

const mapDispatchToProps = ( dispatch ) => {
    return {
        deleteOrder: ( orderId ) => dispatch( deleteFromQueue( orderId ) ),
    };
};

export default connect( mapStateToProps, mapDispatchToProps )( Queue );