import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { saveProduct, listProducts, deleteProduct } from '../actions/productActions';

const CRUDProduct = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [countInStock, setCountInStock] = useState('');
  const [description, setDescription] = useState('');

  const productList = useSelector(state => state.productList);
  const { products } = productList;

  const productSave = useSelector(state => state.productSave);
  const { loading: loadingSave, success: successSave, error: errorSave } = productSave;

  const productDelete = useSelector(state => state.productDelete);
  const { success: successDelete } = productDelete;

  const dispatch = useDispatch();

  useEffect(() => {
    if (successSave) {
      setModalVisible(false);
    }
    dispatch(listProducts());
  }, [dispatch, successSave, successDelete]);

  const openModal = product => {
    setModalVisible(true);
    setId(product._id);
    setName(product.name);
    setPrice(product.price);
    setImage(product.image);
    setBrand(product.brand);
    setCategory(product.category);
    setCountInStock(product.countInStock);
    setDescription(product.description);
  }

  const submitHandler = e => {
    e.preventDefault();
    dispatch(saveProduct({
      _id: id,
      name, price, image, brand, category, 
      countInStock, description
    }));
  }

  const deleteHandler = product => {
    dispatch(deleteProduct(product._id));
  }

  return (
    <>
      <div className='text-gray-800 m-1'>
        <div className=''>
          <button 
            onClick={() => openModal({})}
            className='text-white bg-red-500 p-2 text-lg rounded-lg mb-4 font-semibold'>
              Create New Product
          </button>
        </div>
        {modalVisible && 
          <form onSubmit={submitHandler} className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'>
            <div className='flex items-center'>
              {loadingSave && <div>Loading...</div>}
              {errorSave && <div>{errorSave}</div>}
            </div>
            <div className='mb-4'>
              <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='name'>Name</label>
              <input 
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                type="text" 
                name='name' 
                id='name' 
                value={name} 
                onChange={e => setName(e.target.value)}></input>
            </div>
            <div className='mb-4'>
              <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='price'>Price</label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type='number'
                name='price'
                id='price'
                value={price}
                onChange={e => setPrice(e.target.value)} />
            </div>
            <div className='mb-4'>
              <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='image'>Image</label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type='text'
                name='image'
                id='image'
                value={image}
                onChange={e => setImage(e.target.value)} />
            </div>
            <div className='mb-4'>
              <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='brand'>Brand</label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type='text'
                name='brand'
                id='brand'
                value={brand}
                onChange={e => setBrand(e.target.value)} />
            </div>
            <div className='mb-4'>
              <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='category'>Category</label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type='text'
                name='category'
                id='category'
                value={category}
                onChange={e => setCategory(e.target.value)} />
            </div>
            <div className='mb-4'>
              <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='countInStock'>Count-In-Stock</label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type='number'
                name='countInStock'
                id='countInStock'
                value={countInStock}
                onChange={e => setCountInStock(e.target.value)} />
            </div>
            <div className='mb-4'>
              <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='description'>Description</label>
              <textarea
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                name='description'
                id='description'
                value={description}
                onChange={e => setDescription(e.target.value)} />
            </div>
            <div className='flex'>
              <button
                type='submit'
                className='text-white bg-orange-500 p-4 py-1 text-sm rounded mr-2 font-semibold'>
                  {id ? 'Update' : 'Create'}
              </button>
              <button
                type='button'
                className='text-white bg-red-500 px-4 py-1 text-sm rounded mx-2 font-semibold'
                onClick={() => setModalVisible(false)}>Cancel</button>
            </div>
          </form>
        }        
        <div className='text-gray-800 rounded border-b border-gray-200'>
          <table className='w-screen'>
            <thead className='bg-gray-800 text-white'>
              <tr>
                <th className='text-left py-3 px-4 font-semibold text-sm'>ID</th>
                <th className='text-left py-3 px-4 font-semibold text-sm'>Name</th>
                <th className='text-left py-3 px-4 font-semibold text-sm'>Price</th>
                <th className='text-left py-3 px-4 font-semibold text-sm'>Category</th>
                <th className='text-left py-3 px-4 font-semibold text-sm'>Brand</th>
                <th className='text-left py-3 px-4 font-semibold text-sm text-red-200'>NOTE: Delete button disabled</th>
              </tr>
            </thead>
            <tbody className='text-gray-700'>
              {products.map(product => (
              <tr key={product._id}>
                <td className='text-left py-3 px-4'>{product._id}</td>
                <td className='text-left py-3 px-4'>{product.name}</td>
                <td className='text-left py-3 px-4'>{product.price}</td>
                <td className='text-left py-3 px-4'>{product.category}</td>
                <td className='text-left py-3 px-4'>{product.brand}</td>
                <td className='text-left py-3 px-4'>
                  <button 
                    onClick={() => openModal(product)}
                    className='text-white bg-orange-500 p-4 py-1 text-sm rounded mr-2 font-semibold'>
                      Edit
                  </button>
                  <button 
                    onClick={() => deleteHandler(product)}
                    className='text-white bg-red-500 px-4 py-1 text-sm rounded mx-2 font-semibold cursor-not-allowed'>
                      Delete
                  </button>
                </td>
              </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

export default CRUDProduct;