import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaBed, FaBath, FaParking, FaCouch, FaTag, FaArrowLeft } from "react-icons/fa";

const EachListing = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const res = await fetch(`/api/listings/show-list/${id}`);
        const data = await res.json();
        setData(data);
      } catch (error) {
        console.error("Error fetching listing:", error);
      }
    };
    fetchListing();
  }, [id]);

  if (!data || Object.keys(data).length === 0) {
    return (
      <h1 className="text-center mt-10 text-xl text-gray-500">Loading listing...</h1>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 p-6 flex justify-center items-start">
      <div
        className="max-w-3xl w-full bg-white/70 backdrop-blur-2xl rounded-2xl shadow-2xl border border-white/20 p-8 relative"
        style={{ minHeight: "650px" }}
      >
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 flex items-center gap-2 text-white bg-gradient-to-r from-green-500 to-emerald-600 px-4 py-2 rounded-full hover:opacity-90 transition-all"
        >
          <FaArrowLeft /> Back
        </button>

        {/* Listing Info */}
        <h1 className="text-3xl font-extrabold mb-4 text-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          {data.name}
        </h1>
        <p className="text-gray-800 mb-2">{data.description}</p>
        <p className="text-gray-600 mb-4">Address: {data.address}</p>

        {/* Features */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
          <div className="flex items-center gap-2 bg-green-100 text-green-700 rounded-xl p-2 justify-center">
            <FaBed /> {data.bedrooms} Beds
          </div>
          <div className="flex items-center gap-2 bg-blue-100 text-blue-700 rounded-xl p-2 justify-center">
            <FaBath /> {data.bathrooms} Baths
          </div>
          <div
            className={`flex items-center gap-2 rounded-xl p-2 justify-center ${
              data.furnished ? "bg-purple-100 text-purple-700" : "bg-gray-200 text-gray-500"
            }`}
          >
            <FaCouch /> {data.furnished ? "Furnished" : "Unfurnished"}
          </div>
          <div
            className={`flex items-center gap-2 rounded-xl p-2 justify-center ${
              data.parking ? "bg-yellow-100 text-yellow-700" : "bg-gray-200 text-gray-500"
            }`}
          >
            <FaParking /> {data.parking ? "Parking" : "No Parking"}
          </div>
        </div>

        {/* Type & Offer */}
        <div className="flex gap-4 mb-6">
          <span className="flex items-center gap-2 bg-gradient-to-r from-green-400 to-blue-500 text-white px-4 py-2 rounded-full font-semibold">
            <FaTag /> {data.type.toUpperCase()}
          </span>
          {data.offer && (
            <span className="flex items-center gap-2 bg-gradient-to-r from-pink-400 to-purple-500 text-white px-4 py-2 rounded-full font-semibold">
              OFFER
            </span>
          )}
        </div>

        {/* Pricing */}
        <div className="flex items-center justify-between text-2xl font-bold text-emerald-700 mb-6">
          <span>₹{data.regularPrice}</span>
          {data.discountedPrice && data.discountedPrice !== data.regularPrice && (
            <span className="text-lg text-red-500 line-through">
              ₹{data.discountedPrice}
            </span>
          )}
        </div>

        {/* User Info */}
        <div className="bg-gray-100 p-4 rounded-xl shadow-inner">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">User Info</h2>
          <p className="text-gray-800">Name: {data.user?.username}</p>
          <p className="text-gray-600">Email: {data.user?.email}</p>
        </div>
      </div>
    </div>
  );
};

export default EachListing;
