import React, { useEffect, useState } from 'react';
import contentfulClient from '../contentfullClient'; // Ensure correct path
import { FaCirclePlus } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';

interface ProductProps {
  addToCart: (product: Product) => void;
}

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

const ProductComponent: React.FC<ProductProps> = ({ addToCart }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/best');
  };

  useEffect(() => {
    contentfulClient
      .getEntries({
        content_type: 'furnitureStore',
      })
      .then((response) => {
        const productData: Product[] = response.items.map((item: any) => ({
          name: item.fields.product,
          slug: item.fields.slug,
          description: item.fields.description,
          price: item.fields.price,
          image: item.fields.productImage?.fields?.file?.url || '',
          discount: item.fields.discount,
          hoverImage: item.fields.productImage2?.fields?.file?.url || '',
          categories: item.fields.categories || [],
        }));

        // filter bestseller category only here
        const bestSeller = productData.filter((product) =>
          product.categories.includes('bestseller')
        );

        setProducts(bestSeller);
      })
      .catch(console.error);
  }, []);

  return (
    <div className="pb-4">
      <div className="sm:flex  sm:flex-row sm:justify-around  flex flex-row justify-between gap-[157px] mb-5   sm:gap-[65rem] ">
        <h1 className="font-semibold text-lg text-neutral-800 w-full ml-3 ">Best seller</h1>
        <p className="text-buttonHover cursor-pointer w-full " onClick={handleClick}>View all</p>
      </div>

      <div className="flex flex-col sm:flex-row justify-center gap-6 flex-wrap">
        {products.map((product) => (
          <div className="bg-neutral-200 rounded-lg p-4 w-full sm:w-80 md:w-72 lg:w-96" key={product.slug}>
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-[300px] object-cover cursor-pointer rounded-lg p-8 "
              onMouseOver={(e) => {
                if (product.hoverImage) {
                  (e.currentTarget as HTMLImageElement).src = product.hoverImage;
                }
              }}
              onMouseOut={(e) => {
                (e.currentTarget as HTMLImageElement).src = product.image;
              }}
            />
            <div className="flex justify-between items-center mt-2">
              <p className="ml-2 text-sm sm:text-base"> {product.name}</p>
              <p className="text-sm sm:text-base">${product.price}</p>
              <div className="flex justify-center items-center w-20 bg-customBackground rounded-tl-full h-14  mr-[-16px] mb-[-17px]">
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
  );
};

export default ProductComponent;
