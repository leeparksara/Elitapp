import React, { useEffect, useState } from 'react';
import ContentFullClient from '../contentfullClient';
import { Product } from '../types';
import { IoIosArrowRoundForward, IoIosArrowRoundBack } from "react-icons/io";

interface DealProducts extends Product {
  dealsHeading: string;
  dealsPara: string;
}

interface DealsProductsText extends Product {
  dealsText: string;
}

const Deals: React.FC = () => {
  const [deals, setDeals] = useState<DealProducts[]>([]);
  const [dealProducts, setDealsProducts] = useState<DealsProductsText[]>([]);
  const [dealSlide, setDealsCurrentSlide] = useState(0);
  const numberOfImages = 4;

  // Fetching both deals and deal products in a single useEffect
  useEffect(() => {
    const fetchDeals = async () => {
      try {
        const response = await ContentFullClient.getEntries({
          content_type: 'furnitureStore',
        });

        // Processing deals
        const dealsData: DealProducts[] = response.items.map((item: any) => ({
          name: item.fields.product,
          slug: item.fields.slug,
          price: item.fields.price,
          image: item.fields.productImage?.fields?.file.url || '',
          dealsHeading: item.fields.coldMaterial,
          dealsPara: item.fields.coldMaterial2,
          categories: item.fields.categories || [],
        }));

        const dealsMap = dealsData.filter(dealProduct =>
          dealProduct.categories.includes('deals')
        );

        setDeals(dealsMap);

        // Processing deal products
        const dealsProductsData: DealsProductsText[] = response.items.map((item: any) => ({
          name: item.fields.product,
          slug: item.fields.slug,
          price: item.fields.price,
          image: item.fields.productImage?.fields?.file.url || '',
          discount: item.fields.discount,
          dealsText: item.fields.coldMaterial,
          categories: item.fields.categories || [],
        }));

        const dealsProductMap = dealsProductsData.filter(deal =>
          deal.categories.includes('dealsProducts')
        );

        setDealsProducts(dealsProductMap);
      } catch (error) {
        console.error(error);
      }
    };

    fetchDeals();
  }, []);

  // Slide navigation functions
  const nextSlide = () => {
    setDealsCurrentSlide(prev => (prev + 1) % Math.ceil(dealProducts.length / numberOfImages));
  };
  const prevSlide = () => {
    setDealsCurrentSlide(prev => (prev - 1 + Math.ceil(dealProducts.length / numberOfImages)) % Math.ceil(dealProducts.length / numberOfImages));
  };

  // Calculate the current set of products to display
  const currentProducts = dealProducts.slice(dealSlide * numberOfImages, dealSlide * numberOfImages + numberOfImages);

 
  return (
    <div>
      {deals.map((dealsProduct) => (
        <div key={dealsProduct.slug}>
          <div className='relative '>
            <img src={dealsProduct.image} alt={dealsProduct.name} className="sm:size-full sm:h-[700px] " />
            <div className='absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center'>
              <h2 className='font-semibold sm:text-6xl text-3xl text-zinc-700 mb-4'>{dealsProduct.dealsHeading}</h2>
              <p className='font-medium text-3xl text-zinc-700'>{dealsProduct.dealsPara}</p>
            </div>
            <h2 className='text-4xl text-center mt-20'>{dealsProduct.name}</h2>
          </div>
        </div>
      ))}

      <div className='flex justify-between mb-60 w-full sm:overflow-hidden relative '>
        <button title='previous' onClick={prevSlide} 
          className="absolute sm:left-0 left-[37%] sm:p-2 sm:top-[60%]  top-[115%] transform -translate-y-1/2 bg-white rounded-full z-10  text-zinc-500">
          <IoIosArrowRoundBack size={35} className='transition-transform duration-200 ease-in-out hover:translate-x-2' />
        </button>

        {currentProducts.map((deals) => (
          <div key={deals.slug} className='sm:h-[500px]'>
            <div className='relative rounded-sm border-2 border-zinc-300 sm:h-full shadow-md shadow-neutral-300 flex flex-col items-center text-center mt-24 cursor-pointer bg-heroBackground transition-transform duration-500 ease-in-out hover:scale-105'>
              <img className="w-[340px] " src={deals.image} alt={deals.name} />
              <div className='absolute sm:top-36 top-10 flex font-semibold items-center justify-center text-white'>
                <p className='-rotate-90 text-lg uppercase'>{deals.dealsText}</p>
                <p className='sm:text-7xl'>{deals.discount}%</p>
              </div>
            </div>
          </div>
        ))}

        <button title='next' onClick={nextSlide}
          className="absolute sm:right-0 right-[37%] sm:p-2 sm:top-[60%] top-[115%]  transform -translate-y-1/2 bg-white rounded-full z-10  text-zinc-500 ">
          <IoIosArrowRoundForward size={35} className='transition-transform duration-200 ease-in-out hover:translate-x-2' />
        </button>
      </div>
    
    </div>
  );
};

export default Deals;
