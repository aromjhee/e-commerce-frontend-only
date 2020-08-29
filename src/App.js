import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import 'font-awesome/css/font-awesome.min.css';

import NavBar from './components/NavBar';
import Footer from './components/Footer';
import Products from './components/Products';
import ProductDetail from './components/ProductDetail';
import Cart from './components/Cart';
import LoginScreen from './components/LogInScreen';
import RegisterScreen from './components/RegisterScreen';
import CRUDProduct from './components/CRUDProduct';
import ShippingAddress from './components/ShippingAddress';
import Payment from './components/Payment';
import OrderPlacement from './components/OrderPlacement';
import UserProfile from './components/UserProfile';

const App = () => {
  return (
    <BrowserRouter>
      <div className="grid gap-4 app-bg-color app-font-color text-lg">
        <NavBar />
        <div className="row-start-2 row-span-1 h-screen">
          <Route exact path='/' component={Products}></Route>
          <Route path='/products' component={CRUDProduct}></Route>
          <Route path="/profile" component={UserProfile} />
          <Route path='/shipping' component={ShippingAddress}></Route>
          <Route path='/payment' component={Payment}></Route>
          <Route path='/place-order' component={OrderPlacement}></Route>
          <Route path="/log-in" component={LoginScreen} />
          {/* <Route 
            path="/register"
            render={
              props => <RegisterScreen {...props} setStateUserInfo={setStateUserInfo} />
            } 
          /> */}
          <Route path='/register' component={RegisterScreen}></Route>
          <Route path='/cart/:id?' component={Cart}></Route>
          <Route path='/product/:id' component={ProductDetail}></Route>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App;