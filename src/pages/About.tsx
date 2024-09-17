import React, {useState,useEffect} from 'react';

import contentfulClient from '../contentfullClient'; 

import Breadcrumb from '../components/Breadcrumb';

type designer = {
    url: string;
    description: string;
    title:string;
};

type Product ={
    name:string;
    slug: string;
    description: string;
    image1: string;
    categories: string [];
    image2: string;
    image3: string;
    designers: designer[];
   
   
}
const AboutPage:React.FC =() =>{
    const [aboutContents, setAboutContents]= useState <Product[]>([]);
const [aboutContents2, setAboutContents2] = useState <Product[]> ([]);
const [aboutContents3, setAboutContents3] = useState<Product[]>([]);

const [designers, setDesigners]= useState<Product[]>([]);

   useEffect(()=>{
    contentfulClient.getEntries({
        content_type: 'furnitureStore'
    })
    .then((response) =>{
        const aboutData: Product[] = response.items.map((item:any)=>({
            name:item.fields.product,
            slug:item.fields.slug,
            description: item.fields.description,
            image1:item.fields.aboutImage?.fields?.file?.url || '',
            image2: item.fields.productImage2?.fields?.file?.url ||'',
            image3: item.fields.productImage3?.fields?.file?.url || '',
            categories:item.fields.categories || [],
              designers: item.fields.designers?.map((designer:any)=>({
                url:designer.fields.file.url,
                description: designer.fields.description,
                title: designer.fields.title,
              })) || []
        }));

       const aboutDataContent = aboutData.filter(product =>
        product.categories.includes('about section1'));

       const aboutDataContent2 = aboutData.filter(product =>(
      product.categories.includes('about section2')
       ));

      const aboutDataContents3 = aboutData.filter(product =>(
        product.categories.includes('about section3')
      ));
 const designersData = aboutData.filter(product =>(
    product.categories.includes('designers section')
 ))


       setAboutContents(aboutDataContent);
       setAboutContents2(aboutDataContent2);
       setAboutContents3(aboutDataContents3);
       setDesigners(designersData);
     
    })
.catch(console.error);
   },);

    return(
        <div className='flex flex-col justify-center  mt-28 mb-72'>
            <div className='ml-[100px] mb-8'>
            <  Breadcrumb  />
            </div>
         
{aboutContents.map((product)=>(
    <div className='flex flex-col justify-center items-center gap-8 ' key={product.slug}>
        <p className="w-[800px] text-left font-normal text-balance leading-7 ml-14">{product.description}</p>
        <img src={product.image1} alt={product.name} className='w-[1000px] h-[550px]'/>
    </div>
    
))}

<div>
    {aboutContents2.map((product)=>(
        <div  className='flex flex-row justify-center items-center gap-36 mt-20'>
                  <p className="w-[300px] text-left text-balance font-semibold leading-8 text-lg text-zinc-800">{product.description}</p>
            <img src={product.image2} alt={product.name} className="w-[400px]"/>
        </div>
    ))}
</div>
<div>
    {aboutContents3.map((product)=>(
        <div className='flex justify-center items-center mt-32 gap-10 mb-20'>
               
               <img src={product.image1} alt={product.name} className="w-[300px] h-[400px]"/>
      
            <img src={product.image2} alt={product.name} className="w-[350px] h-[500px]"/>

                           <img src={product.image3} alt={product.name} className="w-[300px] h-[400px]"/>
   

        </div>
        
    ))}

    
</div>
<div className='flex flex-col justify-center items-center'>
    <h1 className='text-2xl mt-24 mb-10'> Meet our designers</h1>

    <div >
        {designers.map((product)=>(
            <div  key={product.slug}>

                <div  className='flex flex-row justify-center gap-10 text-center '>
                    {product.designers.map((designer,index)=>(
                        <div key={index}>
                         <div className=' flex flex-col justify-center items-center '>
                         <img src={designer.url} alt={designer.description} className='w-[200px] h-[260px] mb-8  rounded-full'  />
                         
                            <p className='text-lg mb-5 ' >{designer.title}</p>
                         </div>
   
                            <p  className='w-[270px] text-balance text-left font-normal text-gray-500 leading-7'  >{designer.description}</p>
                        </div>
                    ))}
                </div>

            </div>
        ))}
    </div>
</div>

        </div>
    )
}

export default AboutPage;