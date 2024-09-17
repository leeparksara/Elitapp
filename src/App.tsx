import React, { useState, useEffect } from 'react';
import Home from './pages/Home';
import About from './pages/About';
import Best from './pages/Best';
import Layout from './components/Layout';
import CartPage from './pages/CartPage';
import Chairs from './pages/Chairs'
import Sofas from './pages/Sofas'
import Table from './pages/Table'
import { Product } from './types';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  // Retrieve cart value from localStorage or initialize to 0
  const [cartValue, setCartValue] = useState<number>(() => {
    const storedValue = localStorage.getItem('cartValue');
    return storedValue ? JSON.parse(storedValue) : 0;
  });

  // Retrieve cart items from localStorage or initialize to an empty array
  const [cartItems, setCartItems] = useState<Product[]>(() => {
    const storedItems = localStorage.getItem('cartItems');
    return storedItems ? JSON.parse(storedItems) : [];
  });

  // Store cartValue in localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cartValue', JSON.stringify(cartValue));
  }, [cartValue]);

  // Store cartItems in localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product: Product) => {
    setCartValue(cartValue => cartValue + 1);
    setCartItems(cartItems => [...cartItems, product]);
  };

  const removeFromCart = (slug:string) =>{
    const updatedCartItems = cartItems.filter((item) => item.slug !== slug);
    setCartItems(updatedCartItems);
    setCartValue(updatedCartItems.length);
  }
  return (
    <Router>
      <div className="min-h-screen bg-customBackground">
        <Routes>
          <Route path="/" element={<Layout products={cartItems} cartValue={cartValue} />}>
            <Route index element={<Home addToCart={addToCart} />} />
            <Route path="/about" element={<About />} />
            <Route path="/best" element={<Best addToCart={addToCart} />} />
            <Route path="/cartpage" element={<CartPage cartItems={cartItems} removeFromCart={removeFromCart} />} />
<Route path='/chairs' element={<Chairs addToCart={addToCart} />}/>
<Route path='/sofas' element={<Sofas addToCart={addToCart}/>}/>
<Route path='/table' element={<Table addToCart={addToCart}/>}/>

          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
