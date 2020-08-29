import React from 'react';
import * as redux from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { within } from '@testing-library/dom'

import Products from '../components/Products';

describe('Products component', () => {
  beforeEach(() => {
    const spy = jest.spyOn(redux, 'useSelector')
    spy.mockReturnValue({
      products: [{
          _id: 1,
          name: 'AirForce 1',
          category: 'Shoes',
          image: '../images/af1.jpg',
          price: 100,
          brand: 'Nike',
          rating: 5,
          numReviews: 10,
          countInStock: 10,
      }]
    })
    const useDispatchSpy = jest.spyOn(redux, 'useDispatch');
    const mockDispatchFn = jest.fn();
    useDispatchSpy.mockReturnValue(mockDispatchFn);

    render(
      <BrowserRouter>
        <Products />
      </BrowserRouter>
    );
  });

  it(`renders Products component`, () => {
    // testing beforeEach hook
  });

  it(`renders a heading with text of the product's name`, () => {
    const { getByText } = within(document.querySelector('.product-name'));
    expect(getByText(/AirForce 1/)).toBeInTheDocument();
  });

  it(`renders a heading with text of the product's brand`, () => {
    const { getByText } = within(document.querySelector('.product-brand'));
    expect(getByText(/Nike/)).toBeInTheDocument();
  });

  it(`renders a heading with text of the product's price`, () => {
    const { getByText } = within(document.querySelector('.product-price'));
    expect(getByText(/100/)).toBeInTheDocument();
  });

  it(`renders a heading with text of the product's rating`, () => {
    const { getByText } = within(document.querySelector('.product-rating'));
    expect(getByText(/Stars/)).toBeInTheDocument();
  });

  it(`renders an image of the product`, () => {
    expect(screen.getByRole('img')).toBeInTheDocument();
  });

  it(`renders a product image that has href to /product/:id`, () => {
    const { getAllByText } = within(document.querySelector('a'));
    expect(getAllByText('')[0].href).toBe('http://localhost/product/1');
  });

  it(`renders a product name that has href to /product/:id`, () => {
    expect(screen.getByText(/AirForce 1/).href).toBe('http://localhost/product/1');
  });
});