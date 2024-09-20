import React from 'react'
import heroProduct from '../assets/863749-removebg-preview.png'
import {Link} from 'react-router-dom'
import { GoArrowUpRight } from "react-icons/go";

import { RiDiscountPercentFill } from "react-icons/ri";





const Hero:React.FC = () =>{
    return(
        <div className="flex flex-row-reverse justify-center gap-32 ">
            <div className='flex' >  
            <img src={heroProduct}  alt="hero" />
            <RiDiscountPercentFill  className='absolute  text-5xl text-neutral-500 top-32 transform  right-[325px]  ' />
            <div className=' flex flex-col  border-solid border-2 bord-md border-r-gray-200 shadow-lg shadow-navColors-500  px-5 py-4 relative top-[95px] right-9 h-32 w-40 items-center'>
<div className="flex flex-col ">
    <h2 className='text-xl text-neutral-600'> Carly chair</h2>
    <h4 className="text-stone-500"> 15% discount</h4>



</div>
<div className="flex flex-row top-4 relative gap-2">

<Link className='underline  underline-offset-4 ' to="/HeroProductPage">Shop now</Link>
    <GoArrowUpRight />
  
</div>
          
            </div>
            
            </div>
     
<div className='flex-col mt-32  '>
<h3 className='text-5xl text-neutral-600 mb-3'>Elite</h3>
<p className='text-6xl  text-neutral-600 mb-5'>Your Home </p>
<p className=' text-xl w-96 text-neutral-600'>Our furniture are an excellent 
symbol to  upgrade your home.
Shop from us and elite your taste.</p>
  
</div>
     </div>
    )
}
export default Hero;