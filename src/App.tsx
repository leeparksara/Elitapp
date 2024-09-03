import React, {useState} from 'react';
import Home from './pages/Home'
import About from './pages/About'
import Best from './pages/Best'
import Layout from './components/Layout'
import './App.css';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
function App() {
const [cartValue, setCartValue] = useState(0);
 const addToCart = ()=>{
  setCartValue (cartValue + 1)
 }
  return (
    <Router>
    <div className="min-h-screen bg-customBackground">
      <Routes>
      <Route path='/' element={<Layout cartValue={cartValue}/>}>
      <Route index element={<Home addToCart={addToCart} />}/>

  <Route path="/about" element={<About/>}/>
  <Route path="/best" element={<Best addToCart={addToCart}/>}/>
      </Route>
       
        
      </Routes>
   
   
    </div>
    </Router>
  );
}

export default App;
