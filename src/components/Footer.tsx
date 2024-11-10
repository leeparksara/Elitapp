import React from 'react';
import lamp from '../assets/large-lotus-hanging-lamp-removebg-preview.png'
import { FaInstagram } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { GrFacebookOption } from "react-icons/gr";



const Footer:React.FC = ()=>{
    return(
        <div className='w-full  h-full  '>
 <div className='sm:h-[250px] w-full bg-neutral-100 text-zinc-800 sm:grid sm:grid-flow-col  sm:gap-72 sm:items-center    mt-8 grid justify-center items-center'>
<div className='sm:flex sm:flex-col justify-center items-center'>
    <img src={lamp} alt='lamp' className='size-[150px]' />
<h3 className=' text-lg text-neutral-600 mt-6'>EL</h3>
<p> modern-elite-interiors</p>
</div>
<div>
 
<h2 className='font-semibold mb-2 text-neutral-800 mt-8 '>Subscribe to our newsletter</h2>
<p className='w-72 text-balance mb-6 text-neutral-600'>
Be the first to receive information about new products, promotions and great offers</p>
<div className='flex gap-3'>
<input type='email' title='subscribe field' placeholder='YOUR E-MAIL' className='rounded-sm text-center' />
<input type='submit' title='subscribe button' className='bg-neutral-800 text-neutral-300 p-2  w-24 cursor-pointer rounded-sm' />
</div>
   

</div>


<div className='sm:flex flex-col justify-start items-center mt-10 mb-14' >
    <h2 className='w-20 mb-5'>Follow us</h2>
    <div className='flex gap-3'>
    <FaInstagram className='size-7 text-neutral-700 cursor-pointer' />
    <FaTwitter className='size-7 text-neutral-700 cursor-pointer' />
    <GrFacebookOption className='size-7 text-neutral-700 cursor-pointer'  />

    </div>
</div>

        </div>

<div className='w-full bg-neutral-300 sm:flex sm:flex-row sm:justify-around sm:h-10  sm:items-center h-28 flex flex-col-reverse justify-center items-center gap-2 '>
    <p> @ copyright 2024 Elite All Rights Reserved</p>
    <p>General Policy</p>
    <p>Terms & Conditions</p>
</div>
        </div>
       
    )
}
export default Footer;