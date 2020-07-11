import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { register } from '../actions/userActions';

const RegisterScreen = props => {
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
    <div className='form'>
      <form onSubmit={submitHandler}>
        <ul className='form-container'>
          <li>
            <h2>Create Account</h2>
          </li>
          <li>
            {loading && <div>Loading...</div>}
            {error && <div>{error}</div>}
          </li>
          <li>
            <label htmlFor='name'>Name</label>
            <input
              type='text'
              name='name'
              id='name'
              value={name}
              onChange={e => setName(e.target.value)} />
          </li>
          <li>
            <label htmlFor='email'>Email</label>
            <input
              type='email'
              name='email'
              id='email'
              value={email}
              onChange={e => setEmail(e.target.value)} />
          </li>
          <li>
            <label htmlFor='password'>Password</label>
            <input
              type='password'
              name='password'
              id='password'
              value={password}
              onChange={e => setPassword(e.target.value)} />
          </li>
          <li>
            <label htmlFor='rePassword'>Re-Enter Password</label>
            <input
              type='password'
              name='rePassword'
              id='rePassword'
              value={rePassword}
              onChange={e => setRePassword(e.target.value)} />
          </li>
          <li>
            <button 
              type='submit' 
              className='button primary full-width'>Register</button>
          </li>
            Already have an account? 
            <Link 
              to={redirect === '/' ? 'log-in' : `log-in?redirect=${redirect}`}>
                Log In
            </Link>
        </ul>
      </form>
    </div>
  )
}

export default RegisterScreen;