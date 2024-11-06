import React, {useState, useEffect} from 'react';
import Breadcrumb from '../components/Breadcrumb';
import { Product } from '../types';
import contentfulClient from '../contentfullClient'

interface inspoProduct extends Product{
    inspoImage2:string;
    inspoImage3:string;
    inspoImage4:string;
    inspoImage5:string;
    inspoImage6:string;
}
const InspoSection:React.FC =()=>{
    const [inspo, setInspo] = useState <inspoProduct[]>([]);


   useEffect(()=>{
    contentfulClient.getEntries({
        content_type: 'furnitureStore'
    })
    .then((response)=>{
        const inspoData: inspoProduct[] = response.items.map((item:any)=>({
            name: item.fields.product,
            slug: item.fields.slug,
            price: item.fields.price,
            image: item.fields.productImage?.fields?.file?.url || '',
            inspoImage2: item.fields.productImage2?.fields?.file?.url || '',
            inspoImage3: item.fields.productImage3?.fields?.file?.url || '',
            inspoImage4: item.fields.productImage4?.fields?.file.url || '',
            inspoImage5: item.fields.image5?.fields?.file.url || '',
            inspoImage6: item.fields.productImage6?.fields?.file?.url || '',
            categories: item.fields.categories || [],
        }))
        const inspoDataMap = inspoData.filter(product =>
            product.categories.includes('insposection')
        )
        setInspo(inspoDataMap)
    })
    .catch(console.error)
   })
    return(
    <div  >
        <div className='ml-[0px] '>
        <Breadcrumb/>
        <h1 className='font-semibold text-xl mb-7 mt-8'>Styled by our customers</h1>
        </div>

        

<div className='sm:flex justify-center items-center mb-44'>
{inspo.map((product)=>(
    <div key={product.slug}>
        <div className='sm:grid sm:grid-cols-3 sm:gap-3 sm:w-[80rem]  flex flex-col gap-5 '>
        <img className='w-[30rem]' src={product.image} alt={product.name} />
        <img className='w-[30rem]' src={product.inspoImage2} alt={product.name}/>
        <img className='w-[30rem]' src={product.inspoImage3} alt={product.name}/>
        <img className='w-[30rem]' src={product.inspoImage4} alt={product.name}/>
        <img className='w-[30rem]' src={product.inspoImage5} alt={product.name}/>
        <div className='flex flex-col  items-center text-center rounded-sm border-2 border-zinc-300 sm:h-[34.6rem] sm:-mt-[8.5rem]  pb-5 gap-5 border-b-0'>
           <h1 className='font-semibold text-3xl mt-7'>Find inspiration!</h1>
           <p className='w-[20rem] text-center'>We'd love to see how you style our furniture in your home. Share your unique setups on Instagram with the hashtag #Elite, and your space could be featured right here on our website!
           </p>
           <img className='w-[20rem] ' src={product.inspoImage6} alt={product.name}/>
            </div>
        </div>

<div>
    


</div>
    </div>
    
))}

</div>

    </div>
    )
}

export default InspoSection;