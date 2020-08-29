import React from 'react';
import { useDispatch } from 'react-redux';
import { logOut } from '../actions/userActions';

const UserProfile = (props) => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(logOut());
    props.history.push('/');
  }

  return (
    <div className='text-gray-700'>
      <h3 className='text-3xl text-gray-700 mb-10 ml-10'>User Profile</h3>
      <div>
        <button 
          onClick={handleClick} 
          className='bg-gray-400 hover:bg-gray-500 text-gray-700 font-bold py-2 px-4 rounded-lg ml-10 mb-10 inline-flex items-center text-sm'>
            Log Out
        </button>
      </div>
    </div>
  )
}

export default UserProfile;