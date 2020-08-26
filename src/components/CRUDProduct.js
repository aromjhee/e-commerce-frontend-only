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
        <div className='product-header'>
          <button 
            onClick={() => openModal({})}
            className='button primary'>Create Product</button>
        </div>
        {modalVisible && 
          <div className='form'>
            <form onSubmit={submitHandler}>
              <ul className='form-container'>
                <li>
                  <h2>Create Product</h2>
                </li>
                <li>
                  {loadingSave && <div>Loading...</div>}
                  {errorSave && <div>{errorSave}</div>}
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
                  <label htmlFor='price'>Price</label>
                  <input
                    type='number'
                    name='price'
                    id='price'
                    value={price}
                    onChange={e => setPrice(e.target.value)} />
                </li>
                <li>
                  <label htmlFor='image'>Image</label>
                  <input
                    type='text'
                    name='image'
                    id='image'
                    value={image}
                    onChange={e => setImage(e.target.value)} />
                </li>
                <li>
                  <label htmlFor='brand'>Brand</label>
                  <input
                    type='text'
                    name='brand'
                    id='brand'
                    value={brand}
                    onChange={e => setBrand(e.target.value)} />
                </li>
                <li>
                  <label htmlFor='category'>Category</label>
                  <input
                    type='text'
                    name='category'
                    id='category'
                    value={category}
                    onChange={e => setCategory(e.target.value)} />
                </li>
                <li>
                  <label htmlFor='countInStock'>Count-In-Stock</label>
                  <input
                    type='number'
                    name='countInStock'
                    id='countInStock'
                    value={countInStock}
                    onChange={e => setCountInStock(e.target.value)} />
                </li>
                <li>
                  <label htmlFor='description'>Description</label>
                  <textarea
                    name='description'
                    id='description'
                    value={description}
                    onChange={e => setDescription(e.target.value)} />
                </li>
                <li>
                  <button
                    type='submit'
                    className='button primary full-width'>
                      {id ? 'Update' : 'Create'}
                  </button>
                </li>
                <li>
                  <button
                    type='button'
                    className='button secondary'
                    onClick={() => setModalVisible(false)}>Cancel</button>
                </li>
              </ul>
            </form>
          </div>
        }        
        <div className='text-gray-800 rounded border-b border-gray-200 mb-56'>
          <table className='w-screen'>
            <thead className='bg-gray-800 text-white'>
              <tr>
                <th className='text-left py-3 px-4 font-semibold text-sm'>ID</th>
                <th className='text-left py-3 px-4 font-semibold text-sm'>Name</th>
                <th className='text-left py-3 px-4 font-semibold text-sm'>Price</th>
                <th className='text-left py-3 px-4 font-semibold text-sm'>Category</th>
                <th className='text-left py-3 px-4 font-semibold text-sm'>Brand</th>
                <th className='text-left py-3 px-4 font-semibold text-sm'>Action</th>
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
                  {' '}
                  <button 
                    onClick={() => deleteHandler(product)}
                    className='text-white bg-red-500 px-4 py-1 text-sm rounded mx-2 font-semibold'>
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