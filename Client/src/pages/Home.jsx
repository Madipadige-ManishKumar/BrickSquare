import React, { useEffect, useState } from "react";

const Home = () => {
  const [listings, setListings] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    type: "",       // rent or sale
    furnished: false,
    parking: false,
    bedrooms: 1,
    bathrooms: 1,
    offer: false,
  });

  // Fetch all listings from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/listings/home", {
          method: "GET",
        });
        const data = await res.json();
        setListings(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  // Handle filter changes
  const handleFilterChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFilters((prev) => ({
      ...prev,
      [id]: type === "checkbox" ? checked : value,
    }));
  };

  // Filter listings based on search term and filters
  const filteredListings = listings.filter((listing) => {
    return (
      listing.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filters.type ? listing.type === filters.type : true) &&
      (filters.furnished ? listing.furnished === filters.furnished : true) &&
      (filters.parking ? listing.parking === filters.parking : true) &&
      (filters.offer ? listing.offer === filters.offer : true) &&
      listing.bedrooms >= filters.bedrooms &&
      listing.bathrooms >= filters.bathrooms
    );
  });

  return (
    <div className="flex max-w-6xl mx-auto p-4 gap-6">
      {/* Left Section - Search + Filters */}
      <div className="w-1/3 p-4 border rounded-lg space-y-4 shadow-sm">
        <h2 className="text-xl font-semibold mb-2">Search & Filters</h2>

        {/* Search */}
        <input
          type="text"
          placeholder="Search by name..."
          className="w-full border p-2 rounded-lg"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {/* Type */}
        <div className="flex flex-col gap-2">
          <label>Type:</label>
          <select
            id="type"
            value={filters.type}
            onChange={handleFilterChange}
            className="border p-2 rounded-lg"
          >
            <option value="">Any</option>
            <option value="rent">Rent</option>
            <option value="sale">Sale</option>
          </select>
        </div>

        {/* Bedrooms */}
        <div className="flex flex-col gap-2">
          <label>Bedrooms:</label>
          <input
            type="number"
            id="bedrooms"
            min="1"
            value={filters.bedrooms}
            onChange={handleFilterChange}
            className="border p-2 rounded-lg"
          />
        </div>

        {/* Bathrooms */}
        <div className="flex flex-col gap-2">
          <label>Bathrooms:</label>
          <input
            type="number"
            id="bathrooms"
            min="1"
            value={filters.bathrooms}
            onChange={handleFilterChange}
            className="border p-2 rounded-lg"
          />
        </div>

        {/* Checkboxes */}
        <div className="flex flex-col gap-2">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              id="furnished"
              checked={filters.furnished}
              onChange={handleFilterChange}
            />
            Furnished
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              id="parking"
              checked={filters.parking}
              onChange={handleFilterChange}
            />
            Parking
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              id="offer"
              checked={filters.offer}
              onChange={handleFilterChange}
            />
            Offer
          </label>
        </div>
      </div>

      {/* Right Section - Listings */}
      <div className="w-2/3 grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredListings.length > 0 ? (
          filteredListings.map((listing) => (
            <div
              key={listing._id}
              className="border p-4 rounded-lg shadow hover:shadow-lg transition"
            >
              <h3 className="font-semibold text-lg">{listing.name}</h3>
              <p className="text-gray-600">{listing.description}</p>
              <p className="mt-2">
                <span className="font-medium">Address:</span> {listing.address}
              </p>
              <p>
                <span className="font-medium">Price:</span> {listing.regularPrice}
              </p>
              <p>
                <span className="font-medium">Bedrooms:</span> {listing.bedrooms} |{" "}
                <span className="font-medium">Bathrooms:</span> {listing.bathrooms}
              </p>
              <p>
                <span className="font-medium">Furnished:</span>{" "}
                {listing.furnished ? "Yes" : "No"} |{" "}
                <span className="font-medium">Parking:</span>{" "}
                {listing.parking ? "Yes" : "No"}
              </p>
            </div>
          ))
        ) : (
          <p>No listings found.</p>
        )}
      </div>
    </div>
  );
};

export default Home;
