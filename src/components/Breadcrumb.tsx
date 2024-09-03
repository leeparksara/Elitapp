/* this component will provide the user clear navigation while navigating in the website which enhances the ux*/
import React from 'react';
import {Link, useLocation} from 'react-router-dom';
import { IoIosArrowForward } from "react-icons/io";

// Mapping the routes to a human readable names, so instead of rendering best, it will render best seller
const routeNames :{[key:string]:string} ={
    "/" : "Home",
    "/best": " Best seller",
    "/contact": "Contact",
}


const Breadcrumb:React.FC = () => {
    // useLocation react hooks to get information about the URL
    const location = useLocation();
    const pathNames = location.pathname.split('/').filter((x) => x);

    return(
        <nav>
            <ol className='flex items-center gap-1 from-neutral-400 '>

                <li>
                    <Link to='/' >Home</Link>
                </li>
                <li>  <span> <IoIosArrowForward /></span></li>
                {pathNames.map((value, index)=>{
                    const to = `/${pathNames.slice(0, index + 1).join('/')}`;
                    const isLast = index === pathNames.length -1;
                    const label = routeNames[to] || value.charAt(0).toUpperCase() + value.slice(1);
                    return isLast ? (
                        <li key={to}>
                            <span>{label}</span>

                        </li>
                    ) : (
                        
                        <li key={to}>
                          
<Link to={to} > {label}</Link>
                        </li>
                    )

                })}
            </ol>
        </nav>
    )
}

export default Breadcrumb;