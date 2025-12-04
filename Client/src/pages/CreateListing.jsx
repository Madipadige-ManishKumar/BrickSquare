import React from "react";

const CreateListing = () => {
  return (
    <main className="max-w-5xl mx-auto p-4">
      <h1 className="text-3xl font-semibold text-center my-7">
        Create Listing
      </h1>

      {/* FORM */}
      <form className="flex flex-col sm:flex-row gap-10 mb-10">
        {/* LEFT SECTION */}
        <div className="flex flex-col gap-6 flex-1">
          {/* Name */}
          <input
            type="text"
            placeholder="Name"
            className="border p-3 rounded-lg"
            id="name"
            maxLength="62"
            minLength="10"
            required
          />

          {/* Description */}
          <textarea
            placeholder="Description"
            className="border p-3 rounded-lg"
            id="description"
            required
          />

          {/* Address */}
          <input
            type="text"
            placeholder="Address"
            className="border p-3 rounded-lg"
            id="address"
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
                <input type="checkbox" className="w-5 h-5" id={item.id} />
                <span>{item.label}</span>
              </label>
            ))}
          </div>

          {/* Number Inputs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
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
                placeholder="Bedrooms"
                className="p-3 border rounded-lg"
              />
            </div>

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
                placeholder="Bathrooms"
                className="p-3 border rounded-lg"
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="regularPrice" className="mb-1 font-medium">
                Regular Price
              </label>
              <input
                type="number"
                id="regularPrice"
                required
                placeholder="Regular Price"
                className="p-3 border rounded-lg"
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="discountedPrice" className="mb-1 font-medium">
                Discounted Price
              </label>
              <input
                type="number"
                id="discountedPrice"
                required
                placeholder="Discounted Price"
                className="p-3 border rounded-lg"
              />
            </div>
          </div>
        </div>

        {/* RIGHT SECTION */}
        <div className="flex flex-col gap-4 flex-1 p-5 border rounded-xl shadow-sm bg-white">
          <p className="font-semibold">
            Images:
            <span className="font-normal text-gray-600"> (max 6)</span>
          </p>

          <div className="flex items-center gap-4">
            <input
              type="file"
              id="images"
              accept="image/*"
              multiple
              className="border p-2 rounded-lg"
            />
            <button
              type="button"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Upload
            </button>
          </div>
        </div>
      </form>

      {/* SUBMIT BUTTON */}
      <button
        className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition text-lg font-medium"
      >
        Create Listing
      </button>
    </main>
  );
};

export default CreateListing;
