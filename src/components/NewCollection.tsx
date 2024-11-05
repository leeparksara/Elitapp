import React, { useState, useEffect } from 'react';
import contentfulClient from '../contentfullClient';
import priceTag from '../assets/Group 10.png';

type Collection = {
  url: string;
  description: string;
};

interface HomeProps {
  addToCart: (product: Product) => void;
}

type Product = {
  name: string;
  slug: string;
  price: number;
  description: string;
  categories: string[];
  collections: Collection[];
  image: string;
  colDim: string;
  coldMaterial: string;
  coldMaterial2: string; // Assuming this contains the images from `newCollectionSection`
};

const NewCollectionComponent: React.FC<HomeProps> = ({ addToCart }) => {
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
          colDim: item.fields.colDim,
          coldMaterial: item.fields.coldMaterial,
          coldMaterial2: item.fields.coldMaterial2,
          image: item.fields.productImage?.fields?.file.url || '',
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
    <div className="flex flex-col ">
      <h1 className="sm:text-7xl text-4xl sm:mt-20 sm:mb-20 sm:text-start  text-cta font-semibold w-full m-0 text-center ">New Collection</h1>
      <div>
        {newCollection.map((product, productIndex) => (
          <div key={product.slug} className="flex flex-col sm:flex-row-reverse justify-center items-center gap-4 sm:gap-32 mb-10">
            <div className="flex flex-col sm:flex-row-reverse justify-around items-center gap-4 sm:gap-24 ">
              <div className="  sm:flex sm:justify-center sm:items-center ">
              <img
              src={product.collections[selectedColorIndexes[productIndex]].url}
              alt={product.name}
              className="w-[650px] h-full"
            />
            <img src={priceTag} alt='pricetag' className=' relative sm:right-[660px] sm:-top-[36px] right-[30px] -top-[200px] -rotate-6'  />
                <div className="sm:flex sm:flex-col items-center sm:mt-2 flex justify-center gap-4 mt-[-90px]">
                  {product.collections.map((_, colorIndex) => (
                    <button
                      title="button"
                      key={colorIndex}
                      className={`sm:w-10 sm:h-10 rounded-full mb-2 w-8 h-8 ${
                        selectedColorIndexes[productIndex] === colorIndex ? 'border-2 border-gray-500' : ''
                      }`}
                      onClick={() => handleColorChange(productIndex, colorIndex)}
                      style={{ backgroundColor: ['#222222', '#AA9766', '#DFDFD9'][colorIndex] }}
                    />
                  ))}
                </div>
              </div>
              <div className="text-neutral-500 text-center sm:text-left">
                <h2 className="font-semibold text-neutral-700 text-2xl mb-4">{product.name}</h2>

                <div className='flex flex-col justify-start items-start '>
                <div >
                  <h2 className="text-neutral-700 ">Material:</h2>
                  <ul className="list-disc ml-4 mb-3">
                    <li>{product.coldMaterial}</li>
                    <li>{product.coldMaterial2}</li>
                  </ul>
                </div>
                
                <div >
                <h2 className="text-neutral-700 mr-20">Dimensions:</h2>
                <p>{product.colDim}</p>
                </div>
                </div>
               
                <div>
                 
                  <div className="bg-zinc-800 sm:h-16 sm:w-44 w-full text-white rounded-md mt-8 text-center">
                    <button
                      onClick={() => addToCart(product)}
                      className="text-xl p-4 "
                    >
                      Buy
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewCollectionComponent;

