import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { detailsProducts } from '../actions/productActions';

const ProductScreen = props => {
  const [qty, setQty] = useState(1);

  const productDetails = useSelector(state => state.productDetails);
  const { product, loading, error } = productDetails;
  const dispatch = useDispatch();
  // couldn't get test to pass
  // when using useParams from react-router-dom
  // const { id } = useParams();
  const id = props.match.params.id;

  useEffect(() => {
    dispatch(detailsProducts(id));
  }, [dispatch, id]);

  const handleAddToCart = () => {
    props.history.push(`/cart/${id}?qty=${qty}`)
  }

  return (
    <>
      <div className='back-to-result'>
        <Link to ='/'>Back to result</Link>
      </div>
      {loading ? <div>Loading...</div> :
      error ? <div>{error}</div> :
      (
        <div className='details'>
          <div className='details-image'>
            <img src={product.image} alt='product'/>
          </div>
          <div className='details-info'>
            <ul>
              <li>
                <h4>{product.name}</h4>
              </li>
              <li>
                {product.rating} Stars ({product.numReviews} Reviews) 
              </li>
              <li>
                Price: <b>${product.price}</b>
              </li>
              <li>
                Description:
                <div>
                  {product.description}
                </div>
              </li>
            </ul>
          </div>
          <div className='details-action'>
            <ul>
              <li>
                Price: ${product.price}
              </li>
              <li>
                Status: {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
              </li>
              <li>
                Qty: 
                <select value={qty} onChange={e => setQty(e.target.value)}>
                  {
                    [...Array(product.countInStock).keys()].map(x => 
                      <option key={x} value={x+1}>{x+1}</option>
                    )
                  }
                </select>
              </li>
              <li>
                {product.countInStock > 0 &&
                  (<button onClick={handleAddToCart} className='button primary'>Add to Cart</button>)
                }
              </li>
            </ul>
          </div>
        </div>
      )}
    </>
  )
}

export default ProductScreen;