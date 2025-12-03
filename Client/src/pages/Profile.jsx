import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { deleteUserStart, deleteUserSuccess, deleteUserFailure, SignOutStart, SignOutSuccess, SignOutFailure} from '../redux/user/userSlice.js';
const Profile = () => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user)
  const [formData,setFormData] = useState({});
  const navigate  = useNavigate()
  const handleChange = (e) =>{
    setFormData(
      {
        ...formData,
        [e.target.id]:e.target.value,
      })
  }
  const handleDelete = async ()=>{
    try{
      dispatch(deleteUserStart());
      const res = await fetch(`/api/users/delete/${currentUser._id}`,{
      method:"DELETE",      
      }
      )
      const data = await res.json();
      if(data.success == false){
        dispatch(deleteUserFailure(data.message));
      }
      dispatch(deleteUserSuccess(data));
      navigate('/sign-in');
      
    }
    catch(err){
      dispatch(deleteUserFailure(err.message));
    }
  }

  const handleSignout = async ()=>{
    try{
      dispatch(SignOutStart()); 
      const res = await fetch('/api/auth/signout')
      const data = await res.json();
      if(data.success == false){
        dispatch(SignOutFailure(data.message));
      }
      dispatch(SignOutStart(data));
      navigate('/sign-in');

    }
    catch(err){
      dispatch(SignOutFailure(err.message)); 
    }
  }
  const handlesubmit = async (e)=>{
    
    e.preventDefault();
    const res  = await fetch(`/api/users/update/${currentUser._id}`,{
      method:"POST",
      headers:{
        'Content-Type':'application/json',
      },
      credentials: "include",
      body:JSON.stringify(formData),
    }
    )
    const data = await res.json();
    console.log(data);
    alert("Profile updated successfully");

  }
  return (
    <>
      {console.log(currentUser)}
      <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
      <form onSubmit={handlesubmit}>
        
      <img  src={currentUser.avatar} alt="Profile" className="w-32 h-32 rounded-full mx-auto mb-4" />    
      <input type="text" onChange={handleChange}  id="username" defaultValue={currentUser.username}  className="w-full p-2 border border-gray-300 rounded mb-4" />
      <input type="email" onChange={handleChange}  id="email" defaultValue={currentUser.email}  className="w-full p-2 border border-gray-300 rounded mb-4" />
      <input type="text" onChange={handleChange} id="password" className="w-full p-2 border border-gray-300 rounded mb-4"  />
      <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">Update Profile</button>
      </form>
      <div className='flex justify-between mt-5'>
        <span onClick={handleDelete} className='text-red-600'>delete account</span>
        <span  onClick={handleSignout} className='text-blue-600'>sign out</span>

      </div>
      
    </>
  )
}

export default Profile