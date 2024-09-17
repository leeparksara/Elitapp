//This component will be used to render the header accross all the pages in my application
import React from 'react';
import Header from './Header'; 
import Footer from './Footer'
// importing Outlet to render the content of the pages 
import { Outlet } from 'react-router-dom';
import {Product} from '../types'
// passing the cartValue as props 
interface layoutProps {
  cartValue :number;
  products: Product [];
}
const Layout:React.FC<layoutProps>= ({cartValue, products})=>{
  return(
    <div>
      <Header products={products}   cartValue={cartValue}/>
      <main>
        <Outlet/>
      </main>
      <Footer/>
    </div>
  )

}
export default Layout;