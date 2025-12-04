import React from 'react'
import {FaSearch} from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Header = () => {
    const user = useSelector(state => state.user.currentUser);
  return (
    <header className='bg-slate-200 shadow-md'>

        <div className='flex justify-between items-center max-w-6xl  mx-auto h-15'>
        <Link to='/' >
        <h1 className='text-sm font-bold sm:text-xl flex  flex-wrap'>
            <span className='text-slate-500'>
                Free
            </span>
            <span className='text-slate-700'>
                Broker
            </span>
        </h1>
        </Link>
        
        <ul className='flex gap-6 text-sm font-medium items-center'>
            <Link to='/'>
                <li className='hidden sm:inline text-slate-700 hover:underline'>Home</li>
            </Link>
            <Link to='/about'>
                <li className='hidden sm:inline text-slate-700 hover:underline'>About</li>
            </Link>
            {user ? (
                <Link to='/profile'>
                    <img src={user.avatar} alt="profile" className='w-8 h-8 rounded-full object-cover'/>
                </Link>
            ):
            <Link to='/sign-in'>
                <li className='  text-slate-700 hover:underline'>Sign-In</li>
            </Link>
            }
            
        </ul>
        </div>
    </header>
  )
}

export default Header