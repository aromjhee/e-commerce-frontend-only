import React from 'react';

const CheckoutSteps = props => {
  return (
    <div className='flex justify-around check-out-steps-width m-auto text-sm text-gray-700 mt-10'>
      <div className={props.step1 ? 'pt-1 px-8 border-t-2 border-green-400' : 'pt-1 px-8 border-t-2 border-red-400'} id='log-in'>Log in</div>
      <div className={props.step2 ? 'pt-1 px-8 border-t-2 border-green-400' : 'pt-1 px-8 border-t-2 border-red-400'} id='shipping'>Shipping</div>
      <div className={props.step3 ? 'pt-1 px-8 border-t-2 border-green-400' : 'pt-1 px-8 border-t-2 border-red-400'} id='payment'>Payment</div>
      <div className={props.step4 ? 'pt-1 px-8 border-t-2 border-green-400' : 'pt-1 px-8 border-t-2 border-red-400'} id='place-order'>Place Order</div>
    </div>
  )
}

export default CheckoutSteps;