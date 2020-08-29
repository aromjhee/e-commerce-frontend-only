import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { addToCart, removeFromCart } from '../actions/cartActions';

const Cart = props => {
  const cart = useSelector(state => state.cart);
  const { cartItems } = cart;

  // couldn't get test to pass
  // when using useParams from react-router-dom
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
      <h3 className='text-3xl text-gray-700 mb-10 ml-10'>Shopping Cart</h3>
      <div className='flex justify-between'>
        <div className='cart-list-container text-gray-700'>
          {
            cartItems.length === 0 ? (
              <div className='text-xl'>Cart is Empty</div>
            ) :
            cartItems.map(item => (
              <div key={item.name} className='flex items-center'>
                <img className='product-cart-image ml-10' src={item.image} alt='product' />
                <div className='font-bold ml-4'>
                  <Link to={`/product/${item.product}`}>
                    {item.name}
                  </Link>
                </div>
                <div className='text-sm ml-20'> Qty: 
                  <select 
                    className='p-1 rounded-lg'
                    value={item.qty} 
                    onChange={(e) => dispatch(addToCart(item.product, e.target.value))}>
                      {[...Array(item.countInStock).keys()].map(x =>
                        <option key={x + 1} value={x + 1}>{x + 1}</option>
                      )}
                  </select>
                </div>
                <div className='text-indigo-600 text-sm font-bold ml-20'>
                  ${item.price}
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
        <div className='text-gray-700 px-4 mr-10 flex flex-col items-center content-center justify-center border-4 rounded-lg border-indigo-200 p-5'>
          <h3 className=''>
            SubTotal ({cartItems.reduce((a, c) => a + Number(c.qty), 0)} items):
            ${cartItems.reduce((a, c) => a + c.price * c.qty, 0)}
          </h3>
          <button 
            onClick={checkoutHandler} 
            className='text-gray-900 bg-gray-500 hover:bg-gray-400 px-4 py-1 text-xl rounded-full font-semibold mt-4' 
            disabled={cartItems.length === 0}>
              Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  )
}

export default Cart;