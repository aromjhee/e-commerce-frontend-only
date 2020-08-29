import React from 'react';
import * as redux from 'react-redux'
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import UserProfile from '../components/UserProfile';

describe('UserProfile component', () => {
  beforeEach(() => {
    const useDispatchSpy = jest.spyOn(redux, 'useDispatch');
    const mockDispatchFn = jest.fn();
    useDispatchSpy.mockReturnValue(mockDispatchFn);
    const props = { history: [] };

    render(<UserProfile {...props} />);
  });

  it('renders UserProfile component', () => {
    // testing beforeEach hook
  });

  it(`renders text 'Profile'`, () => {
    expect(screen.getByRole('heading')).toBeInTheDocument();
    expect(screen.queryByText(/Profile/)).toBeInTheDocument();
  });

  it(`renders button with text 'Log Out'`, () => {
    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.queryByText(/Log Out/)).toBeInTheDocument();
  });

  it('Form should call dispatch when clicked', async () => {
    const useDispatchSpy = jest.spyOn(redux, 'useDispatch');

    const button = screen.getByRole('button');
    await fireEvent.click(button)
    expect(useDispatchSpy).toBeCalled();
  });
});