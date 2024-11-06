import React, {useState, useEffect} from 'react';
import ContentFulClient from '../contentfullClient';
import {Product} from '../types'



interface contactProps extends Product {
    image2: string;

}

const Contact:React.FC =() =>{
    const [contactImage, setContactImage] =  useState<contactProps[]>([]);

    useEffect(()=>{
        ContentFulClient.getEntries({
            content_type: 'furnitureStore'
        })
        .then((response)=>{
            const contactData: contactProps[] = response.items.map((item:any)=>({
                name:item.fields.product,
                slug:item.fields.slug,
                price: item.fields.price,
                description: item.fields.description,
                image: item.fields.productImage?.fields?.file?.url || '',
                image2: item.fields.productImage2?.fields?.file?.url || '',
                categories:item.fields.categories || [],
            }))
            const contactDataMap = contactData.filter(product =>
                product.categories.includes('contact')
            )
            setContactImage(contactDataMap)
        })
        .catch(console.error)
    })
    return(
        <>
<div className=' flex flex-col justify-center items-center shadow-md shadow-stone-300'>
    {contactImage.map((product)=>(
        <div key={product.slug} className='sm:flex  sm:justify-end  min-h-screen'  >
            <div className='sm:relative sm:inline-block'>
            <img src={product.image2} alt={product.name}/>
            </div>
<div className='sm:absolute sm:top-64 sm:right-44'>
<div className=' sm:flex sm:flex-row sm:justify-between flex flex-col-reverse justify-center items-center '>
              
                <div className='flex flex-col gap-7mt-10 '>
                <h1 className='text-5xl text-stone-400 mb-8'>Contact Us</h1>
                <form className='flex flex-col gap-3  '>
                    <label >Name</label>
                    <input title='name' type='text' className='p-2 border-solid border-stone-400 border-t-0 border-b-2 border-r-0 border-l-0 bg-transparent w-96 ' placeholder='Your name'  />
                    <label>Email</label>
                    <input title='email' type='text'  className='p-2 border-solid border-stone-400 border-t-0 border-b-2 border-r-0 border-l-0 bg-transparent w-96 ' placeholder='Your email'  />
                    <label>Message</label>
                    <textarea title='message'  className='p-2 border-solid border-stone-400 border-t-0  border-b-2 border-r-0 border-l-0 bg-transparent w-96  focus:ring-blue-500 ' placeholder='How can we help you?' rows={5}  />
                </form>
                <button className='sm:w-52 w-full h-14 border-solid border-2 border-stone-400 rounded-sm text-center mt-10 '>Send Message</button>
                </div>
              
                <div className='sm:relative sm:top-[-200px] sm:right-[-50px] sm:mt-0 mt-[-100px] sm:mb-0 mb-14'>
                <img className='w-[260px] rounded-full  ' src={product.image} alt={product.name}/>
                </div>
   
            </div>
            
</div>
          
        </div>
    ))}

      <div className='flex flex-col   sm:ml-52 gap-6 mb-12  sm:mt-0 mt-20'>
            
<div>
<h1 className='text-2xl font-medium mb-4'>We’re here to help</h1>
<p className='sm:w-[400px] w-[370pxs]'>We aim to reply to your inquiry the same day it’s received. If you reach out to us on a weekend, we’ll respond during business hours as soon as possible.</p>
</div>
<div>
<h1 className='text-2xl font-medium mb-4'>Delivery</h1>
<p className='sm:w-[400px] w-[370px]'>Expect fast, secure delivery. Check the estimated delivery time for each product on our website. Orders with products that have varying delivery times will be shipped together with the item that has the longest delivery time. DHL will notify you by SMS to arrange the date and time for your final delivery.</p>

</div>
         <div>
         <h1 className='text-2xl font-medium mb-4'>Complaints</h1>
         <p className='sm:w-[400px] w-[370px]'>For further information, please read here, then get in touch with us by phone or our contact form.</p>
         </div>
            
            </div>
</div>
        </>
    )

}

export default Contact;