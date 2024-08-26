import React, {useState} from 'react'
import Header from '../components/Header'
import Hero from  '../components/Hero'
import Product from '../components/Product'
const Home:React.FC = ()=>{

const [cartValue, setCartValue] = useState(0);

const addToCart = () => {
    setCartValue(cartValue +1);
};



    return(
        <div >
            <Header cartValue={cartValue} />
            <Hero/>
            <Product addToCart={addToCart } />
        </div>
    )
}
export default Home;