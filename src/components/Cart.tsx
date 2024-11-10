import React from 'react';
import { BsCart3 } from "react-icons/bs";
import {Link} from 'react-router-dom'


interface cartProps {
    cartValue: number;
}


const Cart: React.FC<cartProps>=({cartValue}) =>{

     return(
        <div className='  sm:mr-[45px] flex  '>
                 <Link to='/cartpage'>
               
        <BsCart3 className=' cursor-pointer  size-6 text-neutral-600 ml-[-50px]' />
        {cartValue> 0 && (
<span className='absolute  sm:absolute right-10 sm:right-16 -top-[-2px] w-6 rounded-full flex justify-center items-center  bg-neutral-200'>
{cartValue}
</span>
        )}
     
          </Link> 
        </div>
     )

}
export default Cart;