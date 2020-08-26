import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import 'font-awesome/css/font-awesome.min.css';

import NavBar from './components/NavBar';
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
  return (
    <BrowserRouter>
      <div className="grid grid-cols-3 grid-rows-6 app-bg-color app-font-color text-lg">
        <NavBar />
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