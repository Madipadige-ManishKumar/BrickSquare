import React,{useState} from 'react'
import { Link,useNavigate } from 'react-router-dom'
import OAuth from '../components/OAuth';

const SignUp = () => {
  const [formData,setFormData] = useState({});
  const [error,setError] = useState(null);
  const [loading,setLoading] = useState(false);
  const navigate = useNavigate();
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
    setLoading(true);
    const res = await fetch('/api/auth/signup',{
      method:"POST",
      headers:{
        'Content-Type':'application/json',
      },
      body:JSON.stringify(formData),

    })
    try{
    const data = await res.json();
    if (data.success === false){
      setError(data.message);
      setLoading(false);
      return;
    }
    setLoading(false);
    setError(null);
    navigate('/sign-in');
  }
  catch(err){
    setError(err.message);
    setLoading(false);
  }
  }
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-bold'>Sign Up</h1>
      <form  onSubmit={handleSubmit} action="" className='flex flex-col gap-4 '>
        <input type="text"  placeholder='Username'  className='border p-3 rounded-lg' id="username" onChange={handleChange} />
        <input type="email"  placeholder='Email'  className='border p-3 rounded-lg' id="email" onChange={handleChange} />
        <input type="password"  placeholder='password'  className='border p-3 rounded-lg' id="password" onChange={handleChange} />
        <button  disabled={loading} type='submit' className='bg-slate-700 text-gray-300 p-3 rounded-lg hover:opacity-90 disabled:opacity-80'>{loading ? "Loading..." : "Sign Up"}</button>
        <OAuth />
      </form>
      <div>
        <p className='text-center mt-4'>Already have an account? </p>
        <Link to={"/sign-in"}>
        <button className='bg-red-700 text-white-300 p-3 rounded-lg hover:opacity-90 disabled:opacity-80 w-full mt-2'>Sign In</button>
        </Link>
      </div>
      {error && <p className='text-red-500 text-center mt-4'>{error}</p>}
    </div>

  )
}

export default SignUp