import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "./header";

const ProductPage = () => {
  // Dapatkan parameter rute
  const { productId } = useParams();

  const [product, setProduct] = useState({});

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

  // Tampilkan data produk di halaman
  return (
    <div>
      <Header />
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
      </div>
    </div>
  );
};

export default ProductPage;
