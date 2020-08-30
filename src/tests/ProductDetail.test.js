import React from 'react';
import * as redux from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { within } from '@testing-library/dom'

import ProductDetail from '../components/ProductDetail';

describe('ProductDetail component', () => {
  beforeEach(() => {
    const spy = jest.spyOn(redux, 'useSelector')
    spy.mockReturnValue({
      product: {
          _id: 1,
          name: 'AirForce 1',
          category: 'Shoes',
          image: '../images/af1.jpg',
          price: 100,
          brand: 'Nike',
          rating: 5,
          numReviews: 10,
          countInStock: 10,
      }
    })
    const useDispatchSpy = jest.spyOn(redux, 'useDispatch');
    const mockDispatchFn = jest.fn();
    useDispatchSpy.mockReturnValue(mockDispatchFn);
    const props = { match: { params: {} }, history: [] }

    render(
      <BrowserRouter>
        <ProductDetail {...props} />
      </BrowserRouter>
    );
  });

  it(`renders ProductDetail component`, () => {
    // testing beforeEach hook
    // screen.getByRoll('')
  });

  it(`renders a product's name`, () => {
    const { getByText } = within(document.getElementById('product-name'));

    expect(getByText(/AirForce 1/)).toBeInTheDocument();
  });

  it(`renders a link with text 'Back to Products'`, () => {
    expect(screen.getByRole('link')).toBeInTheDocument();
    expect(screen.queryByText(/Back to Products/)).toBeInTheDocument();
  });

  it(`renders an image of the product`, () => {
    expect(screen.getByRole('img')).toBeInTheDocument();
  });

  it(`renders 2 buttons with text 'Back to Products' and 'Add to Cart'`, () => {
    const { getByText } = within(document.getElementById('back-to-button'));
    const { getByText: getByText1 } = within(document.getElementById('add-to-cart-button'));
    expect(screen.getAllByRole('button').length).toBe(2);
    expect(getByText(/Back to Products/)).toBeInTheDocument();
    expect(getByText1(/Add to Cart/)).toBeInTheDocument();
  });

  it(`'Add to Cart' button should call dispatch when clicked`, async () => {
    const useDispatchSpy = jest.spyOn(redux, 'useDispatch');

    const button = screen.getAllByRole('button')[1];
    await fireEvent.click(button)
    expect(useDispatchSpy).toBeCalled();
  });
});