import React from 'react';
import * as redux from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import ProductScreen from '../components/ProductScreen';

describe('ProductScreen component', () => {
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
        <ProductScreen {...props} />
      </BrowserRouter>
    );
  });

  it(`renders ProductScreen component`, () => {
    // testing beforeEach hook
  });

  it(`renders a heading with text of the product's name`, () => {
    expect(screen.getByRole('heading')).toBeInTheDocument();
    expect(screen.queryByText(/AirForce 1/)).toBeInTheDocument();
  });

  it(`renders a link with text 'Back to result'`, () => {
    expect(screen.getByRole('link')).toBeInTheDocument();
    expect(screen.queryByText(/Back to result/)).toBeInTheDocument();
  });

  it(`renders an image of the product`, () => {
    expect(screen.getByRole('img')).toBeInTheDocument();
  });

  it(`renders a button with text 'Add to Cart'`, () => {
    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.queryByText(/Add to Cart/)).toBeInTheDocument();
  });

  it(`'Add to Cart' button should call dispatch when clicked`, async () => {
    const useDispatchSpy = jest.spyOn(redux, 'useDispatch');

    const button = screen.getByRole('button');
    await fireEvent.click(button)
    expect(useDispatchSpy).toBeCalled();
  });
});