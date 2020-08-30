import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { addToCart, removeFromCart } from '../actions/cartActions';

const Cart = props => {
  const cart = useSelector(state => state.cart);
  const { cartItems } = cart;

  // couldn't get test to pass
  // when using useParams from react-router-dom
  // make sure to import useParams in react-router-dom
  // const { id } = useParams();
  const id = props.match.params.id;
  const qty = props.location.search ? Number(props.location.search.split('=')[1]) : 1;
  const dispatch = useDispatch();

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  }

  const checkoutHandler = () => {
    props.history.push('/log-in?redirect=shipping');
  }

  useEffect(() => {
    if (id) {
      dispatch(addToCart(id, qty));
    }
  }, [id, qty, dispatch]);

  return (
    <div>
      <h3 className='text-3xl text-gray-700 mb-10 ml-10' id='shopping-cart'>Shopping Cart</h3>
      <button className='bg-gray-400 hover:bg-gray-500 text-gray-700 font-bold py-2 px-4 rounded-lg ml-10 mb-10 inline-flex items-center text-sm'>
        <Link to='/'>Continue Shopping</Link>
      </button>
      <div className='flex'>
        {
          cartItems.length === 0 ? (
            <div className='text-gray-700 w-1/2 m-auto'>
              <div className='text-xl'>
                Cart is Empty
              </div>
            </div>
          ) : (
            <div className='flex flex-col'>
              {cartItems.map(item => (
                <div key={item.name} className='flex items-center border border-indigo-200 rounded-lg ml-10 mb-2 p-2 justify-around cart-row-width text-gray-700 h-24'>
                  <Link to={`/product/${item.product}`}>
                    <img 
                      className='product-cart-image ml-2 border border-purple-200' 
                      src={item.image} 
                      alt='product' />
                  </Link>
                  <div className='font-bold m-4 w-32' id='product-name'>
                    <Link to={`/product/${item.product}`}>
                      {item.name}
                    </Link>
                  </div>
                  <div className='text-sm ml-20'> Qty: 
                    <select 
                      className='p-1 rounded-lg ml-1'
                      value={item.qty} 
                      onChange={(e) => dispatch(addToCart(item.product, e.target.value))}>
                        {[...Array(item.countInStock).keys()].map(x =>
                          <option key={x + 1} value={x + 1}>{x + 1}</option>
                        )}
                    </select>
                  </div>
                  <div className='text-indigo-600 text-sm font-bold ml-20' id='product-price'>
                    ${item.price} <span className='text-xs text-gray-500'>/item</span>
                  </div>
                  <button 
                    onClick={() => removeFromCartHandler(item.product)}
                    className='text-white bg-red-500 px-4 py-1 text-sm rounded mx-2 font-semibold ml-20'>
                      Delete
                  </button>
                </div>
              ))
              }
            </div>
          )
        }
        <div className='text-gray-700 px-4 mr-20 flex flex-col items-center content-center justify-around border rounded-lg border-indigo-200 p-5 cart-checkout-box-height ml-10'>
          <h3 id='subtotal'>
            SubTotal ({cartItems.reduce((a, c) => a + Number(c.qty), 0)} items):
            ${cartItems.reduce((a, c) => a + c.price * c.qty, 0)}
          </h3>
          <button 
            onClick={checkoutHandler} 
            className='text-gray-900 bg-gray-500 hover:bg-gray-400 px-4 py-1 text-xl rounded-full font-semibold mt-10' 
            disabled={cartItems.length === 0}>
              Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  )
}

export default Cart;