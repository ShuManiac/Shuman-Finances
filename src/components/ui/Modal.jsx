import React, { useEffect } from 'react'

export const Modal = ({ children, setIsOpen, isOpen, title}) => {

    useEffect(() => {
        if(isOpen){
            document.body.style.overflow = 'hidden';
        }
        return() => {
            document.body.style.overflow = 'unset';
        };
    },[isOpen]);

  return (
    <div className="fixed top-0 left-0 z-50 flex items-center justify-center w-full h-full bg-black/50">
        <div className="relative flex flex-col w-11/12 max-w-xl sm:w-3/4 bg-white/95 rounded-2xl h-5/12">
            <h1 className="mt-6 text-2xl text-center text-black">{title}</h1>
            <div
                className="absolute z-50 text-3xl font-bold text-black cursor-pointer right-2"
                onClick = {() => setIsOpen(false)}
            >
                &times;
            </div>
            {children}
        </div>
    </div>
  )
}
