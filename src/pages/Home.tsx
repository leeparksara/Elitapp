import React from 'react'
import Hero from  '../components/Hero'
import NewCollectionComponent from '../components/NewCollection'
import ProductComponent from '../components/Productcomponent';
import {Product} from '../types'

interface HomeProps{
    addToCart: (product:Product) => void;
}

const Home:React.FC<HomeProps>= ({addToCart})=>{







    return(
        <div >

            <Hero/>
            <ProductComponent addToCart={addToCart } />
            <NewCollectionComponent/>
            
        </div>
    )
}
export default Home;