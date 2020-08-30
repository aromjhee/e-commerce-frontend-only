import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { register } from '../actions/userActions';

const UserRegister = props => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');

  const userRegister = useSelector(state => state.userRegister)
  const { loading, userInfo, error } = userRegister;
  
  const dispatch = useDispatch();
  
  const redirect = props.location.search ? props.location.search.split('=')[1] : '/';

  useEffect(() => {
    if (userInfo) {
      props.history.push(redirect);
    }
  }, [userInfo, props.history, redirect]);

  const submitHandler = e => {
    e.preventDefault();
    dispatch(register(name, email, password));
  }

  return (
    <div className='text-gray-800 m-1'>
      <h3 className='text-3xl text-gray-700 mb-10 flex justify-center'>Create Account</h3>
      <div className='flex justify-center'>
        <form onSubmit={submitHandler} className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'>
          <div>
            {loading && (
              <div className='text-2xl flex justify-center items-center h-full w-full text-black'>
                Loading...
              </div>)
            }
            {error && (
              <div className='text-2xl flex justify-center items-center h-full w-full text-black'>
                {error}
              </div>)
            }
          </div>
          <div className='mb-4'>
            <label htmlFor='name' className='block text-gray-700 text-sm font-bold mb-2'>Name</label>
            <input
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              placeholder='Enter username'
              type='text'
              name='name'
              id='name'
              value={name}
              onChange={e => setName(e.target.value)} />
          </div>
          <div className='mb-4'>
            <label htmlFor='email' className='block text-gray-700 text-sm font-bold mb-2'>Email</label>
            <input
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              placeholder='Enter Email' 
              type='email'
              name='email'
              id='email'
              value={email}
              onChange={e => setEmail(e.target.value)} />
          </div>
          <div className='mb-4'>
            <label htmlFor='password' className='block text-gray-700 text-sm font-bold mb-2'>Password</label>
            <input
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline'
              placeholder='Enter Password'
              type='password'
              name='password'
              id='password'
              value={password}
              onChange={e => setPassword(e.target.value)} />
          </div>
          <div className='mb-4'>
            <label htmlFor='rePassword' className='block text-gray-700 text-sm font-bold mb-2'>Re-Enter Password</label>
            <input
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline'
              placeholder='Re-Enter Password'
              type='password'
              name='rePassword'
              id='rePassword'
              value={rePassword}
              onChange={e => setRePassword(e.target.value)} />
          </div>
          <div className='flex justify-center'>
            <button 
              type='submit' 
              className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline button-width-custom mb-4'>Register</button>
          </div>
          <div className='font-black text-sm flex justify-center mb-4'>
            Already have an account? 
          </div>
          <div>
            <Link 
              to={redirect === '/' ? 'log-in' : `log-in?redirect=${redirect}`}
              className='flex justify-center text-blue-800 text-lg font-bold hover:text-blue-500'>
                Log In
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default UserRegister;