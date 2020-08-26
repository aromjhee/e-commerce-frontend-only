import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const NavBar = () => {
  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;
  
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
                <Link to='/products'>Create</Link>
              </div>
            ) :
            null
          }
          <div className='link-hover-color pr-8'>
            <Link to='/cart/:id?'>Cart</Link>
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