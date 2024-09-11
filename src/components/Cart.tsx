import React from 'react';
import { BsCart3 } from "react-icons/bs";
import {Link} from 'react-router-dom'


interface cartProps {
    cartValue: number;
}


const Cart: React.FC<cartProps>=({cartValue}) =>{

     return(
        <div className='mr-6'>
                 <Link to='/cartpage'>
               
        <BsCart3 className=' cursor-pointer  size-6 text-neutral-600 ' />
        {cartValue> 0 && (
<span className=' absolute right-6 -top-[-2px] w-6 rounded-full flex justify-center items-center  bg-neutral-200'>
{cartValue}
</span>
        )}
     
          </Link> 
        </div>
     )

}
export default Cart;