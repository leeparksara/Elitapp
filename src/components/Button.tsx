import React from 'react'

interface ButtonProps {
    text: string;
    onClick?: ()=>void;
    className: string;

}

const Button:React.FC<ButtonProps>= ({text, onClick, className}) =>{
    return(
        <>
        <button type='button' title="button" onClick={onClick} className={`bg-gradient-to-r from-customButton1 to-customButton2 hover:to-buttonHover px-6 py-2 rounded-3xl mx-20  ${className}`} >

{text}
        </button>
        </>
    )
}

export default Button;