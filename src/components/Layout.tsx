//This component will be used to render the header accross all the pages in my application
import React from 'react';
import Header from './Header'; 
import Footer from './Footer'
// importing Outlet to render the content of the pages 
import { Outlet } from 'react-router-dom';
import {Product} from '../types'
import Delivery from './delivery';
// passing the cartValue as props 
interface layoutProps {
  cartValue :number;
  products: Product [];
}
const Layout:React.FC<layoutProps>= ({cartValue, products})=>{
  return(
    <div className='flex flex-col min-h-screen'>
      <Header products={products}   cartValue={cartValue}/>
      <main className='flex-1 container mx-auto px-4 py-8'>
        <Outlet/>
      </main>
      <Delivery/>
      <Footer/>
    </div>
  )

}
export default Layout;