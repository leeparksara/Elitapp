
import React, { useEffect, useState } from 'react';
import contentfulClient from '../contentfullClient'; // Ensure correct path
import { FaCirclePlus } from "react-icons/fa6";


type Product = {
  name:string;
  slug:string;
  description:string;
  price:number;
  image:string;
  discount?:number;
  categories:string[];
};

const ProductComponent: React.FC = ()=> {
  const[products, setProducts] = useState <Product[]> ([]);

  useEffect(()=> {
    contentfulClient.getEntries({
      content_type: 'furnitureStore',
    })
    .then((response)=> {
      const productData:Product[] = response.items.map((item:any)=>({
        name:item.fields.product,
        slug:item.fields.slug,
        description:item.fields.description,
        price:item.fields.price,
        image:item.fields.productImage?.fields?.file?.url|| '',
        discount:item.fields.discount,
        categories:item.fields.categories|| [],
      }));

      // filter bestseller category only here
      const bestSeller = productData.filter(product =>
        product.categories.includes('bestseller')
      );

      setProducts(bestSeller);
    })

 .catch(console.error);
  }, []);

  return(<div className='pb-4' >
    <div className='flex justify-center mb-5 gap-[64rem] '>
    <h1 className=' font-semibold text-lg'>Best seller</h1>
    <p className='text-buttonHover cursor-pointer'>View all</p>
    </div>

    <div className='flex justify-center gap-4 ' >
{products.map((product)=>(
  <div className='bg-neutral-200 rounded-lg ' key={product.slug}>
    <img src={product.image} alt={product.name} className='w-96 h-64 object-cover rounded-t-lg'  />
    <div className='flex justify-between items-center'>
        
      <p className='ml-16' > {product.name}</p>
      <p> ${product.price}  </p>
    
   
    <div className=' flex  justify-center items-center  w-20 bg-customBackground  rounded-tl-full h-14' >
    <FaCirclePlus  className='size-7 ml-2 mt-3 text-neutral-900 cursor-pointer' />
    </div>
 

    </div>


  </div>
))}

    </div>
  </div>);

};

export default ProductComponent;