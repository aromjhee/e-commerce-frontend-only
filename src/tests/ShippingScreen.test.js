import React from 'react';
import * as redux from 'react-redux'
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import ShippingScreen from '../components/ShippingScreen';

describe('ShippingScreen component', () => {
  beforeEach(() => {
    const useDispatchSpy = jest.spyOn(redux, 'useDispatch');
    const mockDispatchFn = jest.fn();
    useDispatchSpy.mockReturnValue(mockDispatchFn);
    const props = { history: [] };

    render(<ShippingScreen {...props} />);
  });

  it('renders ShippingScreen component', () => {
    // testing beforeEach hook
  });

  it(`renders text 'Shipping' 2 times`, () => {
    expect(screen.getByRole('heading')).toBeInTheDocument();
    expect(screen.getAllByText(/Shipping/).length).toEqual(2);
  });

  it('renders a form with 3 text input fields and 1 number input field', () => {
    expect(screen.getAllByRole('textbox').length).toEqual(3);
    expect(screen.getAllByRole('spinbutton').length).toEqual(1);
  });

  it(`Address input field calls the onChange callback handler to update it's value`, async () => {
    const input = screen.getByLabelText('Address');

    await fireEvent.change(input, { target: { value: '123 Address' } });

    expect(input.value).toBe('123 Address');
  });

  it(`City input field calls the onChange callback handler to update it's value`, async () => {
    const input = screen.getByLabelText('City');

    await fireEvent.change(input, { target: { value: 'New York City' } });

    expect(input.value).toBe('New York City');
  });

  it(`Postal Code input field calls the onChange callback handler to update it's value`, async () => {
    const input = screen.getByLabelText('Postal Code');

    await fireEvent.change(input, { target: { value: '1234' } });

    expect(input.value).toBe('1234');
  });

  it(`Postal Code input field should not allow letters to be inputted`, async () => {
    const input = screen.getByLabelText('Postal Code');

    await fireEvent.change(input, { target: { value: 'abc' } });

    expect(input.value).toBe('');
  });

  it(`Country input field calls the onChange callback handler to update it's value`, async () => {
    const input = screen.getByLabelText('Country');

    await fireEvent.change(input, { target: { value: 'USA' } });

    expect(input.value).toBe('USA');
  });

  it('Form should call dispatch when submitted', async () => {
    const useDispatchSpy = jest.spyOn(redux, 'useDispatch');

    const input1 = screen.getByLabelText('Address');
    await fireEvent.change(input1, { target: { value: '123 Address' } });
    const input2 = screen.getByLabelText('City');
    await fireEvent.change(input2, { target: { value: 'New York City' } });
    const input3 = screen.getByLabelText('Postal Code');
    await fireEvent.change(input3, { target: { value: '1234' } });
    const input4 = screen.getByLabelText('Country');
    await fireEvent.change(input4, { target: { value: 'USA' } });

    const button = screen.getByRole('button');
    await fireEvent.click(button)
    expect(useDispatchSpy).toBeCalled();
  })
});