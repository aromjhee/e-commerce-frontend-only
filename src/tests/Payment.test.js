import React from 'react';
import * as redux from 'react-redux'
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { within } from '@testing-library/dom'

import Payment from '../components/Payment';

describe('Payment component', () => {
  beforeEach(() => {
    const useDispatchSpy = jest.spyOn(redux, 'useDispatch');
    const mockDispatchFn = jest.fn();
    useDispatchSpy.mockReturnValue(mockDispatchFn);
    const props = { history: [] };

    render(<Payment {...props} />);
  });

  it('renders Payment component', () => {
    // testing beforeEach hook
    // screen.getByRole('')
  });

  it(`renders text 'Payment'`, () => {
    const { getByText } = within(document.getElementById('payment-header'));
    
    expect(screen.getByRole('heading')).toBeInTheDocument();
    expect(getByText(/Payment/)).toBeInTheDocument();
  });

  it(`renders 4 radio input field with text 'Paypal', 'Visa', 'Master', 'American Express'`, () => {
    expect(screen.getAllByRole('radio').length).toBe(4);
    expect(screen.getByText(/Paypal/)).toBeInTheDocument();
    expect(screen.getByText(/Visa/)).toBeInTheDocument();
    expect(screen.getByText(/Master/)).toBeInTheDocument();
    expect(screen.getByText(/American Express/)).toBeInTheDocument();
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