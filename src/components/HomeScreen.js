import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { listProducts } from '../actions/productActions';

const HomeScreen = () => {
  const productList = useSelector(state => state.productList);
  const { products, loading, error } = productList;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch,])

  return (
    loading ? <div>Loading...</div> :
    error ? <div>{error}</div> :
    <ul className="products">
      {products.map(product =>
        <li key={product._id}>
          <div className="product">
            <div className='product-image-div'>
              <Link to={`/product/${product._id}`}>
                <img className="product-image" src={product.image} alt={product._id} />
              </Link>
            </div>
            <div className="product-name">
              <Link to={`/product/${product._id}`}>{product.name}</Link>
            </div>
            <div className="product-brand">{product.brand}</div>
            <div className="product-price">${product.price}</div>
            <div className="product-rating">{product.rating} Stars ({product.numReviews} Reviews)</div>
          </div>
        </li>)}
    </ul>
  )
}

export default HomeScreen;