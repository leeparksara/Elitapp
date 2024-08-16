import React from 'react';
import Home from './pages/Home'
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
function App() {
  return (
    <div className="min-h-screen bg-customBackground">
      
    <Router>
      <Routes>
        <Route path="/" element={<Home/>}/>
        
      </Routes>
    </Router>
   
  
     
    </div>
  );
}

export default App;
