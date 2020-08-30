import React from 'react';
import * as redux from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { within } from '@testing-library/dom'

import Cart from '../components/Cart';

describe('Cart component', () => {
  beforeEach(() => {
    const spy = jest.spyOn(redux, 'useSelector');
    spy.mockReturnValue({
      cartItems: [{
        product: 1,
        name: 'AirForce 1',
        image: '../images/af1.jpg',
        price: 100,
        countInStock: 10,
        qty: 2
      }]
    });
    const useDispatchSpy = jest.spyOn(redux, 'useDispatch');
    const mockDispatchFn = jest.fn();
    useDispatchSpy.mockReturnValue(mockDispatchFn);

    const props = { history: [], location: {}, match: { params: {} } };

    render(
      <BrowserRouter>
        <Cart {...props} />
      </BrowserRouter>
    );
  });

  it(`renders Cart component`, () => {
    // testing beforeEach hook
  });

  it(`renders 2 headings with text 'Shopping Cart' and 'SubTotal`, () => {
    const { getByText: getByText1 } = within(document.getElementsByTagName('h3'));
    console.log('--------------', getByText1)
    const shoppingCart = getByText1(/Shopping Cart/);

    const { getByText } = within(document.getElementsByTagName('h3'));
    const subTotal = getByText(/SubTotal/);
    
    expect(screen.getAllByRole('heading').length).toBe(2);
    expect(shoppingCart).toBeInTheDocument();
    expect(subTotal).toBeInTheDocument();
  });

  it(`renders a heading with text of the product's name`, () => {
    const { getByText } = within(document.querySelector('.cart-name'));
    expect(getByText(/AirForce 1/)).toBeInTheDocument();
  });

  it(`renders a heading with text of the product's price`, () => {
    const { getByText } = within(document.querySelector('.cart-price'));
    expect(getByText(/100/)).toBeInTheDocument();
  });

  it(`renders a select option for Qty equal to number of products in stock`, () => {
    expect(screen.getAllByRole('option').length).toBe(10)
    expect(screen.getByText(/Qty/)).toBeInTheDocument();
  });

  it(`renders an image of the product`, () => {
    expect(screen.getByRole('img')).toBeInTheDocument();
  });

  it(`renders a product name that has href to /product/:id`, () => {
    expect(screen.getByText(/AirForce 1/).href).toBe('http://localhost/product/1');
  });

  it(`renders a delete product button`, () => {
    expect(screen.getAllByRole('button').length).toBe(2);
    expect(screen.getByText(/Delete/)).toBeInTheDocument();
  });

  it(`renders 'Cart is Empty' if there are no items in the cart`, () => {
    const spy = jest.spyOn(redux, 'useSelector');
    spy.mockReturnValue({
      cartItems: []
    });
    const props = { history: [], location: {}, match: { params: {} } };

    render(
      <BrowserRouter>
        <Cart {...props} />
      </BrowserRouter>
    );
    expect(screen.getByText(/Cart is Empty/)).toBeInTheDocument();
  });

  it(`renders a button with text 'Place Order'`, () => {
    expect(screen.getAllByRole('button').length).toBe(2);
    expect(screen.getByText(/Proceed to Checkout/)).toBeInTheDocument();
  });

  it(`renders correct subtotal amount`, () => {
    const { getByText } = within(document.querySelector('.cart-action'));
    expect(getByText(/200/)).toBeInTheDocument();
  });

  it(`'Place Order' button should call dispatch when clicked`, async () => {
    const useDispatchSpy = jest.spyOn(redux, 'useDispatch');

    const button = screen.getAllByRole('button')[1];
    await fireEvent.click(button)
    expect(useDispatchSpy).toBeCalled();
  });
});