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

  const [comment, setComment] = useState("");
  const [listComments, setListComments] = useState([]);

  const account = JSON.parse(Cookies.get("account"));

  // Gunakan ID untuk mengambil data produk dari API
  useEffect(() => {
    // Fetch data produk dari API
    fetch(`http://localhost:3000/api/product/${productId}`)
      .then((response) => response.json())
      .then((data) => {
        // Set data produk ke state
        setProduct(data.data);
      });

    fetchDataComment(`http://localhost:3000/api/comments/${productId}`);
  }, [productId]);

  // Fungsi untuk mengubah nilai state rating
  // eslint-disable-next-line
  const handleRatingChange = (event) => {
    setRating(event.target.value);
  };

  // Fungsi untuk mengubah nilai state review
  // eslint-disable-next-line
  const handleReviewChange = (event) => {
    setReview(event.target.value);
  };

  // eslint-disable-next-line
  const handleSubmit = (event) => {
    event.preventDefault();

    // Kirim data rating dan review ke server
    fetch("http://localhost:3000/api/add_rating", {
      method: "POST",
      body: JSON.stringify({
        accountId: account._id,
        productId: productId,
        value: rating,
        review: review,
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

  const handleAddToCart = () => {
    // Memasukkan item ke cart dalam database
    fetch("http://localhost:3000/api/add_to_cart", {
      method: "POST",
      body: JSON.stringify({
        accountId: account._id,
        productId: productId,
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

  const handleSubmitComment = (event) => {
    event.preventDefault();

    // Kirim data rating dan review ke server
    fetch("http://localhost:3000/api/add_comment", {
      method: "POST",
      body: JSON.stringify({
        accountId: account._id,
        productId: productId,
        desc: comment,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        toast(data.message);
        fetchDataComment(`http://localhost:3000/api/comments/${productId}`);
      });
  };

  async function fetchDataComment(url) {
    const response = await fetch(url);
    const data = await response.json();
    setListComments(data.data);
  }

  function formatIndo(price) {
    return "Rp. " + price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }

  const handleCallback = () => {
    console.log("BENG");
  };

  // Tampilkan data produk di halaman
  return (
    <div>
      <Header onCallback={handleCallback} />
      <ToastContainer />
      <div className="container mx-auto py-8">
        <div className="flex items-start">
          <img
            src={product.image}
            alt={product.name}
            className="h-80 w-80 object-cover"
          />
          <div className="w-full h-80 px-4 flex flex-col justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-3">
                {product.name}
              </h1>
              <hr className="border mb-3" />
              <p className="text-gray-700 text-base leading-relaxed font-bold mb-3">
                {" "}
                Rating : {product.rating}
              </p>
              <p className="text-gray-700 text-base leading-relaxed font-bold">
                Deskripsi : {product.detail}
              </p>
            </div>
            <div className="flex flex-col">
              <hr className="border" />

              <p className="flex justify-start mt-5 mb-5 text-3xl font-semibold text-[#F9A825]">
                {product.price ? formatIndo(product.price) : 0}
              </p>
              <div className="flex justify-end">
                <button
                  className="px-4 py-2 bg-[#F9A825] text-white rounded-lg hover:bg-[#d38b18] focus:outline-none focus:shadow-outline"
                  onClick={handleAddToCart}
                >
                  Add to Cart
                </button>
              </div>
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
        <hr className="border-2 mt-10" />
        <div className="mt-8">
          <div>
            <h2 className="text-xl font-bold text-gray-800 mb-4">Discussion</h2>
            {listComments.map((comment) => (
              <div key={comment._id} className="mb-4 border p-3 rounded-lg">
                <div className="flex items-center">
                  <img
                    src={comment.accountId.image}
                    alt={comment.accountId.username}
                    className="h-10 w-10 rounded-full mr-4 object-cover"
                  />
                  <div>
                    <h3 className="text-lg font-bold text-gray-800">
                      {comment.accountId.username}
                    </h3>
                    <p className="text-gray-600 text-sm">{comment.createdAt}</p>
                  </div>
                </div>
                <div className="mt-2">
                  <p className="text-gray-700 text-base leading-relaxed">
                    {comment.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <hr className="border mt-10" />
          <form onSubmit={handleSubmitComment} className="mb-8 mt-10">
            <div className="mb-4">
              <label
                htmlFor="comment"
                className="block text-gray-700 font-bold mb-2"
              >
                Ask Question(s)
              </label>
              <input
                type="text"
                id="comment"
                name="comment"
                value={comment}
                onChange={(event) => setComment(event.target.value)}
                className="border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="px-4 py-2 bg-[#F9A825] text-white rounded hover:bg-[#d38b18] focus:outline-none focus:shadow-outline"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
