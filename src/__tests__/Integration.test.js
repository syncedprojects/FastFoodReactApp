import React from 'react';
import ReactDOM from 'react-dom';
import { withRouter } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/index';
import App from '../components/App';
import initialState from '../initialState';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure( { adapter: new Adapter() } );
const store = createStore( rootReducer, initialState, applyMiddleware( thunk ) );

/**
 * @link: https://reacttraining.com/react-router/web/api/withRouter
 * Create a new component that is "connected" (to borrow redux terminology) to the router.
 */
const AppWithRouter = withRouter( App );
describe( 'App integration test:', () => {
    const wrapper = mount(
        // to access updated match, location and history props ALL the application must be wrapped in BrowserRouter
        <Provider store={ store }>
            <BrowserRouter>
                <AppWithRouter />
            </BrowserRouter>
        </Provider>
    );

    it( 'app should display without crashing', () => {
        expect( wrapper ).toHaveLength( 1 );
    } );

    let CartComponent = null;
    let QueueComponent = null;

    describe( 'user clicks on product:', () => {
        CartComponent = wrapper.find( 'Cart' );
        const oldCartItemsCount = CartComponent.props().products.length;
        wrapper.find( '.products-listing > li' ).first().simulate( 'click' );
        CartComponent = wrapper.find( 'Cart' );
        const newCartItemsCount = CartComponent.props().products.length;

        it( 'should add the product to cart', () => {
            expect(
                newCartItemsCount
            ).toBe( oldCartItemsCount + 1 );
        } );
    } );

    describe( 'user makes an order:', () => {
        QueueComponent = wrapper.find( 'Queue' );
        const oldQueueItemsCount = QueueComponent.props().queue.length;
        
        wrapper.find( '#makeOrderBtn' ).first().simulate( 'click' );

        CartComponent = wrapper.find( 'Cart' );
        const cartItemsCount = CartComponent.props().products.length;

        QueueComponent = wrapper.find( 'Queue' );
        const newQueueItemsCount = QueueComponent.props().queue.length;

        it( 'should add the product to the orders\' queue', () => {
            expect(
                oldQueueItemsCount
            ).toBe( newQueueItemsCount - 1 );
        } );

        it( 'should empty the cart', () => {
            expect(
                cartItemsCount
            ).toBe( 0 );
        } );
    } );

    describe( 'remove order from queue, assume order is accomplished:', () => {
        QueueComponent = wrapper.find( 'Queue' );
        const oldQueueItemsCount = QueueComponent.props().queue.length;
        
        wrapper.find( '.removeOrderBtn' ).first().simulate( 'click' );

        QueueComponent = wrapper.find( 'Queue' );
        const newQueueItemsCount = QueueComponent.props().queue.length;

        it( 'should remove order from orders\' queue', () => {
            expect(
                oldQueueItemsCount
            ).toBe( newQueueItemsCount + 1 );
        } );
    } );
} );