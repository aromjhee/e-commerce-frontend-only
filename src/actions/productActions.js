// import { PRODUCT_LIST_FAIL, PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, PRODUCT_DETAILS_FAIL, PRODUCT_SAVE_REQUEST, PRODUCT_SAVE_SUCCESS, PRODUCT_SAVE_FAIL, PRODUCT_DELETE_REQUEST, PRODUCT_DELETE_SUCCESS, PRODUCT_DELETE_FAIL } from "../constant/productConstants.js";
import { PRODUCT_LIST_FAIL, PRODUCT_LIST_SUCCESS, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, PRODUCT_DETAILS_FAIL, PRODUCT_SAVE_REQUEST, PRODUCT_SAVE_SUCCESS, PRODUCT_SAVE_FAIL, PRODUCT_DELETE_REQUEST, PRODUCT_DELETE_SUCCESS, PRODUCT_DELETE_FAIL } from "../constant/productConstants.js";

let url;
if (process.env.NODE_ENV === 'development') {
  url = 'http://localhost:8080';
} else {
  url = 'https://e-commerce-5555.herokuapp.com'
}

const listProducts = () => async dispatch => {
  try {
    // dispatch({ type: PRODUCT_LIST_REQUEST});
    const res = await fetch(`${url}/api/products`);
    if (res.ok) {
      const data = await res.json();
      dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data })
    }
  } catch (error) {
    dispatch({ type: PRODUCT_LIST_FAIL, payload: error.message })
  }
}

const saveProduct = product => async (dispatch, getState) => {
  try {
    dispatch({ type: PRODUCT_SAVE_REQUEST, payload: product });
    const { userLogin: { userInfo } } = getState();

    let res;

    if (!product._id) {
      res = await fetch(`${url}/api/products`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${userInfo.token}`
        },
        body: JSON.stringify(product)
      });
      if (res.ok) {
        const data = await res.json();
        dispatch({ type: PRODUCT_SAVE_SUCCESS, payload: data });
      }
    } else {
      res = await fetch(`${url}/api/products/${product._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${userInfo.token}`
        },
        body: JSON.stringify(product)
      });
      
      if (res.ok) {
        const data = await res.json();
        dispatch({ type: PRODUCT_SAVE_SUCCESS, payload: data });
      }
    }
  } catch(e) {
    dispatch({ type: PRODUCT_SAVE_FAIL, payload: e.message });
  }
}

const detailsProducts = (productId) => async dispatch => {
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST, payload: productId });
    const res = await fetch(`${url}/api/products/${productId}`);
    if (res.ok) {
      const data = await res.json();
      dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data })
    }
  } catch (error) {
    dispatch({ type: PRODUCT_DETAILS_FAIL, payload: error.message })
  }
}

const deleteProduct = (productId) => async (dispatch, getState) => {
  try {
    const { userLogin: { userInfo } } = getState();

    dispatch({ type: PRODUCT_DELETE_REQUEST, payload: productId });
    const res = await fetch(`${url}/api/products/${productId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${userInfo.token}`
      },
    });
    if (res.ok) {
      const data = await res.json();
      dispatch({ type: PRODUCT_DELETE_SUCCESS, payload: data, success: true })
    }
  } catch (error) {
    dispatch({ type: PRODUCT_DELETE_FAIL, payload: error.message })
  }
}

export { listProducts, detailsProducts, saveProduct, deleteProduct };