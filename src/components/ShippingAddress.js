import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { saveShipping } from '../actions/cartActions';
import CheckoutSteps from './CheckoutSteps';

const ShippingAddress = props => {
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
      <div className='h-screen flex flex-col content-center items-center'>
        <h2 className='text-3xl text-gray-700 my-10'>Shipping</h2>
        <form onSubmit={submitHandler}>
          <div className='mb-4'>
            <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='address'>Address</label>
            <input
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type='text'
              name='address'
              id='address'
              value={address}
              onChange={e => setAddress(e.target.value)} />
          </div>
          <div className='mb-4'>
            <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='city'>City</label>
            <input
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type='text'
              name='city'
              id='city'
              value={city}
              onChange={e => setCity(e.target.value)} />
          </div>
          <div className='mb-4'>
            <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='postalCode'>Postal Code</label>
            <input
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type='number'
              name='postalCode'
              id='postalCode'
              value={postalCode}
              onChange={e => setPostalCode(e.target.value)} />
          </div>
          <div className='mb-4'>
            <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='country'>Country</label>
            <input
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type='text'
              name='country'
              id='country'
              value={country}
              onChange={e => setCountry(e.target.value)} />
          </div>
          <div className='flex justify-center'>
            <button 
              type='submit' 
              className='text-white bg-orange-500 p-4 py-1 text-sm rounded mt-4 font-semibold'>Continue</button>
          </div>
        </form>
      </div>
    </>
  )
}

export default ShippingAddress;