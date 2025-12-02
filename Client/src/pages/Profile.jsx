import React from 'react'
import { useSelector } from 'react-redux'
const Profile = () => {
  const { currentUser } = useSelector((state) => state.user)

  return (
    <>
    
      <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
      <form >
        
      <img  src={currentUser.avatar} alt="Profile" className="w-32 h-32 rounded-full mx-auto mb-4" />    
      <input type="text" value={currentUser.username} readOnly className="w-full p-2 border border-gray-300 rounded mb-4" />
      <input type="email" value={currentUser.email} readOnly className="w-full p-2 border border-gray-300 rounded mb-4" />
      <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">Update Profile</button>
      </form>
      <div className='flex justify-between mt-5'>
        <span className='text-red-600'>delete account</span>
        <span className='text-blue-600'>sign out</span>

      </div>
      
    </>
  )
}

export default Profile