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
        <div className='container mx-auto px-4' >

            <Hero/>
            <section className='my-8'>
            <ProductComponent addToCart={addToCart } />
            </section>
       <section className='my-8'>
       <NewCollectionComponent addToCart={addToCart}/>
       </section>
           
            
        </div>
    )
}
export default Home;