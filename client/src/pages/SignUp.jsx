import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import OAuth from '../components/OAuth';

const SignUp = () => {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        setLoading(false);
        setError(data.message);
        return;
      }
      setLoading(false);
      setError(null);
      navigate('/sign-in');
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };
  return (
    <div className='container flex justify-center items-center'>
      <div className="item max-w-lg flex flex-col justify-center items-center gap-5 mt-[50px]">
        <div className="heading my-5">
          <h1 className='text-3xl font-bold italic'>Sign Up</h1>
        </div>
        <form onSubmit={handleSubmit} className='flex flex-col gap-5'>
          <input onChange={handleChange} className='p-2 px-4 rounded focus:outline-none' type="text" placeholder="username" id='username' />
          <input onChange={handleChange} className='p-2 px-4 rounded focus:outline-none' type="email" placeholder="email" id='email' />
          <input onChange={handleChange} className='p-2 px-4 rounded focus:outline-none' type="password" placeholder="Password" id='password' />
          <button disabled={loading} className='p-2 px-4 rounded bg-zinc-800 text-white disabled:bg-zinc-300 hover:bg-zinc-900 uppercase'>
            {loading ? 'Loading...' : 'Sign Up'}
            </button>
          <OAuth />
        </form>
        <p className='text-sm flex gap-3'>
          <span className='hover:underline'>Have an account?</span> <NavLink to={'/sign-in'}>Sign In</NavLink></p>
      </div>
      {error && <p className='text-red-500'>{error}</p>}
    </div>
  )
}

export default SignUp
