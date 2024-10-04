import React, {useState, useEffect} from 'react'
import Cart from './Cart'
import { IoIosArrowDown } from "react-icons/io";
//import Button from '../components/Button'
import { CiSearch } from "react-icons/ci";
import { Link,  useLocation } from 'react-router-dom';
import { Product } from '../types';
import contentfulClient from '../contentfullClient';

interface HeaderProps {
  cartValue: number;
  products: Product [];
}

interface InspoProduct {
  name: string;
  slug: string;
  description: string;
  image?: string;  
  
  categories: string[];
}


const Header:React.FC<HeaderProps> =({cartValue, products})=>{

 const location = useLocation();
const [isDropDownOpen, setIsDropDownOpen] = useState(false);
const [inspo, setInspo] = useState<InspoProduct[]>([]);

const toggleDropdown = () => {
  setIsDropDownOpen(prev => !prev);
};




 useEffect(()=>{
setIsDropDownOpen(false)
 }, [location.pathname]);

useEffect(()=>{
  contentfulClient.getEntries({
    content_type : 'furnitureStore'
  })
  .then((response)=>{
    const inspoData : InspoProduct[] = response.items.map((item:any)=>({
      name: item.fields.product,
      slug: item.fields.slug,
      description: item.fields.description,
      image: item.fields.productImage?.fields?.file?.url || '',
    
      categories: item.fields.categories || [],
    }))
    const inspoSection = inspoData.filter( product => 
      product.categories.includes('insposection')
    )
    setInspo(inspoSection);
  })
  .catch(console.error)
})

    return(
        <>
 
  <header className='flex items-center justify-between p-4'>
<div className='flex items-center gap-28'>
<h3 className='mx-20 '>EL</h3>
    <div className='relative flex items-center'>
    <input typeof='text' placeholder='Search'    className="px-10 py-1.5 border rounded-md border-gray-300" />
    <CiSearch className='absolute right-3 text-gray-500'   />
    </div>
</div>
  
<div className='flex items-center gap-28 justify-center '>

 <nav className="flex space-x-4 gap-6">
          <Link to="/" className="text-navColors hover:text-gray-900">Home</Link>
          <Link to="/about" className="text-navColors hover:text-gray-900">About</Link>
          <Link to="/contact" className="text-navColors hover:text-gray-900">Contact</Link>

        </nav>
        <div className='dropdown-container'>
<button onClick={toggleDropdown} title="d" className='dropdown-button'>Catalog <IoIosArrowDown />
</button>
{isDropDownOpen && (
  <div className='dropdown-menu '>
    <div className='mt-5 ml-5'>
      <div >
      <Link to='/chairs'>Chair</Link>
<Link to='/sofas'>Sofa</Link>
<Link to='/table'>Table</Link>
      </div>
  <div className='deals'>
    <Link to='/deals' >Deals</Link>
  </div>
    </div>

<div className='mt-5'>
  <h1 className='font-semibold text-lg mb-3 '>Inspiration</h1>


  <div>
    {inspo.map((product) => (
      <div key={product.slug}>
        <img src={product.image} alt={product.name} className='h-[280px] w-[350px] mr-8 ' />
    
      </div>
    ))}
 
</div>
<div className='flex items-center  -ml-[9px] mt-1 ' >
<Link to='/InspoSection'  > Find inspo </Link>
<span>→</span>

</div>

</div>

  </div>
)}
        </div>
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