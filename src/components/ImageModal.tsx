import React from 'react';

interface ModalProps{
    image:string;
    onClose:() => void;
    
}


const ImageModal:React.FC<ModalProps>=({image, onClose})=>{
    
    return (
        <>
        <div className=" fixed inset-0  flex justify-center items-center bg-black bg-opacity-40 ">
        <button className='absolute top-20 right-20 text-white p-1 bg-zinc-700 text-xl rounded-full w-[4rem] h-[3.5rem]' onClick={onClose} type='button' >
x
    </button>

<div className='relative'>
    
    <img src={image} alt='product' className='w-[28rem] h-[35rem] max-w-3xl'/>
</div>
        </div>
        </>
    )
}

export default ImageModal;