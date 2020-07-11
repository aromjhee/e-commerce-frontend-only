import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { saveShipping } from '../actions/cartActions';
import CheckoutSteps from './CheckoutSteps';

const ShippingScreen = props => {
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('');

  const dispatch = useDispatch();

  const submitHandler = e => {
    e.preventDefault();
    dispatch(saveShipping({address, city, postalCode, country}));
    props.history.push('payment')
  }

  return (
    <>
      <CheckoutSteps step1 step2 />
      <div className='form'>
        <form onSubmit={submitHandler}>
          <ul className='form-container'>
            <li>
              <h2>Shipping</h2>
            </li>
            <li>
              <label htmlFor='address'>Address</label>
              <input
                type='text'
                name='address'
                id='address'
                value={address}
                onChange={e => setAddress(e.target.value)} />
            </li>
            <li>
              <label htmlFor='city'>City</label>
              <input
                type='text'
                name='city'
                id='city'
                value={city}
                onChange={e => setCity(e.target.value)} />
            </li>
            <li>
              <label htmlFor='postalCode'>Postal Code</label>
              <input
                type='number'
                name='postalCode'
                id='postalCode'
                value={postalCode}
                onChange={e => setPostalCode(e.target.value)} />
            </li>
            <li>
              <label htmlFor='country'>Country</label>
              <input
                type='text'
                name='country'
                id='country'
                value={country}
                onChange={e => setCountry(e.target.value)} />
            </li>
            <li>
              <button 
                type='submit' 
                className='button primary full-width'>Continue</button>
            </li>
          </ul>
        </form>
      </div>
    </>
  )
}

export default ShippingScreen;