import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import SwiperCore from "swiper";
import PropTypes from "prop-types";
import "swiper/css/bundle";

function ListingItem({ listing }) {
  return (
    <div className="p-4 border border-gray-200 rounded">
      <img
        src={listing.imageUrls[0]}
        alt={listing.title}
        className="w-full h-48 object-cover"
      />
      <h3 className="text-lg font-semibold mt-2">{listing.title}</h3>
      <p className="text-gray-500">{listing.description}</p>
    </div>
  );
}

ListingItem.propTypes = {
  listing: PropTypes.shape({
    imageUrls: PropTypes.arrayOf(PropTypes.string).isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
};

export default function Home() {
  const [offerListings, setOfferListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);

  SwiperCore.use([Navigation]);

  // Use hardcoded data instead of fetching from an API
  useEffect(() => {
    const mockOfferListings = [
      {
        _id: "1",
        imageUrls: [
          "https://m.media-amazon.com/images/I/61SMyc6wubL._AC_UF1000,1000_QL80_.jpg",
        ],
        title: "Special Offer on 2BHK Apartment",
        description:
          "Get an amazing discount on a 2BHK apartment in the city center.",
      },
      {
        _id: "2",
        imageUrls: [
          "https://m.media-amazon.com/images/I/61SMyc6wubL._AC_UF1000,1000_QL80_.jpg",
        ],
        title: "Exclusive Offer for Studio Apartment",
        description:
          "Studio apartment available with modern amenities at a great price.",
      },
    ];

    const mockRentListings = [
      {
        _id: "3",
        imageUrls: [
          "https://m.media-amazon.com/images/I/61SMyc6wubL._AC_UF1000,1000_QL80_.jpg",
        ],
        title: "1BHK for Rent in Downtown",
        description: "Spacious 1BHK apartment for rent in a prime location.",
      },
      {
        _id: "4",
        imageUrls: [
          "https://m.media-amazon.com/images/I/61SMyc6wubL._AC_UF1000,1000_QL80_.jpg",
        ],
        title: "3BHK with Garden View",
        description:
          "Beautiful 3BHK apartment with a garden view available for rent.",
      },
    ];

    const mockSaleListings = [
      {
        _id: "5",
        imageUrls: [
          "https://m.media-amazon.com/images/I/61SMyc6wubL._AC_UF1000,1000_QL80_.jpg",
        ],
        title: "Luxury Villa for Sale",
        description:
          "A luxury villa with a swimming pool and a beautiful garden.",
      },
      {
        _id: "6",
        imageUrls: [
          "https://m.media-amazon.com/images/I/61SMyc6wubL._AC_UF1000,1000_QL80_.jpg",
        ],
        title: "2BHK Apartment for Sale",
        description:
          "Modern 2BHK apartment with easy access to schools and markets.",
      },
    ];

    // Set the hardcoded data into the state
    setOfferListings(mockOfferListings);
    setRentListings(mockRentListings);
    setSaleListings(mockSaleListings);
  }, []);

  return (
    <div>
      {/* Top Section */}
      <div className="flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto">
        <h1 className="text-slate-700 font-bold text-3xl lg:text-6xl">
          Find your next <span className="text-slate-500">perfect</span>
          <br />
          place with ease
        </h1>
        <div className="text-gray-400 text-xs sm:text-sm">
          Real Estate is the best place to find your next perfect place to live.
          <br />
          We have a wide range of properties for you to choose from.
        </div>
      </div>

      {/* Swiper Section */}
      {offerListings.length > 0 && (
        <Swiper navigation>
          {offerListings.map((listing) => (
            <SwiperSlide key={listing._id}>
              <div
                style={{
                  background: `url(${listing.imageUrls[0]}) center no-repeat`,
                  backgroundSize: "cover",
                }}
                className="h-[500px]"
              ></div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}

      {/* Listings for Offer, Sale, and Rent */}
      <div className="max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10">
        {offerListings.length > 0 && (
          <div>
            <h2 className="text-2xl font-semibold text-slate-600">
              Recent Offers
            </h2>
            <div className="flex flex-wrap gap-4">
              {offerListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
        {rentListings.length > 0 && (
          <div>
            <h2 className="text-2xl font-semibold text-slate-600">
              Recent Places for Rent
            </h2>
            <div className="flex flex-wrap gap-4">
              {rentListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
        {saleListings.length > 0 && (
          <div>
            <h2 className="text-2xl font-semibold text-slate-600">
              Recent Places for Sale
            </h2>
            <div className="flex flex-wrap gap-4">
              {saleListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
