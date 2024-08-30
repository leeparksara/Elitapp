import React, {useState} from 'react'
import Hero from  '../components/Hero'
import Product from '../components/Product'
import NewCollectionComponent from '../components/NewCollection'

interface HomeProps{
    addToCart: ()=> void;
}

const Home:React.FC<HomeProps>= ({addToCart})=>{







    return(
        <div >

            <Hero/>
            <Product addToCart={addToCart } />
            <NewCollectionComponent/>
        </div>
    )
}
export default Home;