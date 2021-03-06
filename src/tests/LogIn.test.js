import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import * as redux from 'react-redux'
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import LogIn from '../components/LogIn';

describe('LogIn component', () => {
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
        <LogIn {...props} />
      </BrowserRouter>
    );
  });

  it('renders LogIn component', () => {
    // testing beforeEach hook
    // screen.getByRole('')
  });

  it(`renders text 'Log In'`, () => {
    expect(screen.getByRole('heading')).toBeInTheDocument();
    expect(screen.queryAllByText(/Log In/)[0]).toBeInTheDocument();
  });

  it('renders a form with 1 text input field for email, and 1 password  input field', () => {
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByText(/password/i)).toBeInTheDocument();
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

  it(`renders two buttons with text 'Log In' and 'Demo Admin Log In'`, () => {
    expect(screen.getAllByRole('button').length).toBe(2);
    expect(screen.queryAllByText(/Log In/)[1]).toBeInTheDocument();
    expect(screen.getByText(/Demo Admin Log In/)).toBeInTheDocument();
  });

  it('Form should call dispatch when submitted', async () => {
    const useDispatchSpy = jest.spyOn(redux, 'useDispatch');

    const input1 = screen.getByLabelText('Email');
    await fireEvent.change(input1, { target: { value: 'test@test.com' } });

    const input2 = screen.getByLabelText('Password');
    await fireEvent.change(input2, { target: { value: '1234' } });

    const button = screen.getAllByRole('button')[0];
    await fireEvent.click(button)
    expect(useDispatchSpy).toBeCalled();
  });
});