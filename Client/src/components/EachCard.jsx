import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const EachCard = ({ listing }) => {
  const  navigate  = useNavigate()
  const handleClick = () => {
    navigate(`/each-list/${listing._id}`);
  };

  return (
    <StyledWrapper>
      <div className="card">
        {/* Image / Header */}
        <div
          className="card-img"
          style={{
            backgroundImage: listing.imageUrls?.length
              ? `url(${listing.imageUrls[0]})`
              : "linear-gradient(135deg, #38bdf8, #34d399)", // fallback gradient
          }}
        />

        {/* Info */}
        <div className="card-info">
          <p className="text-title">{listing.name}</p>
          <p
          className={`inline-block px-3 py-1 rounded-full text-sm font-semibold shadow-md 
          ${listing?.bestseller 
          ? "bg-green-500 text-white" 
          : ""
        }`}
          >
  {listing?.bestseller ? "Best Seller" : ""}
</p>

          <p className="text-body">{listing.description?.slice(0, 60)}...</p>
          <p className="text-subtitle">{listing.address}</p>
          
        </div>

        {/* Footer */}
        <div className="card-footer">
          <span className="text-title">₹{listing.regularPrice}</span>
          <div className="card-button" onClick={handleClick}>
            <svg
              className="svg-icon"
              viewBox="0 0 20 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M7 5l5 5-5 5" />
            </svg>
          </div>
        </div>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .card {
    width: 100%;
    max-width: 460px;
    background: #ffffffaa;
    backdrop-blur: 12px;
    border-radius: 2rem;
    overflow: hidden;
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.15);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    cursor: pointer;
  }

  .card:hover {
    transform: translateY(-8px);
    box-shadow: 0 25px 55px rgba(0, 0, 0, 0.2);
  }

  .card-img {
    height: 45%;
    width: 100%;
    background-size: cover;
    background-position: center;
    border-radius: 1.5rem 1.5rem 0 0;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }

  .card-img:hover {
    transform: translateY(-10%);
    box-shadow: 0 15px 55px rgba(226, 196, 63, 0.25),
      0 8px 22px rgba(180, 71, 71, 0.3);
  }

  .card-info {
    padding: 1.2rem 1rem;
  }

  .text-title {
    font-weight: 900;
    font-size: 1.25rem;
    color: #047857; /* emerald-700 */
    margin-bottom: 0.4rem;
  }

  .text-body {
    font-size: 0.95rem;
    color: #065f46; /* emerald-800 */
    margin-bottom: 0.3rem;
  }

  .text-subtitle {
    font-size: 0.85rem;
    color: #10b981; /* emerald-500 */
  }

  .card-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.8rem 1rem;
    border-top: 1px solid #e5e7eb;
  }

  .card-button {
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(to right, #34d399, #3b82f6);
    padding: 0.4em;
    border-radius: 50px;
    color: white;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .card-button:hover {
    transform: scale(1.1);
    box-shadow: 0 8px 20px rgba(52, 211, 153, 0.4);
  }

  svg {
    width: 22px;
    height: 22px;
  }

  /* Responsive */
  @media (max-width: 768px) {
    .card {
      max-width: 90%;
    }
  }

  @media (max-width: 480px) {
    .card {
      max-width: 100%;
    }
  }
`;

export default EachCard;
