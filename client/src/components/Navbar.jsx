import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Navbar = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState('')

  const navigate = useNavigate()

  const hundleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set('searchTerm', searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  }
  
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

  return (
    <nav className='bg-zinc-300 text-black h-[70px] flex justify-between items-center md:px-[100px] px-[10px] gap-3 shadow-md shadow-zinc-400 select-none'>
      <div className="logo">
        <NavLink to="/">
          <img className='md:h-[60px] h-[40px] cursor-pointer' src="Nlogo.png" alt="logo" />
        </NavLink>
      </div>
      <div className="search">
        <form onSubmit={hundleSubmit} className='bg-zinc-100 p-2 rounded flex justify-between items-center'>
          <input value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className='lg:w-[500px] w-[100px] focus:outline-none bg-transparent' type="text" placeholder="Search" />
          <button>
            <i className="fa-solid fa-magnifying-glass text-zinc-600 cursor-pointer px-3 text-[17px]"></i>
          </button>
        </form>
      </div>
      <ul className='flex justify-between items-center gap-5 md:text-xl text-zinc-500'>
        <li>
          <NavLink to="/" className='hover:text-black md:flex hidden'>Home</NavLink>
        </li>
        <li>
          <NavLink to="/about" className='hover:text-black md:flex hidden'>About</NavLink>
        </li>
        <li>
          {currentUser ? (
            <NavLink to="/profile">
              <img
                className='rounded-full h-10 w-10 object-cover'
                src={currentUser.image}
                alt='profile'
              />
            </NavLink>
          ) : (
            <NavLink to="/sign-in" className='hover:text-black'>Sign In</NavLink>
          )}
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;