import './App.css'
import Navigation from './components/Navigation';
import { useState } from 'react';
import HomePage from './pages/HomePage';
import ShopPage from './pages/ShopPage';
import ShoppingCartPage from './pages/ShoppingCartPage';
import ViewArtworkPage from './pages/ViewArtworkPage';
import { MdShoppingCart } from "react-icons/md";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


function App() {
  const [artworkToView, setArtworkToView] = useState([]);

  return (
    <>
      <header className="app-header">
        <div className="placeholder"></div>
        <div className="site-title">BRICE JENKINS FINE ART</div>
        <div className="cart-icon">
            <a href="/cart"><MdShoppingCart/></a>
            <div className="red-circle">1</div>
        </div>
      </header>
      <Router>
        <Navigation/>
          <Routes>
            <Route path='/' element={<HomePage setArtworkToView={setArtworkToView} />}></Route>
            <Route path='/shop' element={<ShopPage setArtworkToView={setArtworkToView} />}></Route>
            <Route path='/cart' element={<ShoppingCartPage />}></Route>
            <Route path='/view-artwork' element={<ViewArtworkPage artworkToView={artworkToView}/>}></Route>
          </Routes>
      </Router>
      <footer>
        <p>&copy; 2025 Brice Jenkins</p>
      </footer>
    </>
  )
}

export default App
