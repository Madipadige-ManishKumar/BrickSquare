import React, { useEffect, useState } from "react";
import EachCard from "../components/EachCard";

const Home = () => {
  const [listings, setListings] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    type: "", // rent or sale
    furnished: false,
    parking: false,
    offer: false,
    bedroomsMin: 0,
    bedroomsMax: 10,
    bathroomsMin: 0,
    bathroomsMax: 10,
    priceMin: 0,
    priceMax: 1000000,
  });

  // Fetch all listings from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/listings/home", { method: "GET" });
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

  // Filter listings based on search & advanced filter options
  const filteredListings = listings.filter((listing) => {
    const matchesText = listing.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filters.type ? listing.type === filters.type : true;
    const matchesFurnished = filters.furnished ? listing.furnished : true;
    const matchesParking = filters.parking ? listing.parking : true;
    const matchesOffer = filters.offer ? listing.offer : true;

    const bedrooms = Number(listing.bedrooms);
    const bathrooms = Number(listing.bathrooms);
    const price = Number(listing.discountedPrice || listing.regularPrice);

    const matchesBedrooms =
      bedrooms >= Number(filters.bedroomsMin) && bedrooms <= Number(filters.bedroomsMax);
    const matchesBathrooms =
      bathrooms >= Number(filters.bathroomsMin) && bathrooms <= Number(filters.bathroomsMax);
    const matchesPrice =
      price >= Number(filters.priceMin) && price <= Number(filters.priceMax);

    return (
      matchesText &&
      matchesType &&
      matchesFurnished &&
      matchesParking &&
      matchesOffer &&
      matchesBedrooms &&
      matchesBathrooms &&
      matchesPrice
    );
  });

  return (
    <div className="flex max-w-6xl mx-auto p-4 gap-6">

      {/* Left Section - Search + Advanced Filters */}
      <div className="w-1/3 p-4 border rounded-lg space-y-4 shadow-sm h-fit sticky top-4">
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
          <label>Bedrooms (min - max):</label>
          <div className="flex gap-2">
            <input
              type="number"
              id="bedroomsMin"
              min="0"
              value={filters.bedroomsMin}
              onChange={handleFilterChange}
              className="border p-2 rounded-lg w-1/2"
            />
            <input
              type="number"
              id="bedroomsMax"
              min="0"
              value={filters.bedroomsMax}
              onChange={handleFilterChange}
              className="border p-2 rounded-lg w-1/2"
            />
          </div>
        </div>

        {/* Bathrooms */}
        <div className="flex flex-col gap-2">
          <label>Bathrooms (min - max):</label>
          <div className="flex gap-2">
            <input
              type="number"
              id="bathroomsMin"
              min="0"
              value={filters.bathroomsMin}
              onChange={handleFilterChange}
              className="border p-2 rounded-lg w-1/2"
            />
            <input
              type="number"
              id="bathroomsMax"
              min="0"
              value={filters.bathroomsMax}
              onChange={handleFilterChange}
              className="border p-2 rounded-lg w-1/2"
            />
          </div>
        </div>

        {/* Price */}
        <div className="flex flex-col gap-2">
          <label>Price (₹ min - max):</label>
          <div className="flex gap-2">
            <input
              type="number"
              id="priceMin"
              min="0"
              value={filters.priceMin}
              onChange={handleFilterChange}
              className="border p-2 rounded-lg w-1/2"
            />
            <input
              type="number"
              id="priceMax"
              min="0"
              value={filters.priceMax}
              onChange={handleFilterChange}
              className="border p-2 rounded-lg w-1/2"
            />
          </div>
        </div>

        {/* Boolean Checkboxes */}
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
            <EachCard key={listing._id} listing={listing} />
          ))
        ) : (
          <p>No listings found.</p>
        )}
      </div>
    </div>
  );
};

export default Home;
