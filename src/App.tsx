import React from 'react';
import Home from './pages/Home'
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
function App() {
  return (
    <Router>
    <div className="min-h-screen bg-customBackground">
      
   
     
      <Routes>
        <Route path="/" element={<Home/>}/>
        
      </Routes>
   
   
    </div>
    </Router>
  );
}

export default App;
