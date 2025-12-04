import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import { deleteUserStart, deleteUserSuccess, deleteUserFailure, SignOutStart, SignOutSuccess, SignOutFailure, updateUserStart, updateUserSuccess, updateUserFailure} from '../redux/user/userSlice.js';
import { useEffect } from 'react';
import Listing from '../components/Listing.jsx';
const Profile = () => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user)
  const [formData,setFormData] = useState({});
  const [listings,setListings] = useState([]);
  const navigate  = useNavigate()
  useEffect(()=>{
    const fetchListings = async () => {
      try {
        const res = await fetch('/api/listings/show/'+currentUser._id);
        const data = await res.json();
        setListings(data);
      } catch (error) {
        console.error("Error fetching listings:", error);
      }
    };
    fetchListings();
  },[])
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
      dispatch(SignOutSuccess(data));
      navigate('/sign-in');

    }
    catch(err){
      dispatch(SignOutFailure(err.message)); 
    }
  }
  const handlesubmit = async (e)=>{
    try{
      e.preventDefault();
      dispatch(updateUserStart());
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
      dispatch(updateUserSuccess(data));
      console.log("Updated user:", data);
      navigate('/profile');
    }
    catch(err){
      dispatch(updateUserFailure(err.message));
    }

  }
  return (
    <>
      <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
      <form onSubmit={handlesubmit}>
        
      <img  src={currentUser.avatar} alt="Profile" className="w-32 h-32 rounded-full mx-auto mb-4" />    
      <input type="text" onChange={handleChange}  id="username" defaultValue={currentUser.username}  className="w-full p-2 border border-gray-300 rounded mb-4" />
      <input type="email" onChange={handleChange}  id="email" defaultValue={currentUser.email}  className="w-full p-2 border border-gray-300 rounded mb-4" />
      <input type="text" onChange={handleChange} id="password" className="w-full p-2 border border-gray-300 rounded mb-4"  />
      <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">Update Profile</button>
      <Link to={'/create-listing'} className="w-full block text-center bg-green-500 text-white p-2 rounded mt-4">Create Listing</Link>
      </form>
     
      <div className='flex justify-between mt-5'>
        <span onClick={handleDelete} className='text-red-600'>delete account</span>
        <span  onClick={handleSignout} className='text-blue-600'>sign out</span>

      </div>
      <div>
        <div className='font-semibold items-center'>Listings</div>
        {listings.length > 0 ? ( <Listing data={listings}/> ) : <div>No listings found</div>}
      </div>
      
    </>
  )
}

export default Profile