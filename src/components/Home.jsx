import React from 'react'
import logo from '../assets/images/logo.webp'
import { useNavigate } from 'react-router-dom'

export const Home = () => {
    const navigate = useNavigate()

    return(
        <div className='flex flex-col justify-center p-5 mt-24 text-center'>
            <h1 className='text-4xl text-white mb-25'>
                Welcome!
            </h1>
            <div className='p-10 mx-auto'>
                <img src = {logo} alt='logo' className='w-36'/>
            </div>
            <div className='mx-auto'>
                <span className='text-xl text-white sm:text-2xl'>
                    Full Tracking Your Income And Expenses
                </span>
            </div>
            <button className='h-10 mx-auto mt-16 text-lg text-white rounded-b-lg w-36 bg-red-lite animate-bounce'
            onClick={()=> navigate('/expenses')}>
                Get Started
            </button>
        </div>
    )
}
