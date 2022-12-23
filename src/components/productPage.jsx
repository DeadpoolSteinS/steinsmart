import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import Header from "./header";

import "react-toastify/dist/ReactToastify.css";

const ProductPage = () => {
  // Dapatkan parameter rute
  const { productId } = useParams();

  const [product, setProduct] = useState({});
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");

  // Gunakan ID untuk mengambil data produk dari API
  useEffect(() => {
    // Fetch data produk dari API
    fetch(`http://localhost:3000/api/product/${productId}`)
      .then((response) => response.json())
      .then((data) => {
        // Set data produk ke state
        setProduct(data.data);
      });
  }, [productId]);

  // Fungsi untuk mengubah nilai state rating
  const handleRatingChange = (event) => {
    setRating(event.target.value);
  };

  // Fungsi untuk mengubah nilai state review
  const handleReviewChange = (event) => {
    setReview(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const account = JSON.parse(Cookies.get("account"));

    // Kirim data rating dan review ke server
    fetch("http://localhost:3000/api/add_rating", {
      method: "POST",
      body: JSON.stringify({
        accountId: account._id,
        productId: productId,
        value: rating,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        toast(data.message);
      });
  };

  // Tampilkan data produk di halaman
  return (
    <div>
      <Header />
      <ToastContainer />
      <div className="container mx-auto py-8">
        <div className="flex items-center">
          <img src={product.image} alt={product.name} className="h-64" />
          <div className="w-1/2 px-4">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              {product.name}
            </h1>
            <p className="text-gray-700 text-base leading-relaxed">
              {product.detail}
            </p>
            <div className="mt-4">
              <button className="px-4 py-2 bg-[#F9A825] text-white rounded-full hover:bg-[#d38b18] focus:outline-none focus:shadow-outline">
                Add to Cart
              </button>
            </div>
          </div>
        </div>

        {/* Form untuk memberi rating dan ulasan */}
        <form onSubmit={handleSubmit} className="mt-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Leave a review
          </h2>
          <div className="mb-4">
            <label
              htmlFor="rating"
              className="block text-gray-700 font-bold mb-2"
            >
              Rating (1-5)
            </label>
            <input
              type="number"
              id="rating"
              name="rating"
              min="1"
              max="5"
              value={rating}
              onChange={handleRatingChange}
              className="border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="review"
              className="block text-gray-700 font-bold mb-2"
            >
              Review
            </label>
            <textarea
              id="review"
              name="review"
              rows="5"
              value={review}
              onChange={handleReviewChange}
              className="border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
            ></textarea>
          </div>
          <div>
            <button
              type="submit"
              className="px-4 py-2 bg-[#F9A825] text-white rounded"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductPage;
