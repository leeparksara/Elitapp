import React, { useState, useEffect } from 'react';
import contentfulClient from '../contentfullClient';

import priceTag from '../assets/Group 10.png'

type Collection = {
  url: string;
  description: string;
 
};

type Product = {
  name: string;
  slug: string;
  price: number;
  description: string;
  categories: string[];
  collections: Collection[]; 
  colDim: string;
  coldMaterial:string;
  coldMaterial2:string; // Assuming this contains the images from `newCollectionSection`
};

const NewCollectionComponent: React.FC = () => {
  const [newCollection, setNewCollection] = useState<Product[]>([]);
  const [selectedColorIndexes, setSelectedColorIndexes] = useState<number[]>([]);

  useEffect(() => {
    contentfulClient
      .getEntries({
        content_type: 'furnitureStore',
      })
      .then((response) => {
        const newCollProductData: Product[] = response.items.map((item: any) => ({
          name: item.fields.product,
          slug: item.fields.slug,
          description: item.fields.description,
          price: item.fields.price,
          categories: item.fields.categories || [],
          colDim:item.fields.colDim,
          coldMaterial: item.fields.coldMaterial,
          coldMaterial2: item.fields.coldMaterial2,
          collections: item.fields.newCollectionSection?.map((collection: any) => ({
            url: collection.fields.file.url,
            description: collection.fields.description,
          
          })) || [],
        }));

        // Filter the products by the `newCollection` category
        const newCol = newCollProductData.filter((product) =>
          product.categories.includes('newCollection')
        );
        setNewCollection(newCol);
        setSelectedColorIndexes(newCol.map(() => 0)); // Initialize selected color indexes
      })
      .catch(console.error);
  }, []);

  const handleColorChange = (index: number, colorIndex: number) => {
    const newSelectedColors = [...selectedColorIndexes];
    newSelectedColors[index] = colorIndex;
    setSelectedColorIndexes(newSelectedColors);
  };

  return (
    <div className='flex flex-col' >
      <h1 className="text-7xl mt-10 ml-32 text-cta font-semibold">New Collection</h1>
      <div>
        {newCollection.map((product, productIndex) => (
          <div key={product.slug} className="flex flex-row-reverse justify-center gap-32">
           
            <div className='flex flex-row-reverse justify-around items-center gap-24'>
            
            

<div className="flex justify-center items-center">


<img
              src={product.collections[selectedColorIndexes[productIndex]].url}
              alt={product.name}
              className="w-[650px] h-full"
            />
            <img src={priceTag} alt='pricetag' className=' relative right-[660px] -top-[36px]' />
<div>

              {product.collections.map((_, colorIndex) => (
                <button 
                  title="button"
                  key={colorIndex}
                  className={`w-10 h-10 rounded-full flex mb-2 ${
                    selectedColorIndexes[productIndex] === colorIndex ? 'border-2 border-gray-500' : ''
                  }`}
                  onClick={() => handleColorChange(productIndex, colorIndex)}
                  style={{ backgroundColor: ['#222222', '#AA9766', '#DFDFD9'][colorIndex] }}
                />
               
              ))}
          
            </div>
</div>



             <div className='text-neutral-500 '>
              <h2 className='font-semibold text-neutral-700 text-2xl mb-4 '>{product.name}</h2>
            <div  >
<h2 className='text-neutral-700 '>Material:</h2>
<ul className='list-disc ml-4 mb-3 '>
    <li >{product.coldMaterial}</li>
    <li >{product.coldMaterial2}</li>
</ul>
</div>
<div>
    <h2 className='text-neutral-700'>Demisions:</h2>
    <p>{product.colDim}</p>
</div>

            </div>
            </div>


            {/* Color palette */}
           
            
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewCollectionComponent;
