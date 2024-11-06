import React from 'react';


const Questions:React.FC = () => {
    return(
        <>
        <div className='flex flex-col justify-center items-center gap-9 mt-24 '>
            <h1 className='text-3xl font-semibold mb-6'>Questions?</h1>
            <div className='sm:flex justify-center sm:gap-20 flex flex-col gap-9 '>
            <div className='border-solid border-zinc-400 border-2 p-9 w-52 rounded-md text-center cursor-pointer transition-transform duration-200 ease-in-out hover:scale-90' >
Chat with us
            </div>
            <div  className='border-solid border-zinc-400 border-2 p-9 w-52 rounded-md text-center cursor-pointer transition-transform duration-200 ease-in-out hover:scale-90'>
                Contact Us
                <p>00-222-33</p>
            </div>
            <div  className='border-solid border-zinc-400 border-2 p-9 w-52 rounded-md text-center cursor-pointer transition-transform duration-200 ease-in-out hover:scale-90'>Find our store</div>
            </div>
           
        </div>
        </>
    )
}

export default Questions;