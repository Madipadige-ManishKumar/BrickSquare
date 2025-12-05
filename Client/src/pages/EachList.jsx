import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

const EachList = () => {
  const { id } = useParams();
  const { currentUser } = useSelector((state) => state.user)
  const [formData, setFormData] = useState({});
  const navigate = useNavigate()

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const res = await fetch(`/api/listings/list/${id}`, {
          method: "GET",
          credentials: "include",
        });

        const data = await res.json();
        setFormData(data);   // <-- Fill form with fetched data
      } catch (err) {
        console.log(err);
      }
    };

    fetchListing();
  }, [id]);

  const handleChange = (e) => {
    const { id, type, checked, value } = e.target;
    setFormData({
      ...formData,
      [id]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { sale, rent, ...rest } = formData;
    // Determine type based on sale/rent
    if (sale && rent) rest.type = "sale and rent";
    else if (sale) rest.type = "sale";
    else if (rent) rest.type = "rent";
    else rest.type = "";

    const res = await fetch(`/api/listings/update/${id}`, {
        method:"POST",
        headers:{
            'Content-Type':'application/json',
        },
        credentials: "include",
        body: JSON.stringify(rest),
    });
    const data = await res.json();
    navigate('/profile');
  };

  return (
    <main className="max-w-5xl mx-auto p-4 sm:p-6">
      <h1 className="text-4xl font-extrabold text-center my-10 
        bg-gradient-to-r from-blue-600 to-purple-600 
        bg-clip-text text-transparent tracking-wide">
        Update Listing
      </h1>

      <div className="bg-white/70 backdrop-blur-2xl shadow-2xl rounded-2xl p-8 border border-white/20 transition-all hover:shadow-[0px_0px_40px_rgba(0,0,0,0.15)]">
        <form onSubmit={handleSubmit} className="flex flex-col gap-8">

          {/* Basic Inputs */}
          <div className="flex flex-col gap-6">

            <input
              type="text"
              placeholder="Listing Name"
              className="p-3 rounded-xl border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              id="name"
              value={formData.name || ""}
              onChange={handleChange}
              required
            />

            <textarea
              placeholder="Description"
              className="p-3 rounded-xl border border-gray-300 shadow-sm h-40 resize-none focus:ring-2 focus:ring-purple-500 outline-none transition-all"
              id="description"
              value={formData.description || ""}
              onChange={handleChange}
              required
            />

            <input
              type="text"
              placeholder="Address"
              className="p-3 rounded-xl border border-gray-300 shadow-sm focus:ring-2 focus:ring-emerald-600 outline-none transition-all"
              id="address"
              value={formData.address || ""}
              onChange={handleChange}
              required
            />

            {/* Checkboxes */}
            <div className="flex flex-wrap gap-4 mt-2">
              {[
                { id: "sale", label: "Sell" },
                { id: "rent", label: "Rent" },
                { id: "parking", label: "Parking Spot" },
                { id: "furnished", label: "Furnished" },
                { id: "offer", label: "Offer" },
              ].map((item) => (
                <label key={item.id} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    className="w-5 h-5"
                    id={item.id}
                    checked={formData[item.id] || false}
                    onChange={handleChange}
                  />
                  <span>{item.label}</span>
                </label>
              ))}
            </div>

            {/* Grid Inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

              <div className="flex flex-col">
                <label className="mb-2 font-semibold text-gray-700">Bedrooms</label>
                <input
                  type="number"
                  id="bedrooms"
                  className="p-3 border rounded-xl shadow-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                  value={formData.bedrooms || 1}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="flex flex-col">
                <label className="mb-2 font-semibold text-gray-700">Bathrooms</label>
                <input
                  type="number"
                  id="bathrooms"
                  className="p-3 border rounded-xl shadow-sm focus:ring-2 focus:ring-pink-500 outline-none transition-all"
                  value={formData.bathrooms || 1}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="flex flex-col">
                <label className="mb-2 font-semibold text-gray-700">Regular Price</label>
                <input
                  type="number"
                  id="regularPrice"
                  className="p-3 border rounded-xl shadow-sm focus:ring-2 focus:ring-green-500 outline-none transition-all"
                  value={formData.regularPrice || 0}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="flex flex-col">
                <label className="mb-2 font-semibold text-gray-700">Discounted Price</label>
                <input
                  type="number"
                  id="discountedPrice"
                  className="p-3 border rounded-xl shadow-sm focus:ring-2 focus:ring-yellow-500 outline-none transition-all"
                  value={formData.discountedPrice || 0}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

          </div>

          {/* Submit Button */}
          <button
            className="w-full py-4 rounded-xl text-white text-lg font-semibold bg-gradient-to-r from-green-500 to-emerald-600 hover:opacity-90 transition-all shadow-xl"
            type="submit"
          >
            Update Listing
          </button>
        </form>
      </div>
    </main>
  );
};

export default EachList;
