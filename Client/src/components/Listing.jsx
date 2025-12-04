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
    <div className="min-h-screen bg-white p-6">
      <h1 className="text-3xl font-bold text-center text-green-700 mb-8">
        Your Listings
      </h1>

      {data.length === 0 ? (
        <p className="text-center text-blue-500">No listings available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.map((listing) => (
            <div
              key={listing._id}
              className="bg-gradient-to-br from-green-100 to-blue-100 text-green-800 rounded-2xl shadow-lg p-6 hover:scale-105 transition-transform duration-300 relative"
            >
              {/* Colored header as visual replacement for image */}
              <div className="h-40 bg-green-200 rounded-xl flex items-center justify-center text-3xl font-bold text-white mb-4">
                {listing.name[0].toUpperCase()}
              </div>

              <p className="mb-2">{listing.description}</p>
              <p className="text-sm mb-4">{listing.address}</p>

              <div className="flex justify-between items-center mb-4">
                <span className="font-bold text-green-700 text-lg">
                  ₹{listing.regularPrice}
                </span>
                <div className="flex gap-4 text-green-800 text-sm">
                  <div className="flex items-center gap-1">
                    <FaBed /> {listing.bedrooms}
                  </div>
                  <div className="flex items-center gap-1">
                    <FaBath /> {listing.bathrooms}
                  </div>
                </div>
              </div>

              <div className="flex gap-2 flex-wrap mb-4">
                {listing.furnished && (
                  <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-xs flex items-center gap-1">
                    <FaCouch /> Furnished
                  </span>
                )}
                {listing.parking && (
                  <span className="bg-green-600 text-white px-3 py-1 rounded-full text-xs flex items-center gap-1">
                    <FaParking /> Parking
                  </span>
                )}
              </div>

              {/* Edit Button */}
              <button
                onClick={() => handleEdit(listing._id)}
                className="absolute top-4 right-4 bg-green-700 hover:bg-green-600 text-white px-3 py-1 rounded-full flex items-center gap-1 text-sm"
              >
                <FaEdit /> Edit
              </button>

              {/* Delete Button */}
              <button
                onClick={() => handleDelete(listing._id)}
                className="absolute top-4 right-20 bg-red-600 hover:bg-red-500 text-white px-3 py-1 rounded-full flex items-center gap-1 text-sm"
              >
                <FaTrash /> Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Profile;
