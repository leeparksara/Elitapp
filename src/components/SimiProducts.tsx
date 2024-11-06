import React,{useState, useEffect} from 'react';
import { Product } from '../types';
import contentFullClient from '../contentfullClient'
import { IoIosArrowRoundForward, IoIosArrowRoundBack } from "react-icons/io";

interface similarProducts extends Product{
   hoverImage:string;
}

const SimilarProduct:React.FC =() =>{

const [simProduct, setSimProduct] = useState<similarProducts[]>([]);
const [simSlide, setSimSlide] = useState(0);

const numberOfSlides = 3;

useEffect (()=>{
    const fetchDeals = async ()=>{
        try{
            const response = await contentFullClient.getEntries({
                content_type : 'furnitureStore'
            });
            const similarProductData: similarProducts[] = response.items.map((item:any)=>({
                name: item.fields.product,
                slug: item.fields.slug,
                price: item.fields.price,
                image: item.fields.productImage?.fields?.file?.url || '',
                hoverImage: item.fields.productImage2?.fields?.file?.url || '',
                categories: item.fields.categories || [],
            }));
            const similarProductDataMap = similarProductData.filter(product =>
                product.categories.includes('similar')
            )
            setSimProduct(similarProductDataMap);
        } catch(error){
           console.error('error') 
        }
    };
    fetchDeals();
},[]);

const nextSlide = ()=>{
    setSimSlide((prev)=> (prev +1)%Math.ceil( simProduct.length / numberOfSlides));

}

const prevSlide = ()=>{
    setSimSlide((prev)=>(prev -1 + Math.ceil(simProduct.length /numberOfSlides))% Math.ceil(simProduct.length/numberOfSlides));
}


const currentSlide = simProduct.slice(simSlide * numberOfSlides, simSlide * numberOfSlides + numberOfSlides);

    return(
    <div>
<div>
<h1 className='font-semibold sm:ml-16 mt-16'>Similar products</h1>
<div className='sm:flex justify-center items-center mt-16 flex flex-row gap-3 '>
<button title='previous' onClick={prevSlide} 
          className=" bg-white rounded-full z-10  text-zinc-500 sm:p-2 ">
          <IoIosArrowRoundBack size={26} className='transition-transform duration-200 ease-in-out hover:translate-x-2' />
        </button>

{currentSlide.map((product)=>(
              <div  key={product.slug}>
          
            <div className='sm:grid font-medium sm:text-lg  '>
  <img className='w-[380px]' src={product.image} alt={product.name}/>
<p >{product.name}</p>
<p>{product.price} $</p>
            </div>

        </div>
       
      
    ))}
<button title='next' onClick={nextSlide}
          className=" bg-white rounded-full z-10 text-zinc-500 sm:p-2">
          <IoIosArrowRoundForward size={26} className='transition-transform duration-200 ease-in-out hover:translate-x-2' />
        </button>
      
</div>
    
</div>
    </div>
    )
}

export default SimilarProduct