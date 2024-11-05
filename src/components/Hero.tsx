import React from 'react';
import heroProduct from '../assets/863749-removebg-preview.png';
import { Link } from 'react-router-dom';
import { GoArrowUpRight } from "react-icons/go";
import { RiDiscountPercentFill } from "react-icons/ri";

const Hero: React.FC = () => {
  return (
    <div className="flex flex-col-reverse sm:flex-row-reverse justify-center sm:gap-32 gap-4 items-center overflow-hidden ">
      <div className="flex flex-col items-center relative sm:flex-row sm:items-start ">
        <img src={heroProduct} alt="hero" className="w-full sm:w-auto" />
        <RiDiscountPercentFill className="absolute text-3xl sm:text-5xl text-neutral-500 top-[340px]  sm:top-16 right-[80px] sm:right-[190px]" />
        <div className="flex flex-col border-solid border-2 border-gray-200 shadow-lg px-5 py-4 relative sm:top-[95px] right-0 sm:right-9 h-32 w-40 items-center">
          <div className="flex flex-col ">
            <h2 className="text-lg sm:text-xl text-neutral-600">Carly chair</h2>
            <h4 className="text-stone-500">15% discount</h4>
          </div>
          <div className="flex flex-row top-4 relative gap-2">
            <Link className="underline underline-offset-4" to="/HeroProductPage">Shop now</Link>
            <GoArrowUpRight />
          </div>
        </div>
      </div>

      <div className="flex flex-col mt-10 sm:mt-32 text-start sm:items-start ">
        <h3 className="text-4xl sm:text-5xl text-neutral-600 mb-3">Elite</h3>
        <p className="text-3xl sm:text-6xl text-neutral-600 mb-5">Your Home</p>
        <p className="text-lg sm:text-xl text-start sm:text-left w-72 sm:w-96 text-neutral-600">
          Our furniture is an excellent symbol to upgrade your home. Shop from us and elite your taste.
        </p>
      </div>
    </div>
  );
}

export default Hero;
