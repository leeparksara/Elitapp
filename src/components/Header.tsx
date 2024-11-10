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
const [ismobileMenuopen, setIsMobileMenuOpen] = useState(false);

const toggleDropdown = () => {
  setIsDropDownOpen(prev => !prev);
};

const toggleMobileMenu = ()=>{
  setIsMobileMenuOpen (prev => !prev);
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
      product.categories.includes('Inspiration')
    )
    setInspo(inspoSection);
  })
  .catch(console.error)
})

    return(
        <>
 
  <header className='sm:flex sm:items-center sm:justify-between sm:p-4 flex justify-center items-center'>
<div className='flex items-center gap-4 lg:gap-28 w-full'>

  <Link className='tex-lg font-bold mx-4 my-4 ' to='/'>
  EL
  </Link>

    
</div>
  
<div className=' flex items-center gap-28 justify-center '>

 <nav className="  hidden sm:flex space-x-4 gap-6 ">
          <Link to="/" className="text-navColors hover:text-gray-900">Home</Link>
          <Link to="/about" className="text-navColors hover:text-gray-900">About</Link>
          <Link to="/contact" className="text-navColors hover:text-gray-900">Contact</Link>
        </nav>


        {/* small screen view */}
        <div className='dropdown-container  hidden sm:flex '>
<button onClick={toggleDropdown} title="d" className='dropdown-button ml-[150px] '>Catalog <IoIosArrowDown />
</button>
{isDropDownOpen && (
  <div className=' dropdown-menu  '>
    <div className='mt-2 flex flex-col '>
      <div  >
      <Link to='/chairs'>Chair</Link>
<Link to='/sofas'>Sofa</Link>
<Link to='/table'>Table</Link>
      </div>
  <div className='deals'>
    <Link to='/deals' >Deals</Link>
  </div>
    </div>

<div className='mt-4'>
  <h1 className='font-semibold text-lg mb-3 '>Inspiration</h1>


  <div>
    {inspo.map((product) => (
      <div key={product.slug}>
        <img src={product.image} alt={product.name} className=' h-[200px] w-full mr-0 sm:h-[300px]  sm:w-full sm:mr-24 ' />
    
      </div>
    ))}
 
</div>
<div className='flex items-center  -ml-[9px] mt-1 ' >
<Link to='/InspoSection'> Find inspo </Link>
<span>→</span>

</div>

</div>

  </div>
)}
        </div>
       
        <div className=' flex items-center sm:flex sm:items-center sm:gap-2 '>
          <Cart cartValue={cartValue} />
          <button onClick={toggleMobileMenu} className='text-3xl sm:hidden text-zinc-600 mr-3'> ☰</button>

        </div>


</div>
  </header>
  <div className=' sm:w-[400px] sm:mt-[-40px] sm:ml-[100px] w-full flex justify-center my-8 items-center ' >
        <div className='relative w-full px-4'>
          <input
            type='text'
            placeholder='Search'
            className='px-4 py-2 border rounded-md border-gray-300 w-full'
          />
          <CiSearch className='absolute right-5 top-3 text-gray-500' />
        </div>
      </div>
  {/*burger menu display when its clicked */}

  {ismobileMenuopen && (
    <div className='sm:hidden bg-white shadow-md p-4'>
      <nav className='flex flex-col space-y-2'>
        <Link to='/' className="text-navColors hover:text-gray-900">
        Home</Link>
        <Link to="/about" className="text-navColors hover:text-gray-900">
              About
            </Link>
            <Link to="/contact" className="text-navColors hover:text-gray-900">
              Contact
            </Link>

            <button onClick={toggleDropdown} className='flex items-center space-x-1 mt-4'> <span>Catalog</span> <IoIosArrowDown/></button>
            {isDropDownOpen && (
              <div className='m-0 bg-zinc-100 p-4'>
 <div className='dropdown-container  visible flex '>

{isDropDownOpen && (
  <div className=' flex  justify-center  gap-20 '>
    <div className='mt-2 flex flex-col '>
      <div className='flex flex-col gap-4' >
      <Link to='/chairs'>Chair</Link>
<Link to='/sofas'>Sofa</Link>
<Link to='/table'>Table</Link>
      </div>
  <div className='deals mt-3'>
    <Link to='/deals' >Deals</Link>
  </div>
    </div>

<div className='mt-4'>
  <h1 className='font-semibold text-lg mb-3 '>Inspiration</h1>


  <div>
    {inspo.map((product) => (
      <div key={product.slug}>
        <img src={product.image} alt={product.name} className=' h-[250px] w-full mr-0 sm:h-[300px]  sm:w-full sm:mr-24  ' />
    
      </div>
    ))}
 
</div>
<div className='flex items-center   mt-1 ' >
<Link to='/InspoSection'> Find inspo </Link>
<span>→</span>

</div>

</div>

  </div>
)}
        </div>
       
              </div>
              
            )}
      </nav>

    </div>
  )}

       
        </>
    )
}
export default Header;