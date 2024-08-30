import React from 'react';
import lamp from '../assets/large-lotus-hanging-lamp-removebg-preview.png'
import { FaInstagram } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { GrFacebookOption } from "react-icons/gr";



const Footer:React.FC = ()=>{
    return(
        <div>
 <div className='h-[250px] w-full bg-neutral-300 text-zinc-800 grid grid-flow-col grid-cols-subgrid gap-72 justify-center  mt-8 '>
<div className='flex flex-col justify-center items-center '>
    <img src={lamp} alt='lamp' className='size-[150px]' />
<h3 className='mx-20 text-lg text-neutral-600'>EL</h3>
<p> modern-elite-interiors</p>
</div>
<div>
    <>
<h2 className='font-semibold mb-2 text-neutral-800 mt-8 '>Subscribe to our newsletter</h2>
<p className='w-72 text-balance mb-6 text-neutral-600'>
Be the first to receive information about new products, promotions and great offers</p>
<div className='flex gap-3'>
<input type='email' title='subscribe field' placeholder='YOUR E-MAIL' className='rounded-sm text-center' />
<input type='submit' title='subscribe button' className='bg-neutral-800 text-neutral-300 p-2  w-24 cursor-pointer rounded-sm' />
</div>
   
    </>
</div>


<div className='flex flex-col justify-start items-center mt-8' >
    <h2 className='w-20 mb-5'>Follow us</h2>
    <div className='flex gap-3'>
    <FaInstagram className='size-7 text-neutral-700 cursor-pointer' />
    <FaTwitter className='size-7 text-neutral-700 cursor-pointer' />
    <GrFacebookOption className='size-7 text-neutral-700 cursor-pointer'  />

    </div>
</div>

        </div>

<div className='w-full bg-neutral-400 flex justify-around h-10 items-center'>
    <p> @ copyright 2024 Elite All Rights Reserved</p>
    <p>General Policy</p>
    <p>Terms & Conditions</p>
</div>
        </div>
       
    )
}
export default Footer;