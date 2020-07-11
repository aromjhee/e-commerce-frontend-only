import React from 'react';
import * as redux from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { within } from '@testing-library/dom'

import PlaceOrderScreen from '../components/PlaceOrderScreen';

describe('PlaceOrderScreen component', () => {
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

    render(<PlaceOrderScreen {...props} />);
  });

  it(`renders PlaceOrderScreen component`, () => {
    // testing beforeEach hook
  });

  it(`renders 4 headings with texts: 'Shipping', 'Payment', 'Shopping Cart', 'Order Summary'`, () => {
    const { getByText: getByText1 } = within(document.querySelector('.placeorder-info'));
    const shipping = getByText1('Shipping');
    const payment = getByText1('Payment');
    const shoppingCart = getByText1('Shopping Cart');

    const { getByText } = within(document.querySelector('.placeorder-action'));
    const orderSummary = getByText('Order Summary');
    
    expect(screen.getAllByRole('heading').length).toBe(4);
    expect(shipping).toBeInTheDocument();
    expect(payment).toBeInTheDocument();
    expect(shoppingCart).toBeInTheDocument();
    expect(orderSummary).toBeInTheDocument();
  });

  it(`renders address entered in previous step`, () => {
    const { getByText } = within(document.querySelector('.placeorder-info'));
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
        <PlaceOrderScreen {...props} />
      </BrowserRouter>
    );

    expect(screen.getByText(/AirForce 1/)).toBeInTheDocument();
  })

  it(`renders a button with text 'Place Order'`, () => {
    const { getByText } = within(document.querySelector('.placeorder-action'));

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