import React from 'react'
import Cart from './Cart'
//import Button from '../components/Button'
import { CiSearch } from "react-icons/ci";


import { Link } from 'react-router-dom';
interface HeaderProps {
  cartValue: number;
}

const Header:React.FC<HeaderProps> =({cartValue})=>{


    return(
        <>
    
  <header className='flex items-center justify-between p-4'>
<div className='flex items-center gap-28'>
<h3 className='mx-20 '>EL</h3>
    <div className='relative flex items-center'>
    <input typeof='text' placeholder='Search'   className="px-10 py-1.5 border rounded-md border-gray-300" />
    <CiSearch className='absolute right-3 text-gray-500'  />
    </div>
</div>
  
<div className='flex items-center gap-28'>

 <nav className="flex space-x-4 gap-6">
          <Link to="/" className="text-navColors hover:text-gray-900">Home</Link>
          <Link to="/about" className="text-navColors hover:text-gray-900">About</Link>
          <Link to="/contact" className="text-navColors hover:text-gray-900">Contact</Link>
          <Link to="/catalog" className="text-navColors hover:text-gray-900">Catalog</Link>
        </nav>
        <div>
          <div className=''>
          <Cart cartValue={cartValue} />
          </div>
      
        </div>


</div>
  </header>
  
       
        </>
    )
}
export default Header;