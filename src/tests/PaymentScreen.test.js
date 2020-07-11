import React from 'react';
import * as redux from 'react-redux'
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { within } from '@testing-library/dom'

import PaymentScreen from '../components/PaymentScreen';

describe('PaymentScreen component', () => {
  beforeEach(() => {
    const useDispatchSpy = jest.spyOn(redux, 'useDispatch');
    const mockDispatchFn = jest.fn();
    useDispatchSpy.mockReturnValue(mockDispatchFn);
    const props = { history: [] };

    render(<PaymentScreen {...props} />);
  });

  it('renders PaymentScreen component', () => {
    // testing beforeEach hook
  });

  it(`renders text 'Payment'`, () => {
    const { getByText } = within(document.querySelector('.form-container'));
    
    expect(screen.getByRole('heading')).toBeInTheDocument();
    expect(getByText(/Payment/)).toBeInTheDocument();
  });

  it(`renders a radio input field with text 'Paypal'`, () => {
    expect(screen.getByRole('radio')).toBeInTheDocument();
    expect(screen.getByText(/Paypal/)).toBeInTheDocument();
  });

  it(`renders button with text 'Continue'`, () => {
    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.queryByText(/Continue/)).toBeInTheDocument();
  });

  it('Form should call dispatch when clicked', async () => {
    const useDispatchSpy = jest.spyOn(redux, 'useDispatch');

    const button = screen.getByRole('button');
    await fireEvent.click(button)
    expect(useDispatchSpy).toBeCalled();
  });
});