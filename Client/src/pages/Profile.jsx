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
  },[currentUser?._id])
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

 <h1 className="text-4xl font-bold text-center mt-10 mb-8 bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text">
  
</h1>

    <div className="max-w-6xl mx-auto px-4 py-10 grid grid-cols-1 lg:grid-cols-3 gap-8">

  {/* LEFT SIDE — PROFILE (Sticky) */}
  <div className="lg:col-span-1 h-fit sticky top-5">
    <h1 className="text-4xl font-bold text-center mb-6 bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text">
      Profile
    </h1>

    <div className="p-6 rounded-2xl bg-white/40 backdrop-blur-lg shadow-xl border border-white/50">
      <form onSubmit={handlesubmit} className="space-y-6">

        {/* PROFILE IMAGE */}
        <div className="flex flex-col items-center">
          <img
            src={currentUser.avatar}
            alt="Profile"
            className="w-32 h-32 rounded-full shadow-md ring-4 ring-white/60 object-cover"
          />
          <p className="mt-3 text-gray-700">
            Hello, <span className="font-semibold">{currentUser.username}</span>
          </p>
        </div>

        {/* INPUT FIELDS */}
        <div className="space-y-4">
          <input
            type="text"
            id="username"
            defaultValue={currentUser.username}
            onChange={handleChange}
            className="w-full p-3 rounded-xl border border-gray-300 bg-white/70 shadow-sm focus:ring-2 focus:ring-blue-400 outline-none"
          />

          <input
            type="email"
            id="email"
            defaultValue={currentUser.email}
            onChange={handleChange}
            className="w-full p-3 rounded-xl border border-gray-300 bg-white/70 shadow-sm focus:ring-2 focus:ring-blue-400 outline-none"
          />

          <input
            type="text"
            id="password"
            placeholder="New Password"
            onChange={handleChange}
            className="w-full p-3 rounded-xl border border-gray-300 bg-white/70 shadow-sm focus:ring-2 focus:ring-blue-400 outline-none"
          />
        </div>

        {/* BUTTONS */}
        <button
          type="submit"
          className="w-full py-3 text-white font-semibold rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg hover:scale-[1.02] transition-all"
        >
          Update Profile
        </button>

        <Link
          to="/create-listing"
          className="block w-full text-center py-3 text-white font-semibold rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 shadow-lg hover:scale-[1.02] transition-all"
        >
          Create Listing
        </Link>
      </form>

      {/* ACCOUNT ACTIONS */}
      <div className="flex justify-between mt-6 text-sm font-medium">
        <span
          onClick={handleDelete}
          className="text-red-600 cursor-pointer hover:underline"
        >
          Delete Account
        </span>

        <span
          onClick={handleSignout}
          className="text-blue-600 cursor-pointer hover:underline"
        >
          Sign Out
        </span>
      </div>
    </div>
  </div>

  {/* RIGHT SIDE — LISTINGS */}
  <div className="lg:col-span-2">
    <h2 className="text-2xl font-semibold mb-4">Your Listings</h2>

    {listings.length > 0 ? (
      <Listing data={listings} />
    ) : (
      <div className="text-gray-500">No listings found.</div>
    )}
  </div>

</div>



    </>
      
  )
}

export default Profile