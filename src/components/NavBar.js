import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const NavBar = (props) => {
  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;
  
  const cart = useSelector(state => state.cart);
  const { cartItems } = cart;
  
  const id = cartItems.map(x => x.product)[0] ? cartItems.map(x => x.product)[0] : 1
  const qty = cartItems.map(x => x.qty)[0] ? cartItems.map(x => x.qty)[0] : 1;
  
  return (
    <div className='col-start-1 col-span-1 row-start-1 row-span-1 navbar-bg-color h-12'>
      <div className='flex h-full w-full justify-between items-center p-4'>
        <div className='link-hover-color text-2xl'>
          <Link to='/'>imma-Zone</Link>
        </div>
        <div className='flex items-center'>
          { 
            userInfo && userInfo.isAdmin ?
            (
              <div className='link-hover-color px-10'>
                <Link to='/CRUDProduct'>Create/Edit</Link>
              </div>
            ) :
            null
          }
          <div className='link-hover-color pr-8'>
            <Link to={`/cart/${id}?qty=${qty}`}>Cart</Link>
          </div>
          {
            userInfo ?
              (
                <div className='link-hover-color'>
                  <Link to='/profile'>{userInfo.name}</Link>
                </div>
              ) : (
                <div className='link-hover-color'>
                  <Link to='/log-in'>Log In</Link>
                </div>
              )
          }
        </div>
      </div>
    </div>
  )
}

export default NavBar;