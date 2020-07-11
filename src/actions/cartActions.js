import { CART_ADD_ITEM, CART_ADD_ITEM_FAIL, CART_REMOVE_ITEM, CART_SAVE_SHIPPING, CART_SAVE_PAYMENT } from "../constant/cartConstants";
import Cookie from 'js-cookie';

// let url = 'http://localhost:8080';
let url;
if (process.env.NODE_ENV === 'development') {
  url = 'http://localhost:8080';
} else {
  url = 'https://e-commerce-5555.herokuapp.com'
}

const addToCart = (id, qty) => async (dispatch, getState) => {
  try {
    const res = await fetch(`${url}/api/products/${id}`)
    if (res.ok) {
      const data = await res.json();
      dispatch({ 
        type: CART_ADD_ITEM, 
        payload: {
          product: data._id,
          name: data.name,
          image: data.image,
          price: data.price,
          countInStock: data.countInStock,
          qty,
        }
      });
      const { cart: { cartItems } } = getState();
      Cookie.set('cartItems', JSON.stringify(cartItems));
    }
  } catch (error) {
    dispatch({ type: CART_ADD_ITEM_FAIL, payload: error.message });
  }
};

const removeFromCart = productId => (dispatch, getState) => {
  dispatch({ type: CART_REMOVE_ITEM, payload: productId });
  const { cart: { cartItems } } = getState();
  Cookie.set('cartItems', JSON.stringify(cartItems));
};

const saveShipping = (data) => dispatch => {
  dispatch({ type: CART_SAVE_SHIPPING, payload: data })
};

const savePayment = (data) => dispatch => {
  dispatch({ type: CART_SAVE_PAYMENT, payload: data })
};

export { addToCart, removeFromCart, saveShipping, savePayment };