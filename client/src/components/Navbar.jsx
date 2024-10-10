import React from 'react'
import {NavLink} from 'react-router-dom'
import { useSelector } from 'react-redux'

const Navbar = () => {
  const { currentUser } = useSelector((state) => state.user)
  return (
    <nav className='bg-zinc-300 text-black h-[70px] flex justify-between items-center md:px-[100px] px-[10px] gap-3
     shadow-md shadow-zinc-400 select-none'>
      <div className="logo">
       <NavLink to="/"><img className='md:h-[60px] h-[40px] cursor-pointer' src="Nlogo.png" alt="logo" /></NavLink>
      </div>
      <div className="search">
        <form className='bg-zinc-100 p-2 rounded flex justify-between items-center'>
          <input className='lg:w-[500px] w-[100px] focus:outline-none bg-transparent' type="text" placeholder="Search" />
          <button type='submit'>
            <i className="fa-solid fa-magnifying-glass text-zinc-600 cursor-pointer px-3 text-[17px]"></i>
          </button>
        </form>
      </div>
      <ul className='flex justify-between items-center gap-5 md:text-xl text-zinc-500'>
        <NavLink to="/"><li className='hover:text-black md:flex hidden'>Home</li></NavLink>
        <NavLink to="/about"><li className='hover:text-black md:flex hidden'>About</li></NavLink>
        <NavLink to='/profile'>
            {currentUser ? (
              <img
                className='rounded-full h-10 w-10 object-cover'
                src={currentUser.image}
                alt='profile'
              />
            ) : (
              <NavLink to="/sign-in"><li className='hover:text-black'>SignIn</li></NavLink>
            )}
          </NavLink>

      </ul>
    </nav>
  )
}

export default Navbar
