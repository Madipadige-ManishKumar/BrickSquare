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
        console.log("Fetching listing with id:", id);

        const res = await fetch(`/api/listings/list/${id}`, {
          method: "GET",
          credentials: "include",
        });

        const data = await res.json();
        console.log("Fetched Data:", data);

        setFormData(data);   // <-- IMPORTANT
      } catch (err) {
        console.log(err);
      }
    };

    fetchListing();
  }, [id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(`/api/listings/update/${id}`, {
        method:"POST",
        headers:{
            'Content-Type':'application/json',
        },
        credentials: "include",
        body:JSON.stringify(formData),
    });
    const data = await res.json();
    navigate('/profile');
    
  };

  return (
    <main className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-semibold text-center my-7">
        Update Listing
      </h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-10 mb-10">
        <div className="flex flex-col gap-6">
          <input
            type="text"
            placeholder="Name"
            className="border p-3 rounded-lg"
            id="name"
            value={formData.name || ""}
            onChange={handleChange}
            required
          />

          <textarea
            placeholder="Description"
            className="border p-3 rounded-lg"
            id="description"
            value={formData.description || ""}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            placeholder="Address"
            className="border p-3 rounded-lg"
            id="address"
            value={formData.address || ""}
            onChange={handleChange}
            required
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="flex flex-col">
              <label className="mb-1 font-medium">Bedrooms</label>
              <input
                type="number"
                id="bedrooms"
                className="p-3 border rounded-lg"
                value={formData.bedrooms || ""}
                onChange={handleChange}
                required
              />
            </div>

            <div className="flex flex-col">
              <label className="mb-1 font-medium">Bathrooms</label>
              <input
                type="number"
                id="bathrooms"
                className="p-3 border rounded-lg"
                value={formData.bathrooms || ""}
                onChange={handleChange}
                required
              />
            </div>

            <div className="flex flex-col">
              <label className="mb-1 font-medium">Regular Price</label>
              <input
                type="number"
                id="regularPrice"
                className="p-3 border rounded-lg"
                value={formData.regularPrice || ""}
                onChange={handleChange}
                required
              />
            </div>

            <div className="flex flex-col">
              <label className="mb-1 font-medium">Discounted Price</label>
              <input
                type="number"
                id="discountedPrice"
                className="p-3 border rounded-lg"
                value={formData.discountedPrice || ""}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        </div>
      </form>

      <button
        className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition text-lg font-medium"
        type="submit"
        onClick={handleSubmit}
      >
        Update Listing
      </button>
    </main>
  );
};

export default EachList;
