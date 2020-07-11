import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import * as redux from 'react-redux'
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import RegisterScreen from '../components/RegisterScreen';

describe('RegisterScreen component', () => {
  beforeEach(() => {
    const spy = jest.spyOn(redux, 'useSelector')
    spy.mockReturnValue({
      userInfo: {},
    })
    const useDispatchSpy = jest.spyOn(redux, 'useDispatch');
    const mockDispatchFn = jest.fn();
    useDispatchSpy.mockReturnValue(mockDispatchFn);
    const props = { history: [], location: {} };

    render(
      <BrowserRouter>
        <RegisterScreen {...props} />
      </BrowserRouter>
    );
  });

  it('renders RegisterScreen component', () => {
    // testing beforeEach hook
  });

  it(`renders text 'Create Account'`, () => {
    expect(screen.getByRole('heading')).toBeInTheDocument();
    expect(screen.queryByText('Create Account')).toBeInTheDocument();
  });

  it('renders a form with 2 text input fields (name & email), and 2 password  input fields', () => {
    expect(screen.getAllByRole('textbox').length).toEqual(2);
    expect(screen.getAllByText(/password/i).length).toEqual(2);
  });

  it(`Name input field calls the onChange callback handler to update it's value`, async () => {
    const input = screen.getByLabelText('Name');

    await fireEvent.change(input, { target: { value: 'John Doe' } });

    expect(input.value).toBe('John Doe');
  });

  it(`Email input field calls the onChange callback handler to update it's value`, async () => {
    const input = screen.getByLabelText('Email');

    await fireEvent.change(input, { target: { value: 'test@test.com' } });

    expect(input.value).toBe('test@test.com');
  });

  it(`Password input field calls the onChange callback handler to update it's value`, async () => {
    const input = screen.getByLabelText('Password');

    await fireEvent.change(input, { target: { value: '1234' } });

    expect(input.value).toBe('1234');
  });

  it(`Re-Enter Password input field calls the onChange callback handler to update it's value`, async () => {
    const input = screen.getByLabelText('Re-Enter Password');

    await fireEvent.change(input, { target: { value: '1234' } });

    expect(input.value).toBe('1234');
  });

  it(`renders button with text 'Register'`, () => {
    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.queryByText(/Register/)).toBeInTheDocument();
  });

  it('Form should call dispatch when submitted', async () => {
    const useDispatchSpy = jest.spyOn(redux, 'useDispatch');

    const input1 = screen.getByLabelText('Name');
    await fireEvent.change(input1, { target: { value: 'John Doe' } });

    const input2 = screen.getByLabelText('Email');
    await fireEvent.change(input2, { target: { value: 'test@test.com' } });

    const input3 = screen.getByLabelText('Password');
    await fireEvent.change(input3, { target: { value: '1234' } });

    const input4 = screen.getByLabelText('Re-Enter Password');
    await fireEvent.change(input4, { target: { value: '1234' } });

    const button = screen.getByRole('button');
    await fireEvent.click(button)
    expect(useDispatchSpy).toBeCalled();
  });
});