import React from 'react';
import * as redux from 'react-redux'
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { within } from '@testing-library/dom';

import App from '../App';

describe('App component', () => {
  beforeEach(() => {
    const spy = jest.spyOn(redux, 'useSelector')
    spy.mockReturnValue({
      userInfo: {
        name: 'admin',
        isAdmin: true,
      },
      products: [
        {
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
      ]
    })
    const useDispatchSpy = jest.spyOn(redux, 'useDispatch');
    const mockDispatchFn = jest.fn();
    useDispatchSpy.mockReturnValue(mockDispatchFn);

    render(<App />);
  });

  it(`renders App component`, () => {
    // testing beforeEach hook
  });

  it(`renders App component with text 'imma-Zone'`, () => {
    expect(screen.getByText(/imma-Zone/)).toBeInTheDocument();
  });

  it(`renders text 'imma-Zone' in the header and is a link`, () => {
    // expect(screen.getAllByRole('link')).toBeInstanceOf(Array);
    const { getByText } = within(screen.getAllByRole('link')[0])
    expect(getByText(/imma-Zone/)).toBeInTheDocument();
  });

  it(`renders text 'Cart' in the header and is a link`, () => {
    const { getByText } = within(screen.getAllByRole('link')[2])
    expect(getByText(/Cart/)).toBeInTheDocument();
  });

  it(`renders text 'Github' in the footer and is a link`, () => {
    const { getByText } = within(screen.getAllByRole('link')[8])
    expect(getByText(/Github/)).toBeInTheDocument();
  });

  it(`renders products`, () => {
    expect(screen.getByText(/AirForce 1/)).toBeInTheDocument();
  })
});