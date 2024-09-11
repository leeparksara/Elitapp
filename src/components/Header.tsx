
import React, {useState} from 'react'
import Cart from './Cart'
//import Button from '../components/Button'
import { CiSearch } from "react-icons/ci";

import { Link, useNavigate } from 'react-router-dom';
interface Product {
  name: string;
  slug: string;
  price: number;
  image: string;
  categories: string[];
}

interface HeaderProps {
  cartValue: number;
  products: Product [];
}


const Header:React.FC<HeaderProps> =({cartValue, products})=>{

 const [ searchTerm, setSearchTerm] = useState<string>('');
 const [filterProducts, setFilterProducts] = useState<Product[]>([]);
 const navigate = useNavigate();

 const handleSearch = (e:React.ChangeEvent<HTMLInputElement>) =>{
  const term = e.target.value.toLowerCase();
  setSearchTerm(term);


  if (term !== '') {
    const filtered = products.filter(Product =>
    Product.name.toLowerCase().includes(term)
    );
    setFilterProducts(filtered)
  } else {
    setFilterProducts([]);
  }
 }
 const handleSearchSubmit = ()=> {
  if(filterProducts.length > 0){
    navigate('/search-results', {state: {result : filterProducts}})
  }
 }

    return(
        <>
    
  <header className='flex items-center justify-between p-4'>
<div className='flex items-center gap-28'>
<h3 className='mx-20 '>EL</h3>
    <div className='relative flex items-center'>
    <input typeof='text' placeholder='Search'  value={searchTerm} onChange={handleSearch}  className="px-10 py-1.5 border rounded-md border-gray-300" />
    <CiSearch className='absolute right-3 text-gray-500' onClick={handleSearchSubmit}  />
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