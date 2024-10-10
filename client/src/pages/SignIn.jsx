import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signInStart, signInSuccess, signInFailure } from '../redux/user/userSlice';
import OAuth from '../components/OAuth';

const signIn = () => {

  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        dispatch(signInFailure(data.message));
        return;
      }
      dispatch(signInSuccess(data));
      navigate('/');
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };

  return (
    <div className='container flex justify-center items-center'>
      <div className="item max-w-lg flex flex-col justify-center items-center gap-5 mt-[100px]">
        <div className="heading my-5">
          <h1 className='text-3xl font-bold italic'>Sign In</h1>
        </div>
        <form onSubmit={handleSubmit} className='flex flex-col gap-5'>
          <input onChange={handleChange} className='p-2 px-4 rounded focus:outline-none' type="email" placeholder="email" id='email' />
          <input onChange={handleChange} className='p-2 px-4 rounded focus:outline-none' type="password" placeholder="Password" id='password' />
          <button disabled={loading} className='p-2 px-4 rounded bg-zinc-800 text-white hover:bg-zinc-900 disabled:bg-zinc-300 uppercase'>
            {loading ? 'loading...' : 'Sign In'}
          </button>
          <OAuth />
        </form>
        <p className='text-sm flex gap-3'><span className='hover:underline'>Don't have an account?</span>
         <NavLink to={'/sign-up'}>Sign Up</NavLink></p>
      </div>
      {error && <p className='text-red-500 mt-5'>{error}</p>}
    </div>
  )
}

export default signIn
