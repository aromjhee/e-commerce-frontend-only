import React from 'react';
import * as redux from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { within } from '@testing-library/dom'

import OrderPlacement from '../components/OrderPlacement';

describe('OrderPlacement component', () => {
  beforeEach(() => {
    const spy = jest.spyOn(redux, 'useSelector')
    spy.mockReturnValue({
      cartItems: [],
      shipping: {
        address: '123 Washington',
        city: 'New York',
        postalCode: 5555,
        country: 'USA'
      },
      payment: {
        paymentMethod: 'paypal'
      }
    })
    const props = { history: [] }

    render(<OrderPlacement {...props} />);
  });

  it(`renders OrderPlacement component`, () => {
    // testing beforeEach hook
    // screen.getByRole('')
  });

  it(`renders 3 headings with texts: 'Shipping Summary', 'Order Summary', 'Shopping Cart'`, () => {
    const { getByText } = within(document.getElementById('shipping-summary'));
    const shippingSummary = getByText(/Shipping Summary/);
    const { getByText: getByText1 } = within(document.getElementById('order-summary'));
    const orderSummary = getByText1(/Order Summary/);
    const { getByText: getByText2 } = within(document.getElementById('shopping-cart'));
    const shoppingCart = getByText2(/Shopping Cart/);
    
    expect(screen.getAllByRole('heading').length).toBe(3);
    expect(shippingSummary).toBeInTheDocument();
    expect(orderSummary).toBeInTheDocument();
    expect(shoppingCart).toBeInTheDocument();
  });

  it(`renders checkout steps: 'Log In', 'Shipping', 'Payment', 'Place Order'`, () => {
    const logIn = document.getElementById('log-in');
    const shipping = document.getElementById('shipping');
    const payment = document.getElementById('payment');
    const placeOrder = document.getElementById('place-order');

    expect(logIn).toBeInTheDocument();
    expect(shipping).toBeInTheDocument();
    expect(payment).toBeInTheDocument();
    expect(placeOrder).toBeInTheDocument();
  });

  it(`renders address entered in previous step`, () => {
    const { getByText } = within(document.getElementById('shipping-address'));
    expect(getByText(/123 Washington/)).toBeInTheDocument();
    expect(getByText(/New York/)).toBeInTheDocument();
    expect(getByText(/5555/)).toBeInTheDocument();
    expect(getByText(/USA/)).toBeInTheDocument();
  });

  it(`renders 'Cart is Empty' if there are no items in the cart`, () => {
    expect(screen.getByText(/Cart is Empty/)).toBeInTheDocument();
  });

  it(`renders list of products in the cart`, () => {
    const spy = jest.spyOn(redux, 'useSelector')
    spy.mockReturnValue({
      cartItems: [{
        _id: 1,
        name: 'AirForce 1',
        category: 'Shoes',
        image: '../images/af1.jpg',
        price: 100,
        brand: 'Nike',
        rating: 5,
        numReviews: 10,
        countInStock: 10,
      }],
      shipping: {
        address: '123 Washington',
        city: 'New York',
        postalCode: 5555,
        country: 'USA'
      },
      payment: {
        paymentMethod: 'paypal'
      }
    })
    const props = { history: [] }

    render(
      <BrowserRouter>
        <OrderPlacement {...props} />
      </BrowserRouter>
    );

    expect(screen.getByText(/AirForce 1/)).toBeInTheDocument();
  })

  it(`renders a button with text 'Place Order'`, () => {
    const { getByText } = within(document.getElementById('place-order-button'));

    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(getByText(/Place Order/)).toBeInTheDocument();
  });

  // TODO
  // it(`'Place Order' button should call dispatch when clicked`, async () => {
  //   const useDispatchSpy = jest.spyOn(redux, 'useDispatch');

  //   const button = screen.getByRole('button');
  //   await fireEvent.click(button)
  //   expect(useDispatchSpy).toBeCalled();
  // });
});