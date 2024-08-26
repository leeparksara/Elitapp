import React from 'react'
import Header from '../components/Header'
import Hero from  '../components/Hero'
import Product from '../components/Product'
const Home:React.FC = ()=>{
    return(
        <div >
            <Header/>
            <Hero/>
            <Product/>
        </div>
    )
}
export default Home;