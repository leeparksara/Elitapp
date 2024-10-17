import React, {useEffect, useState} from 'react';
import ContentFullClient from '../contentfullClient'
import ImageModal from '../components/ImageModal';
import SimilarProduct from '../components/SimiProducts';
import Questions from '../components/Questions';

type Product = {
name: string;
slug:string;
price:number;
discount: number;
hoverImage: string;
image2:string;
image3:string;
image4:string;
image5:string;
image:string;
categories:string []
}

interface CartProps {
    addToCart: (product: Product) => void;
}


const HeroProductPage:React.FC<CartProps>=({addToCart})=>{
    const [heroProduct, setHeroProduct] = useState<Product[]>([]);
   
    const [modalImage, setModalImage] = useState<string | null> (null); 

    const openModal= (image:string)=>{
        setModalImage(image)
    };

    const closeModal= ()=>{
        setModalImage(null);
    }

    useEffect(()=>{
        ContentFullClient.getEntries({
            content_type : 'furnitureStore'
        })
        .then((response)=>{
            const heroProductData:  Product [] = response.items.map((item:any)=>({
                name:item.fields.product,
                slug:item.fields.slug,
                price:item.fields.price,
                discount: item.fields.discount,
                image: item.fields.productImage?.fields?.file.url || "",
                hoverImage: item.fields.productImage2?.fields?.file.url || "",
                image2: item.fields.productImage2?.fields.file.url || "",
                image3: item.fields.productImage3?.fields.file.url|| "",
                image4:item.fields.productImage4?.fields?.file.url || "",
                image5:item.fields.image5?.fields?.file.url || "",
                categories: item.fields.categories || []

            }))
            const mapHeroProductsData = heroProductData.filter((saleProduct)=>
                saleProduct.categories.includes('discount'));
            setHeroProduct(mapHeroProductsData)
        })
        .catch(console.error)
    }, [])

 return(
    <div className='mt-16' >
       
{heroProduct.map((saleProduct)=>(
    <div className='flex justify-center items-center gap-20' key={saleProduct.slug}>
<div>
    <div className='bg-white w-[50rem] flex justify-center rounded-md shadow-md'>
    <img className=' ' src={saleProduct.image} alt={saleProduct.name}/>
    </div>

    <div className='flex justify-center items-center gap-4  h-[11rem] mt-3'>

        <img   className='w-[100px]  cursor-pointer' src={saleProduct.image2} alt={saleProduct.name} onClick={()=> openModal(saleProduct.image2)} />
        <img  className='w-[100px]  cursor-pointer' src={saleProduct.image3} alt={saleProduct.name} onClick={()=> openModal(saleProduct.image3)}/>
        <img  className='w-[100px]  cursor-pointer' src={saleProduct.image4} alt={saleProduct.name} onClick={()=> openModal(saleProduct.image4)}/>
        <img className='w-[100px]  cursor-pointer' src={saleProduct.image5} alt={saleProduct.name} onClick={()=> openModal(saleProduct.image5)}/> 
       
    </div>
</div>
<div className='flex flex-col gap-4'>
    <h1 className='font-semibold text-xl '>{saleProduct.name}</h1>
    <h2 className='text-lg font-medium'>$ {saleProduct.price}</h2>
    <p className='text-gray-500'> delivery: 5-6 days</p>
    <p className='text-gray-500'>Size: 100cm x 120cm x 140 cm</p>
    <h2 className='font-medium'>{saleProduct.name}</h2>
    <p className=' w-80'>Carly is a classic chair that adds minimal and luxury touch to your space  </p>
    <div>
        <button className='bg-cta p-3 w-80 rounded-sm'  onClick={() => addToCart(saleProduct)}> Add to cart</button>
    </div>
   
</div>


    </div>
))}
<div>
<SimilarProduct/>
</div>
<div>
    <Questions/>
</div>
{modalImage && <ImageModal image={modalImage} onClose={closeModal}/>}
    </div>
 )
}

export default HeroProductPage