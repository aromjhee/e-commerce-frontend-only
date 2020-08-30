import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { savePayment } from '../actions/cartActions';
import CheckoutSteps from './CheckoutSteps';

const Payment = props => {
  const [paymentMethod, setPaymentMethod] = useState('');

  const dispatch = useDispatch();

  const submitHandler = e => {
    e.preventDefault();
    dispatch(savePayment({paymentMethod}));
    props.history.push('place-order')
  }

  return (
    <>
      <CheckoutSteps step1 step2 step3 />
      <div className='h-screen flex flex-col content-center items-center'>
        <h2 className='text-3xl text-gray-700 my-10' id='payment-header'>Payment</h2>
        <form onSubmit={submitHandler}>
          <div className='mb-4'>
            <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='paymentMethod'>Paypal</label>              
            <input
              className="shadow border rounded py-2 px-3 focus:outline-none focus:shadow-outline"
              type='radio'
              name='paymentMethod'
              id='paymentMethod'
              value='paypal'
              onChange={e => setPaymentMethod(e.target.value)} />
          </div>           
          <div className='mb-4'>
            <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='paymentMethod'>Visa</label>              
            <input
              className="shadow border rounded py-2 px-3 focus:outline-none focus:shadow-outline"
              type='radio'
              name='paymentMethod'
              id='paymentMethod'
              value='visa'
              onChange={e => setPaymentMethod(e.target.value)} />
          </div>           
          <div className='mb-4'>
            <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='paymentMethod'>Master</label>              
            <input
              className="shadow border rounded py-2 px-3 focus:outline-none focus:shadow-outline"
              type='radio'
              name='paymentMethod'
              id='paymentMethod'
              value='master'
              onChange={e => setPaymentMethod(e.target.value)} />
          </div>           
          <div className='mb-4'>
            <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='paymentMethod'>American Express</label>              
            <input
              className="shadow border rounded py-2 px-3 focus:outline-none focus:shadow-outline"
              type='radio'
              name='paymentMethod'
              id='paymentMethod'
              value='american express'
              onChange={e => setPaymentMethod(e.target.value)} />
          </div>           
          <div className='mb-4'>
            <button 
              type='submit' 
              className='text-white bg-orange-500 p-4 py-1 text-sm rounded mt-4 font-semibold'>Continue</button>
          </div>
        </form>
      </div>
    </>
  )
}

export default Payment;