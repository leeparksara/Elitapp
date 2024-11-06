
import React, { useState, useEffect } from 'react';
import { Product } from '../types'; // Adjust import based on where you have the Product type
import { RiDeleteBin5Line } from "react-icons/ri";
import { IoIosArrowDown } from "react-icons/io";
import Breadcrumb from '../components/Breadcrumb';
interface CartPageProps {
    cartItems: Product[];
    removeFromCart:(slug:string) => void;
}

interface CartProduct extends Product {
    quantity: number;
}

const CartPage:React.FC<CartPageProps> = ({cartItems, removeFromCart}) =>{
    const [cart, setCart] = useState<CartProduct[]>([]);


useEffect(()=> {
    setCart(cartItems.map(item =>({...item, quantity: 1})))
},[cartItems]);


useEffect(()=> {
    localStorage.setItem('cart', JSON.stringify(cart));
},[cart])

    const [showDiscountField, setShowDiscountField] = useState(false);
    const [showSubmitButton, setShowSubmitButton] = useState(false);

  

const incrementQuantitiy = (slug:string)=> {
    setCart(prevCart=>
         prevCart.map(item =>
        item.slug === slug
        ? {...item, quantity: item.quantity + 1}
        : item
    )
);
}

const decrementQuantity = (slug:string)=>{
    setCart(prevCart=> 
        prevCart.map(item => 
            item.slug === slug && item.quantity > 1
            ? {...item , quantity: item.quantity -1 }
            : item
        )
    );
};
// iterate , add all the items without repating the result
const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);
// Calculate vat rate 25% = 0.25
const vatAmount = totalPrice * 0.25;
// sum the total price for the client 
const totalSum = totalPrice + vatAmount;

    return(
        <div className=' mb-36 '>
              <div className='ml-[0px]  mt-10'>
            <  Breadcrumb  />
            </div>
              <h1 className='ml-[0px] mb-8 mt-12 text-xl text-gray-500 '> Your order</h1>
            <div className="sm:flex sm:flex-row flex flex-col justify-start items-start gap-4 sm:justify-around sm:items-start">
            {cart.length === 0 ? (
                <p className='sm:-ml-[15.4rem]'>
                   Your cart is empty
                </p> 
            ): (
                <div className="flex flex-col items-center gap-8">
                    {cart.map((item,index)=>(
                        <div  key={index} className='bg-white sm:flex sm:flex-row sm:justify-around   sm:items-center sm:w-[55rem]  sm:h-[25rem] sm:gap-16   flex flex-col justify-start items-start h-full w-full rounded-sm'>
                            <div className="sm:flex sm:flex-row sm:justify-center sm:items-center sm:gap-24  flex flex-col justify-start items-star gap-0  " >
                                <div className='sm:flex sm:flex-row sm:items-center sm:gap-11 flex flex-col justify-center items-start  gap-0 '>
                                <img src={item.image} alt={item.name} className="sm:w-[300px] sm:h-auto w-full h-auto "/>
                                <div className='flex flex-col justify-start items-start gap-3 sm:-mt-[0px] -mt-[110px] sm:ml-0 ml-12'>
                                    <p>{item.name}</p>
                                    
                                    <p> ${item.price}</p>
                                    <h2 className='font-semibold'>Delivery: 6-12 days</h2>
                                   
                                </div>
                                </div>
                                
                                
                                <div className="flex gap-6 mt-7 sm:mt-0 sm:mb-0 mb-12 sm:ml-0 ml-12">
                                <div className='flex gap-2'>
                                    <button onClick={() => incrementQuantitiy(item.slug)} className='bg-white w-8 h-8 rounded-full  outline outline-1 outline-zinc-600 text-center '> +</button>
                                    {item.quantity}
                                    <button onClick={() => decrementQuantity(item.slug)} className='bg-white  w-8 h-8 rounded-full  outline outline-1 outline-zinc-600 text-center '>-</button>
                                    </div>
                                    {/*<RiDeleteBin5Line className='size-7 text-zinc-600 cursor-pointer' onClick={() => setCart(cart.filter(cartItem => cartItem.slug !== item.slug))} /> */}
                                    <RiDeleteBin5Line className='size-7 text-zinc-600 cursor-pointer' onClick={()=> removeFromCart(item.slug)} />

                                </div>
                                
                       
                            </div>

                        </div>
                    ))}
                </div> 
            )}

            <div className='flex flex-col  sm:w-[22rem] w-full sm:mt-0 mt-4 '>
                
                    <div className='bg-white p-4 rounded flex flex-col items-center gap-5 ' >
                        <h1 className=' -ml-[9.5rem] mt-3 mb-3'>Order summary</h1>
                        <div className='w-[17rem]'>
                        <div className='flex justify-around gap-[160px] text-zinc-500 '>
                <h2 > Price: </h2>
                <p> $ {totalPrice}</p>
                </div>
                <div className='flex justify-around text-zinc-500 gap-[195px]'>
                <h2 >Vat:</h2>
                <p>{vatAmount}</p>
                </div>
                <div className='flex justify-around  gap-[195px]'>
                <h2 >Total:</h2>
                <p>{totalSum}</p>
                </div>
                        </div>
 
<div className='bg-buttonHover sm:w-[16rem] w-full p-3 text-center rounded-sm text-white '>
    <button>Pay</button>
</div>
                    </div>
             
              
              
             <div className='bg-white p-4 grid gap-6  mt-6 '>
                <div className='flex justify-between  mt-4  cursor-pointer '  onClick={() => setShowDiscountField(!showDiscountField)}> <h1>Discount code</h1> <IoIosArrowDown /> </div>

                {showDiscountField && (
                    <div className='flex flex-col items-center gap-6 '>  
                   
                    <input  className=' p-3 outline outline-1 w-full text-zinc-500 rounded-sm ' type='text' title='code input' placeholder='Your code' onClick={() => setShowSubmitButton(true)} />
                    {showSubmitButton && (
 <button className=' p-3 bg-zinc-800 w-full text-white rounded-sm'>submit </button>
                    )}
                   
                    </div>
                )}
                
                

             </div>
            </div>
            </div>
        </div >
    )
}
export default CartPage