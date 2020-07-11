import React from 'react';
import './App.css';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import 'font-awesome/css/font-awesome.min.css';

import HomeScreen from './components/HomeScreen';
import ProductScreen from './components/ProductScreen';
import CartScreen from './components/CartScreen';
import LoginScreen from './components/LogInScreen';
import RegisterScreen from './components/RegisterScreen';
import NewProductScreen from './components/NewProductScreen';
import ShippingScreen from './components/ShippingScreen';
import PaymentScreen from './components/PaymentScreen';
import PlaceOrderScreen from './components/PlaceOrderScreen';
import ProfileScreen from './components/ProfileScreen';

const App = () => {
  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  const openMenu = () => {
    document.querySelector(".sidebar").classList.add("open")
  }

  const closeMenu = () => {
    document.querySelector(".sidebar").classList.remove("open")
  }

  return (
    <BrowserRouter>
      <div className="grid-container">
        <header className="header">
          <div className="brand">
            <button onClick={openMenu}>
              &#9776;
            </button>
            <Link to='/'>imma-Zone</Link>
          </div>
          <div className="header-links">
            {
              userInfo && userInfo.isAdmin ?
              <Link to='/products'>Create</Link> :
              null
            }
            <Link to='/cart/:id?'>Cart</Link>
            {
              userInfo ? 
              <Link to='/profile'>{userInfo.name}</Link> :
              <Link to='/log-in'>Log In</Link>
            }
          </div>
        </header>
        <aside className="sidebar">
          <h3>Shopping Categories</h3>
          <button className="sidebar-close-button" onClick={closeMenu}>X</button>
          <ul>
            <li>
              <a href="index.html">Shoes</a>
            </li>
            <li>
              <a href="index.html">More Shoes</a>
            </li>
          </ul>
        </aside>
        <main className="main">
          <div className="content">
            <Route exact path='/' component={HomeScreen}></Route>
            <Route path='/products' component={NewProductScreen}></Route>
            <Route path="/profile" component={ProfileScreen} />
            <Route path='/shipping' component={ShippingScreen}></Route>
            <Route path='/payment' component={PaymentScreen}></Route>
            <Route path='/place-order' component={PlaceOrderScreen}></Route>
            <Route path="/log-in" component={LoginScreen} />
            {/* <Route 
              path="/register"
              render={
                props => <RegisterScreen {...props} setStateUserInfo={setStateUserInfo} />
              } 
            /> */}
            <Route path='/register' component={RegisterScreen}></Route>
            <Route path='/cart/:id?' component={CartScreen}></Route>
            <Route path='/product/:id' component={ProductScreen}></Route>
          </div>
        </main>
        <footer className="footer">
          <span>
            <a href='https://github.com/aromjhee'>Github<i className="fa fa-github fa-2x" aria-hidden="true"></i></a>
          </span>
        </footer>
      </div>
    </BrowserRouter>
  )
}

export default App;