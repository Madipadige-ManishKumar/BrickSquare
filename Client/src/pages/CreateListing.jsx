import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const CreateListing = () => {
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  console.log("Current User in CreateListing:", currentUser._id);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    address: "",
    sale: false,
    rent: false,
    type: "",
    parking: false,
    furnished: false,
    offer: false,
    bedrooms: 1,
    bathrooms: 1,
    regularPrice: 0,
    discountedPrice: 0,
    userRef: currentUser ? currentUser._id : "",
  });

  // General input handler
  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [id]: type === "checkbox" ? checked : value,
    }));
  };

  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    const {sale,rent,...rest} = formData;
    if(rent)
    {
        rest.type = "rent";
    }
    else if(sale)
    {
        rest.type = "sale";
    }
    else if(sale && rent)
    {
        rest.type ="rent and sale"
    }
    const res = await fetch('/api/listings/create',{
        method:"POST",
        headers:{
            'Content-Type':'application/json',
        },
        credentials: "include",
        body:JSON.stringify(rest),
    });
    const data = await res.json();
    navigate('/profile');
    
  };

  return (
    <main className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-semibold text-center my-7">
        Create Listing
      </h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-10 mb-10">
        {/* LEFT SECTION ONLY */}
        <div className="flex flex-col gap-6">
          {/* Name */}
          <input
            type="text"
            placeholder="Name"
            className="border p-3 rounded-lg"
            id="name"
            value={formData.name}
            onChange={handleChange}
            maxLength="62"
            minLength="10"
            required
          />

          {/* Description */}
          <textarea
            placeholder="Description"
            className="border p-3 rounded-lg"
            id="description"
            value={formData.description}
            onChange={handleChange}
            required
          />

          {/* Address */}
          <input
            type="text"
            placeholder="Address"
            className="border p-3 rounded-lg"
            id="address"
            value={formData.address}
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
                  checked={formData[item.id]}
                  onChange={handleChange}
                />
                <span>{item.label}</span>
              </label>
            ))}
          </div>

          {/* Number Inputs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Bedrooms */}
            <div className="flex flex-col">
              <label htmlFor="bedrooms" className="mb-1 font-medium">
                Bedrooms
              </label>
              <input
                type="number"
                id="bedrooms"
                min="1"
                max="10"
                required
                className="p-3 border rounded-lg"
                value={formData.bedrooms}
                onChange={handleChange}
              />
            </div>

            {/* Bathrooms */}
            <div className="flex flex-col">
              <label htmlFor="bathrooms" className="mb-1 font-medium">
                Bathrooms
              </label>
              <input
                type="number"
                id="bathrooms"
                min="1"
                max="10"
                required
                className="p-3 border rounded-lg"
                value={formData.bathrooms}
                onChange={handleChange}
              />
            </div>

            {/* Regular Price */}
            <div className="flex flex-col">
              <label htmlFor="regularPrice" className="mb-1 font-medium">
                Regular Price
              </label>
              <input
                type="number"
                id="regularPrice"
                required
                className="p-3 border rounded-lg"
                value={formData.regularPrice}
                onChange={handleChange}
              />
            </div>

            {/* Discounted Price */}
            <div className="flex flex-col">
              <label htmlFor="discountedPrice" className="mb-1 font-medium">
                Discounted Price
              </label>
              <input
                type="number"
                id="discountedPrice"
                required
                className="p-3 border rounded-lg"
                value={formData.discountedPrice}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        {/* ----------------------------- */}
        {/* RIGHT SECTION (IMAGE UPLOAD)  */}
        {/* ----------- COMMENTED -------- */}
        {/*
        <div className="flex flex-col gap-4 flex-1 p-5 border rounded-xl bg-white shadow-sm">
          <p className="font-semibold">
            Images:
            <span className="font-normal text-gray-600"> (max 6)</span>
          </p>

          <input
            type="file"
            id="images"
            accept="image/*"
            multiple
            className="border p-2 rounded-lg"
          />
        </div>
        */}
        {/* -------------------------------- */}
      </form>

      {/* SUBMIT BUTTON */}
      <button
        className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition text-lg font-medium"
        type="submit"
        onClick={handleSubmit}
      >
        Create Listing
      </button>
    </main>
  );
};

export default CreateListing;
