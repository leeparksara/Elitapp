import React from 'react'
import { CiDeliveryTruck } from "react-icons/ci";
import { RiLoopRightFill } from "react-icons/ri";


const Delivery:React.FC=()=>{
    return(
        <div  className="flex justify-center items-center gap-28 bg-white h-[10rem] mt-32">
            <div>
<CiDeliveryTruck className='text-zinc-400' size={35}/>
<h1 className='font-semibold'>Fast Delivery</h1>
<p className='font-light'>delivery within 5 days</p>
            </div>
<div>
    <RiLoopRightFill className='text-zinc-400' size={35}/>
    <h1 className='font-semibold'>Fast refund</h1>
    <p className="font-light">We garanti fast refund</p>
</div>
        </div>
    )
}
export default Delivery;