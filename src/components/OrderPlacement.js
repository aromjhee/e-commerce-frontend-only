import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import CheckoutSteps from './CheckoutSteps';

const OrderPlacement = props => {
  const cart = useSelector(state => state.cart);

  const { cartItems, shipping, payment } = cart;

  // if (!shipping.address) {
  //   props.history.push('/shipping');
  // } else if (!payment.paymentMethod) {
  //   props.history.push('/payment');
  // }

  const itemsPrice = cartItems.reduce((a, c) => a + c.price * c.qty, 0);
  const shippingPrice = itemsPrice > 100 ? 0 : 10;
  const taxPrice = 0.15 * itemsPrice;
  const totalPrice = itemsPrice + shippingPrice + taxPrice;

  // const dispatch = useDispatch();

  const placeOrderHandler = () => {
    
  }

  // useEffect(() => {
  // }, []);

  return (
    <>
      <CheckoutSteps step1 step2 step3 step4 />
      <div className='mt-10'>
        <div className='text-gray-700'>
          <div className='flex justify-center'>
            <div className='flex flex-col items-start m-10 justify-start'>
              <h3 className='text-xl mb-2 font-bold'>Shipping Summary</h3>
              <div className='flex flex-col content-end mb-2'>
                <div><span className='font-bold text-sm'>Address:</span> {cart.shipping.address}</div>
                <div><span className='font-bold text-sm'>City:</span> {cart.shipping.city}</div>
                <div><span className='font-bold text-sm'>Zip Code:</span> {cart.shipping.postalCode}</div>
                <div><span className='font-bold text-sm'>Country:</span> {cart.shipping.country}</div>
                <div><span className='font-bold text-sm'>Payment:</span> {cart.payment.paymentMethod}</div>
              </div>
            </div>
            <div className='text-gray-700 px-4 m-10 flex flex-col items-center content-center justify-around border rounded-lg border-indigo-200 p-5 order-placement-box-size'>
              <button
                onClick={placeOrderHandler}
                className='text-gray-900 bg-gray-500 hover:bg-gray-400 px-4 py-1 text-2xl rounded-full font-semibold mt-6 button-width-custom'>
                Place Order
                </button>
              <h3 className='mt-6 mb-2 text-xl font-bold'>Order Summary</h3>
              <div className='text-sm font-bold mb-2'>
                Subtotal:
                <span className='text-orange-600 text-sm font-bold ml-2'>
                  ${itemsPrice.toFixed(2)}
                </span>
              </div>
              <div className='text-sm font-bold mb-2'>
                Shipping:
                <span className='text-orange-600 text-sm font-bold ml-2'>
                  ${shippingPrice.toFixed(2)}
                </span>
              </div>
              <div className='text-sm font-bold mb-2'>
                Tax:
                <span className='text-orange-600 text-sm font-bold ml-2'>
                  ${taxPrice.toFixed(2)}
                </span>
              </div>
              <div className='text-lg font-bold mb-6'>
                Total Price:
                <span className='text-orange-600 text-sm font-bold ml-2'>
                  ${totalPrice.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
          <h3 className='text-xl mb-4 font-bold flex justify-center'>Shopping Cart</h3>
          <div className='flex justify-center'>
            <div className='flex flex-col w-11/12 mb-10'>
                {
                  cartItems.length === 0 ? (
                  <div className='text-xl'>Cart is Empty</div>
                  ) :
                  cartItems.map(item => (
                    <div key={item.name} className='flex items-center border border-indigo-200 rounded-lg ml-4 mb-2 p-2 justify-around'>
                      <Link to={`/product/${item.product}`}>
                        <img 
                          className='product-cart-image ml-1 border border-purple-200'
                          src={item.image}
                          alt='product' />
                      </Link>
                      <div className='font-bold ml-4 w-32'>
                        <Link to={`/product/${item.product}`}>
                          {item.name}
                        </Link>
                      </div>
                      <div className='text-sm ml-20 flex flex-col'> 
                        <div className='self-center'>
                          Qty: {item.qty}
                        </div>
                        <div className='text-xs text-gray-600 self-center'>
                          ${(item.price).toFixed(2)} per item
                        </div>
                      </div>
                      <div className='text-indigo-600 text-sm font-bold ml-10'>
                        ${(item.price * item.qty).toFixed(2)}
                      </div>
                    </div>
                  ))
                }
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default OrderPlacement;