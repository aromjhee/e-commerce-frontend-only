import Cookie from 'js-cookie';
import { USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGIN_FAIL, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_REGISTER_FAIL, USER_LOGOUT_SUCCESS } from '../constant/userConstants';

// let url = 'http://localhost:8080';
let url;
if (process.env.NODE_ENV === 'development') {
  url = 'http://localhost:8080';
} else {
  url = 'https://e-commerce-5555.herokuapp.com'
}

const logIn = (email, password) => async dispatch => {
  dispatch({ type: USER_LOGIN_REQUEST, payload: {email, password}});
  try {
    const res = await fetch(`${url}/api/users/log-in`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({email, password})
    });
    if (res.ok) {
      const data = await res.json();
      dispatch({ type: USER_LOGIN_SUCCESS, payload: data});
      Cookie.set('userInfo', JSON.stringify(data));
    }
  } catch(e) {
    dispatch({ type: USER_LOGIN_FAIL, payload: e.message });
  }
};

const logOut = () => dispatch => {
  dispatch({ type: USER_LOGOUT_SUCCESS });
  Cookie.remove('userInfo');
};

const register = (name, email, password) => async dispatch => {
  dispatch({ type: USER_REGISTER_REQUEST, payload: { name, email, password } });
  try {
    const res = await fetch(`${url}/api/users/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password })
    });
    if (res.ok) {
      const data = await res.json();
      dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
      Cookie.set('userInfo', JSON.stringify(data));
    }
  } catch (e) {
    dispatch({ type: USER_REGISTER_FAIL, payload: e.message });
  }
};

export { logIn, register, logOut };