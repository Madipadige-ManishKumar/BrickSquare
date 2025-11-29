import React,{useState} from 'react'
import { Link,useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { signInStart,signInFailure,signInSuccess  } from '../redux/user/userSlice.js';

const SignIn = () => {
  const [formData,setFormData] = useState({});
  const {loading,error} = useSelector((state)=>state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleChange = (e)=>{
  setFormData(
    {
      ...formData,
      [e.target.id]:e.target.value,
    }
  )
  }
  const handleSubmit = async (e)=>{
    e.preventDefault();
    dispatch(signInStart())
    const res = await fetch('/api/auth/signin',{
      method:"POST",
      headers:{
        'Content-Type':'application/json',
      },
      body:JSON.stringify(formData),

    })
    try{
    const data = await res.json();
    if (data.success === false){
      dispatch(signInFailure(data.message));
      return;
    }
    dispatch(signInSuccess(data.user));
    navigate('/');
  }
  catch(err){
    dispatch(signInFailure(err.message));
  }
  }
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-bold'>Sign In</h1>
      <form  onSubmit={handleSubmit} action="" className='flex flex-col gap-4 '>
        <input type="email"  placeholder='Email'  className='border p-3 rounded-lg' id="email" onChange={handleChange} />
        <input type="password"  placeholder='password'  className='border p-3 rounded-lg' id="password" onChange={handleChange} />
        <button  disabled={loading} type='submit' className='bg-slate-700 text-gray-300 p-3 rounded-lg hover:opacity-90 disabled:opacity-80'>{loading ? "Loading..." : "Sign In"}</button>
      </form>
      <div>
        <p className='text-center mt-4'>Don't have an account? </p>
        <Link to={"/sign-up"}>
        <button className='bg-red-700 text-white-300 p-3 rounded-lg hover:opacity-90 disabled:opacity-80 w-full mt-2'>Sign Up</button>
        </Link>
      </div>
      {error && <p className='text-red-500 text-center mt-4'>{error}</p>}
    </div>

  )
}

export default SignIn