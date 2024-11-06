import React, {useState,useEffect} from 'react';
import ContentFullClient from '../contentfullClient'
import { FaCirclePlus } from 'react-icons/fa6';
import Breadcrumb from '../components/Breadcrumb';
type Product = {
    name: string;
    slug: string;
    price:number;
    image: string;
    hoverImage: string;
    categories: string[];

  };

interface ProductProps {
    
    addToCart: (product: Product) => void;

  }
const ChairPage:React.FC<ProductProps> = ({ addToCart }) =>{
    const [chairs, setChairs] = useState<Product[]>([]);
    
    useEffect(() =>{
        ContentFullClient.getEntries({
            content_type : 'furnitureStore'
        })
        .then ((response)=>{
            const chairsData: Product[] = response.items.map((item: any)=>({
                name: item.fields.product,
                slug: item.fields.slug,
                price:item.fields.price,
                image: item.fields.productImage?.fields?.file.url || '',
                hoverImage: item.fields.productImage2?.fields?.file.url || '',
                categories: item.fields.categories || []
            }))
           
            const productMap = chairsData.filter((product)=>
            product.categories.includes('sofaPage'))
            setChairs(productMap)
        })
        .catch(console.error);
      

    },[])
  

   return(
   <>

<div className='pb-4 mt-28' >

<div className=" ml-[0px] mb-8">
<Breadcrumb  />
</div>
  <div className='flex justify-center items-center'>
  <div className='sm:grid sm:grid-cols-3 sm:gap-7 flex flex-col gap-9 '>
    {chairs.map((product)=>(
        <div key={product.slug} className='bg-neutral-200 rounded-lg w-[400px] cursor-pointer'>
            <img  src={product.image}alt={product.name} className='w-[400px] h-[300px] object-cover p-8'
           onMouseOver={((e)=>{
            if(product.hoverImage){
                (e.currentTarget as HTMLImageElement).src = product.hoverImage;
            }})}
            onMouseOut={((e)=>{
                (e.currentTarget as HTMLImageElement).src = product.image
            })}
             />
            <div className="flex justify-between items-center">
                <p className="ml-16">{product.name}</p>
                <p>${product.price}</p>
                <div className="flex justify-center items-center w-20 bg-customBackground rounded-tl-full h-14">
                  <FaCirclePlus
                    className="size-7 ml-2 mt-3 text-neutral-800 cursor-pointer"
                    onClick={() => addToCart(product)} 
                  />
                </div>
              </div>
        </div>
    ))}
    </div>
  </div>
    
    
</div>
   </>
   )
}
export default ChairPage;