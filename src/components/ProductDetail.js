import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Rating from '@material-ui/lab/Rating';

import { detailsProducts } from '../actions/productActions';

const ProductDetail = props => {
  const productDetails = useSelector(state => state.productDetails);
  const { product, loading, error } = productDetails;
  // const { product } = productDetails;
  const dispatch = useDispatch();

  const [qty, setQty] = useState(1);

  // couldn't get test to pass when using useParams from react-router-dom
  // const { id } = useParams();
  const id = props.match.params.id;

  useEffect(() => {
    dispatch(detailsProducts(id));
  }, [dispatch, id]);

  const handleAddToCart = () => {
    props.history.push(`/cart/${id}?qty=${qty}`)
  }

  const handleClick = e => {
    props.history.push('/')
  }

  return (
    <>
      <button className='bg-gray-400 hover:bg-gray-500 text-gray-700 font-bold py-2 px-4 rounded-lg ml-4 mb-10 inline-flex items-center text-sm' id='back-to-button' onClick={handleClick}>
        Back to Products
      </button>
      {
        loading ? (
          <div className='text-2xl flex justify-center text-black'>Loading...</div>
        ) : error ? (
          <div className='text-2xl flex h-full w-full text-black'>{error}</div>
        ) : (
        <div className='p-4'>
          <div className='grid grid-cols-4'>
            <img 
              className='product-detail-image col-start-1 col-span-3 mb-5 ml-24 shadow-2xl' 
              src={product.image} 
              alt='product'/>
            <div className='text-black col-start-4 col-span-1 flex flex-col'>
              <div className='my-4 text-gray-800'>
                Price: <span className='text-indigo-600 text-lg font-bold'>${product.price}</span>
              </div>
              <div className='text-gray-800'>
                Status: {product.countInStock > 0 ? 
                  (
                    <span className='bg-green-800 text-white text-sm p-1 font-bold rounded-full'>
                      In Stock
                    </span>
                  ) : 
                  (
                    <span className='bg-red-800 text-white text-sm p-1 font-bold rounded-full'>
                      Out of Stock
                    </span>
                  )}
              </div>
              <div className='my-4 text-gray-800'>
                Qty: {product.countInStock === 0 ? 0 :
                  (<select 
                    value={qty}
                    className='bg-gray-200 rounded-lg ml-2' 
                    onChange={e => setQty(e.target.value)}>
                    {
                      [...Array(product.countInStock).keys()].map(x =>
                        <option key={x} value={x + 1}>{x + 1}</option>
                      )
                    }
                  </select>)}
              </div>
              <div className=''>
                {product.countInStock > 0 &&
                  (<button 
                    onClick={handleAddToCart} 
                    className='bg-blue-800 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded-lg w-48 text-center'
                    id='add-to-cart-button'>
                      Add to Cart
                  </button>)
                }
              </div>
            </div>
          </div>
          <div className='text-black ml-24 mt-4 pr-10 flex flex-col'>
            <div className='ml-1 text-gray-700 font-bold text-2xl' id='product-name'>
              {product.name}
            </div>
            <div className='my-2'>
              <Rating name="disabled" value={product.rating} disabled /> 
            </div>
            <div className='ml-1 text-gray-700 text-sm'>
              Price: <span className='text-indigo-600 text-lg font-bold'>${product.price}</span>
            </div>
            <div className='my-2 ml-1 text-gray-700 font-bold text-sm'>
              Description:
              <div className='my-1 text-gray-800 font-normal text-lg w-2/3'>
                {product.description}
              </div>
            </div>
          </div>
        </div>
      )
      }
    </>
  )
}

export default ProductDetail;