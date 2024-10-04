import React, { useEffect, useState } from 'react';
import contentfulClient from '../contentfullClient'; // Ensure correct path
import { FaCirclePlus } from 'react-icons/fa6';
import Breadcrumb from '../components/Breadcrumb';

// Initializing the props value
interface ProductProps {
  addToCart: (product: Product) => void;
}

// Initializing the type of our products
type Product = {
  name: string;
  slug: string;
  description: string;
  price: number;
  image: string;
  discount?: number;
  categories: string[];
  hoverImage: string;
};

// Passing the add to cart props
const BestSellerPage: React.FC<ProductProps> = ({ addToCart }) => {
  // Setting the state of our best seller to an array of products
  const [bestSellerProducts, setBestSellerProducts] = useState<Product[]>([]);

  // Retrieving the data from contentful API
  useEffect(() => { 
    contentfulClient
      .getEntries({
        content_type: 'furnitureStore',
      })
      .then((response) => {
        const bestSellerItems: Product[] = response.items.map((item: any) => ({
          name: item.fields.product,
          slug: item.fields.slug,
          description: item.fields.description,
          price: item.fields.price,
          image: item.fields?.productImage?.fields?.file?.url || '',
          hoverImage: item.fields?.productImage2?.fields?.file?.url || '',
          discount: item.fields.discount,
          categories: item.fields.categories || [],
        }));
        const bestSeller = bestSellerItems.filter((product) =>
          product.categories.includes('bestsellerpage')
        );

        setBestSellerProducts(bestSeller);
      })
      .catch(console.error);
  }, []);

  return (
    <div className="pb-4 mt-28">
      <div className="ml-[100px] mb-8">
        <Breadcrumb />
      </div>
      <div className="flex justify-center items-center ">
        <div className="grid grid-cols-3 gap-7">
          {bestSellerProducts.map((product) => (
            <div className="bg-neutral-200 rounded-lg w-[400px] cursor-pointer" key={product.slug}>
              <img
                src={product.image}
                alt={product.name}
                className="w-[400px] h-[300px] object-cover p-8 cursor-pointer"
                onMouseOver={(e) => {
                  if (product.hoverImage) {
                    (e.currentTarget as HTMLImageElement).src = product.hoverImage;
                  }
                }}
                onMouseOut={(e) => {
                  (e.currentTarget as HTMLImageElement).src = product.image;
                }}
              />
              <div className="flex justify-between items-center">
                <p className="ml-16">{product.name}</p>
                <p>${product.price}</p>
                <div className="flex justify-center items-center w-20 bg-customBackground rounded-tl-full h-14">
                  <FaCirclePlus
                    className="size-7 ml-2 mt-3 text-neutral-800 cursor-pointer"
                    onClick={() => addToCart(product)} // Pass the product to addToCart
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BestSellerPage;
