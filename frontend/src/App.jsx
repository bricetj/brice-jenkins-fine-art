/*
 * Brice Jenkins
 * Copyright: 2025
 */

import './App.css'
import Navigation from './components/Navigation';
import { useState, useEffect } from 'react';
import HomePage from './pages/HomePage';
import ShopPage from './pages/ShopPage';
import ShoppingCartPage from './pages/ShoppingCartPage';
import ViewArtworkPage from './pages/ViewArtworkPage';
import LoginPage from './pages/LoginPage';
import CreateAccountPage from './pages/CreateAccountPage';
import UserProfilePage from './pages/UserProfilePage';
import CheckoutPage from './pages/CheckoutPage';
import OrderHistoryPage from './pages/OrderHistoryPage';
import RouteAuthenticator from './components/RouteAuthenticator';
import { MdShoppingCart, MdPerson } from "react-icons/md";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import PopupWindow from './components/PopupWindow';


function App() {
  const [userEmail, setUserEmail] = useState(null)
  const [loggedIn, setLoggedIn] = useState(false);
  const [artworkToView, setArtworkToView] = useState([]);
  const [shoppingCart, setShoppingCart] = useState({});
  const [itemToDelete, setItemToDelete] = useState({});
  const [isVisible, setIsVisible] = useState(false);
  const [popupOpen, setPopupOpen] = useState(false);

  useEffect(() => {
      const checkLogIn = async() => {
        const response = await fetch("http://localhost:3001/auth/login-status", { 
            credentials: "include"
        });
        const data = await response.json();

        if (response.status === 200) {
            setLoggedIn(true);
            setUserEmail(data.email);
        } else {
            setLoggedIn(false);
        }
    }

    checkLogIn();
  }, [])

  // Changes URL for profile icon based on login status.
  const profileUrl = loggedIn ? '/user-profile' : '/login';

  // Handles opening the reset popup window.
  const openPopupHandler = () => {
      setPopupOpen(true);
  }

  // Handles closing the reset popup window.
  const onClose = () => {
      setPopupOpen(false);
  }

  useEffect(() => {
      const getShoppingCart = async() => {
          const response = await fetch("http://localhost:3002/cart/items", {  
              credentials: "include"
          });
          const data = await response.json();
          if (response.status === 200 || response.status === 201) {
              setShoppingCart(data.cart);
          } else {
              console.log("Error getting or creating cart")
          }
          if (data.cart.quantity > 0) {
              setIsVisible(true);
          }
      } 
      
      getShoppingCart();
  }, [])

  const addCartItem = async(item) => {
      const newItem = {item}
      const response = await fetch("http://localhost:3002/cart/items", {
          method: 'POST',  
          credentials: "include",
          headers: {'Content-type': 'application/json'},
          body: JSON.stringify(newItem)
      });

      const data = await response.json();
      if (response.status === 200) {
          setShoppingCart(data.cart);
          console.log(data.cart);
      } else {
          console.log("Error adding item")
      }
      setIsVisible(true);
  }

  const deleteCartItem = async() => {
      if (shoppingCart.quantity == 1) {
         setIsVisible(false);
      }

      const response = await fetch(`http://localhost:3002/cart/items/${itemToDelete._id}`, {
          method: 'DELETE',  
          credentials: "include"
      });

      const data = await response.json();
      if (response.status === 200) {
          setShoppingCart(data.cart);
          console.log(data.cart)
      } else {
          console.log("Error deleting item")
      }

      setPopupOpen(false);
  }

  return (
    <>
      <Router>
        <header className="app-header">
          <div className="placeholder"></div>
          <div className="site-title">BRICE JENKINS FINE ART</div>
          <div className="site-icons">
              <div className="cart-icon">
                  <Link to="/cart"><MdShoppingCart/></Link>
                  {isVisible && <div className="red-circle">{shoppingCart.quantity}</div>}
              </div>
              <div className="profile-icon">
                  <Link to={profileUrl}><MdPerson/></Link>
              </div>
          </div>
        </header>
        <Navigation/>
          <Routes>
            <Route 
              path='/'
              element={
                <HomePage 
                  setArtworkToView={setArtworkToView}
                  addCartItem={addCartItem}
                  shoppingCart={shoppingCart}/>
              }>
            </Route>
            <Route
              path='/login'
              element={
                <LoginPage
                  setLoggedIn={setLoggedIn}>
                </LoginPage>
              }>
            </Route>
            <Route
              path='/register'
              element={
                <CreateAccountPage/>
              }>  
            </Route>
            <Route
              path='/shop'
              element={
                <ShopPage
                  setArtworkToView={setArtworkToView}
                  addCartItem={addCartItem}
                  shoppingCart={shoppingCart}/>
              }>
            </Route>
            <Route
              path='/cart'
              element={
                <ShoppingCartPage
                  shoppingCart={shoppingCart}
                  setShoppingCart={setShoppingCart}
                  setItemToDelete={setItemToDelete}
                  openPopupHandler={openPopupHandler}
                  isVisible={isVisible}/>
              }>
            </Route>
            <Route
              path='/view-artwork'
              element={
                <ViewArtworkPage
                  artworkToView={artworkToView}
                  addCartItem={addCartItem}
                  shoppingCart={shoppingCart}/>
                }> 
            </Route>
            <Route
              path='/user-profile'
              element={
                <RouteAuthenticator
                  component={
                    <UserProfilePage
                      userEmail={userEmail}
                      setLoggedIn={setLoggedIn}>
                    </UserProfilePage>
                  }>
                </RouteAuthenticator>
              }>
            </Route>
            <Route
              path='/checkout'
              element={
                <CheckoutPage
                  userEmail={userEmail}
                  shoppingCart={shoppingCart}
                  setShoppingCart={setShoppingCart}
                  setIsVisible={setIsVisible}
                  loggedIn={loggedIn}/>
              }>
            </Route>
            <Route
              path='/order-history'
              element={
                <RouteAuthenticator
                  component={
                    <OrderHistoryPage>
                
                    </OrderHistoryPage>
                  }>
                </RouteAuthenticator>
              }>
            </Route>
          </Routes>
      </Router>
      <div>
        <PopupWindow text={`Are you sure you want to remove ${itemToDelete.title}?
                            If removed, you will have to browse for the item again
                            to return it to your cart.`}
            isVisible={popupOpen}
            noButtonText={'Cancel'}
            yesButtonText={'Remove'}
            onNo={onClose}
            onYes={deleteCartItem}>
        </PopupWindow>
      </div>
      <footer>
        <p>&copy; 2025 Brice Jenkins</p>
      </footer>
    </>
  )
}

export default App
