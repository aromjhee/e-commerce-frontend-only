import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { savePayment } from '../actions/cartActions';
import CheckoutSteps from './CheckoutSteps';

const PaymentScreen = props => {
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
      <div className='form'>
        <form onSubmit={submitHandler}>
          <ul className='form-container'>
            <li>
              <h2>Payment</h2>
            </li>
            <li>
              <div>
                <input
                  type='radio'
                  name='paymentMethod'
                  id='paymentMethod'
                  value='paypal'
                  onChange={e => setPaymentMethod(e.target.value)} />
                <label htmlFor='paymentMethod'>Paypal</label>              
              </div>
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

export default PaymentScreen;