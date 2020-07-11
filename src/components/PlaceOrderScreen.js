import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import CheckoutSteps from './CheckoutSteps';

const PlaceOrderScreen = props => {
  const cart = useSelector(state => state.cart);

  const { cartItems, shipping, payment } = cart;

  if (!shipping.address) {
    props.history.push('/shipping');
  } else if (!payment.paymentMethod) {
    props.history.push('/payment');
  }

  const itemsPrice = cartItems.reduce((a, c) => a + c.price * c.qty, 0);
  const shippingPrice = itemsPrice > 100 ? 0 : 10;
  const taxPrice = 0.15 * itemsPrice;
  const totalPrice = itemsPrice + shippingPrice + taxPrice;

  // const dispatch = useDispatch();

  const placeOrderHandler = () => {
    // TODO
  }

  useEffect(() => {
  }, []);

  return (
    <>
      <CheckoutSteps step1 step2 step3 step4 />
      <div className='placeorder'>
        <div className='placeorder-info'>
          <div>
            <h3>Shipping</h3>
            <div>
              {cart.shipping.address}, 
              {cart.shipping.city}, 
              {cart.shipping.postalCode},
              {cart.shipping.country}
            </div>
            <div>
              <h3>Payment</h3>
              <div>Payment Method: {cart.payment.paymentMethod}</div>
            </div>
          </div>
          <div>
            <ul className='placeorder-list-container'>
              <li>
                <h3>Shopping Cart</h3>
                <div>Price</div>
              </li>
              {
                cartItems.length === 0 ? (
                  <div>Cart is Empty</div>
                ) :
                cartItems.map(item => (
                  <li key={item.name}>
                    <div className='cart-image'>
                      <img src={item.image} alt='product' />
                    </div>
                    <div className='cart-name'>
                      <div>
                        <Link to={`/product/${item.product}`}>
                          {item.name}
                        </Link>
                      </div>
                      <div> 
                        Qty: {item.qty}
                      </div>
                    </div>
                    <div className='cart-price'>
                      ${item.price}
                    </div>
                  </li>
                ))
              }
            </ul>
          </div>
        </div>
        <div className='placeorder-action'>
          <ul>
            <li>
              <button 
                onClick={placeOrderHandler}
                className='button primary full-width'>
                  Place Order
              </button>
            </li>
            <li>
              <h3>Order Summary</h3>
            </li>
            <li>
              <div>Items</div>
              <div>${itemsPrice}</div>
            </li>
            <li>
              <div>Shipping</div>
              <div>${shippingPrice}</div>
            </li>
            <li>
              <div>Tax</div>
              <div>${taxPrice}</div>
            </li>
            <li>
              <div>Order Total</div>
              <div>${totalPrice}</div>
            </li>
          </ul>
        </div>
      </div>
    </>
  )
}

export default PlaceOrderScreen;