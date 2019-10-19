export function addToCart( productId ) {
    return {
        type: 'ADD_TO_CART',
        payload: {
            productId: productId,
        },
    };
}

export function deleteFromCart( productId ) {
    return {
        type: 'DELETE_FROM_CART',
        payload: {
            productId: productId,
        },
    };
}

export function makeOrder() {
    return {
        type: 'MAKE_ORDER',
    };
}

export function deleteFromQueue( orderId ) {
    return {
        type: 'DELETE_FROM_QUEUE',
        payload: {
            orderId: orderId,
        },
    };
}