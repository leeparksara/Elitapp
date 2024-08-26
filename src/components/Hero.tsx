import React from 'react'
import heroProduct from '../assets/863749-removebg-preview.png'

import { GoArrowUpRight } from "react-icons/go";

import { MdDiscount } from "react-icons/md";



const Hero:React.FC = () =>{
    return(
        <div className="flex flex-row-reverse justify-center gap-8 ">
            <div className='flex' >  
            <img src={heroProduct}  alt="hero" />
            <MdDiscount  className='absolute  text-5xl text-cta top-36 transform  right-[365px]  ' />
            <div className=' flex flex-col  border-solid border-2 bord-md border-r-gray-200 shadow-lg shadow-navColors-500  px-5 py-4 relative top-[102px] right-6 h-32 w-40 items-center'>
<div className="flex flex-col ">
    <h2 className='text-xl text-stone-500'> Carly chair</h2>
    <h4 className="text-stone-500"> 15% discount</h4>



</div>
<div className="flex flex-row top-4 relative gap-2">
<button className='underline  underline-offset-4 ' type="button" title="Buy now"> Shop now</button>
    <GoArrowUpRight />
  
</div>
          
            </div>
            
            </div>
     
<div className='flex-col mt-32  '>
<h3 className='text-5xl text-buttonHover mb-3'>Elite</h3>
<p className='text-6xl  text-buttonHover mb-5'>Your Home </p>
<p className=' text-xl w-96'>Our furniture are an excellent 
symbol to  upgrade your home.
Shop from us and elite your taste.</p>
  
</div>
     </div>
    )
}
export default Hero;