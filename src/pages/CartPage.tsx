
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
        <div className=' mb-36'>
              <div className='ml-[52px]  mt-10'>
            <  Breadcrumb  />
            </div>
              <h1 className='ml-[52px] mb-8 mt-12 text-xl text-gray-500 '> Your order</h1>
            <div className="flex justify-around items-start">
            {cart.length === 0 ? (
                <p className='-ml-[15.5rem]'>
                    Your cart is empty
                </p>
            ): (
                <div className="flex flex-col items-center gap-8" >
                    {cart.map((item,index)=>(
                        <div  key={index} className='bg-white flex items-center  w-[55rem]  h-[25rem]  justify-around gap-16   rounded-sm'>
                            <div className="flex  items-center gap-24 " >
                                <div className='flex items-center gap-11'>
                                <img src={item.image} alt={item.name} className="w-[300px] h-auto"/>
                                <div className='flex flex-col gap-3 '>
                                    <p>{item.name}</p>
                                    
                                    <p> ${item.price}</p>
                                    <h2 className='font-semibold'>Delivery: 6-12 days</h2>
                                   
                                </div>
                                </div>
                                
                                
                                <div className="flex gap-6">
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

            <div className='flex flex-col  w-[22rem] '>
                
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
 
<div className='bg-buttonHover w-[16rem] p-3 text-center rounded-sm text-white '>
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