import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { listProducts } from '../actions/productActions';

const Products = () => {
  const productList = useSelector(state => state.productList);
  const { products, loading, error } = productList;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch])

  return (
    loading ? (
      <div className='text-2xl flex justify-center items-center h-full w-full text-black'>
        Loading...
      </div>
    ) :
    error ? (
      <div className='text-2xl flex h-full w-full text-black'>
        {error}
      </div>
    ) : (
      <div className='grid grid-cols-3 grid-rows-1 gap-8 flex flex-wrap px-10'>
        {products.map(product => (
          <div key={product._id} className='flex flex-col text-black col-span-1 row-span-1'>
            <Link to={`/product/${product._id}`}>
              <img className='product-image' src={product.image} alt={product._id} />
            </Link>
            <div className='link-hover-color font-medium'>
              <Link to={`/product/${product._id}`}>{product.name}</Link>
            </div>
            <div className='text-base text-gray-600 font-thin'>{product.brand}</div>
            <div className='product-price'>${product.price}</div>
            <div className='product-rating'>{product.rating} Stars ({product.numReviews} Reviews)</div>
          </div>
        ))}
      </div>
    )
  )
  // return (
  //   loading ? <div>Loading...</div> :
  //   error ? <div>{error}</div> :
  //   (
  //     <div className='col-span-1 row-span-1'>
  //       <ul className="products">
  //         {products.map(product => (
  //             <li key={product._id}>
  //               <div className="product">
  //                 <div className='product-image-div'>
  //                   <Link to={`/product/${product._id}`}>
  //                     <img className="product-image" src={product.image} alt={product._id} />
  //                   </Link>
  //                 </div>
  //                 <div className="product-name">
  //                   <Link to={`/product/${product._id}`}>{product.name}</Link>
  //                 </div>
  //                 <div className="product-brand">{product.brand}</div>
  //                 <div className="product-price">${product.price}</div>
  //                 <div className="product-rating">{product.rating} Stars ({product.numReviews} Reviews)</div>
  //               </div>
  //             </li>
  //         ))}
  //       </ul>
  //     </div>
  //   )
  // )
}

export default Products;