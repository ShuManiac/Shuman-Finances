import React from 'react'
import { Link, useLocation } from 'react-router-dom'
export const Header = () => {

    const location = useLocation().pathname;
    

    return (
        <header>
            <nav className='pt-3 pr-5 text-lg '>
                <ul className='flex justify-start max-w-screen-xl p-5 ml-5 text-zinc-500 gap-x-12'>
                    <li>
                        <Link to='/' className={location === '/' ? 'text-white' : null}>Home</Link>
                    </li>
                    <li>
                        <Link to='/expenses' className={location === '/expenses' ? 'text-white' : null}>Expenses</Link>
                    </li>
                    <li>
                        <Link to='/incomes' className={location === '/incomes' ? 'text-white' : null}>Incomes</Link>
                    </li>
                </ul>
            </nav>
        </header>
) 
}
