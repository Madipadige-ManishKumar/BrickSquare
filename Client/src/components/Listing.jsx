import React from "react";
import { FaBed, FaBath, FaParking, FaCouch, FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import EachList from "../pages/EachList";


const Profile = ({ data }) => {
  const navigate = useNavigate();

  const handleEdit = async(id) => {
    navigate(`/edit-listing/${id}`);
  };

  const handleDelete = async (id) => {
  try {
    const res = await fetch(`/api/listings/delete/${id}`, {
      method: "DELETE",
      credentials: "include",
    });

    if (!res.ok) {
      throw new Error("Failed to delete listing");
    }

    const data = await res.json();
    console.log("Delete response:", data);

    // Option 1: Navigate after delete
    navigate("/profile");

    // Option 2 (better UX): Remove from state instead of reloading page
    // setData(prev => prev.filter(listing => listing._id !== id));

  } catch (error) {
    console.error("Error deleting listing:", error);
    alert("Failed to delete listing");
  }
};


  return (

    

<div className="min-h-screen bg-gray-50 p-6">
  <h1 className="text-4xl sm:text-5xl font-extrabold text-center text-green-700 mb-12
      bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500
      bg-clip-text text-transparent animate-gradient-x"
  >
    Your Listings
  </h1>

  {data.length === 0 ? (
    <p className="text-center text-blue-500 text-lg">No listings available.</p>
  ) : (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-10 justify-items-center">
      {data.map((listing) => (
        <div
          key={listing._id}
          className="
            relative
            w-full max-w-sm  /* responsive max width */
            bg-white/40 backdrop-blur-xl
            rounded-3xl shadow-2xl
            p-6
            overflow-hidden
            hover:scale-105 hover:shadow-[0_15px_50px_rgba(0,0,0,0.25)]
            transition-all duration-300
          "
        >
          {/* Top Header / Image Simulation */}
          <div className="h-48 w-full rounded-2xl bg-gradient-to-br from-green-400 to-blue-400 flex items-center justify-center text-5xl font-extrabold text-white mb-5 shadow-inner">
            {listing.name[0].toUpperCase()}
          </div>

          {/* Description */}
          <p className="text-gray-700 font-medium mb-2 line-clamp-3">{listing.description}</p>
          <p className="text-gray-500 text-sm mb-4">{listing.address}</p>

          {/* Price and Features */}
          <div className="flex justify-between items-center mb-4">
            <span className="font-bold text-lg text-green-800">
              ₹{listing.regularPrice}
            </span>
            <div className="flex gap-4 text-gray-700 text-sm">
              <div className="flex items-center gap-1"><FaBed /> {listing.bedrooms}</div>
              <div className="flex items-center gap-1"><FaBath /> {listing.bathrooms}</div>
            </div>
          </div>

          {/* Badges */}
          <div className="flex gap-2 flex-wrap mb-4">
            {listing.furnished && (
              <span className="bg-blue-500/80 text-white px-3 py-1 rounded-full text-xs flex items-center gap-1 shadow-sm">
                <FaCouch /> Furnished
              </span>
            )}
            {listing.parking && (
              <span className="bg-green-600/80 text-white px-3 py-1 rounded-full text-xs flex items-center gap-1 shadow-sm">
                <FaParking /> Parking
              </span>
            )}
          </div>

          {/* Action Buttons */}
          <div className="absolute top-4 right-4 flex gap-2">
            <button
              onClick={() => handleEdit(listing._id)}
              className="bg-green-700 hover:bg-green-600 text-white px-3 py-1 rounded-full flex items-center gap-1 text-sm shadow-md transition-all"
            >
              <FaEdit /> Edit
            </button>
            <button
              onClick={() => handleDelete(listing._id)}
              className="bg-red-600 hover:bg-red-500 text-white px-3 py-1 rounded-full flex items-center gap-1 text-sm shadow-md transition-all"
            >
              <FaTrash /> Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  )}
</div>






  );
};

export default Profile;
