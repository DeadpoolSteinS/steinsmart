import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "./header";

function CartPage() {
  const [products, setProducts] = useState([]);

  const account = JSON.parse(Cookies.get("account"));

  useEffect(() => {
    // Fetch data produk dari API
    fetch(`http://localhost:3000/api/account_cart/${account._id}`)
      .then((response) => response.json())
      .then((data) => {
        // Set data produk ke state
        setProducts(data.data.product);
      });
    // eslint-disable-next-line
  }, []);

  const totalPrice = products.reduce(
    (acc, product) => acc + product.productId.price * product.qty,
    0
  );

  const totalQuantity = products.reduce((acc, product) => acc + product.qty, 0);

  function formatIndo(price) {
    return "Rp. " + price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }

  return (
    <div>
      <Header />
      <div className="container mx-auto px-4 py-12">
        {products.map((product) => (
          <div
            key={product._id}
            className="border rounded-lg shadow-md mb-4 p-4"
          >
            <div className="flex items-center mb-4">
              <img
                src={product.productId.image}
                alt={product.productId.name}
                className="h-16 w-16 rounded mr-4 object-cover"
              />
              <div>
                <h2 className="text-xl font-bold mb-2">
                  {product.productId.name}
                </h2>
                <p className="text-gray-600 text-sm mb-4">
                  {product.productId.detail}
                </p>
                <h2 className="text-xl font-bold text-gray-600 mb-2">
                  {formatIndo(product.productId.price)}
                </h2>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <button
                  onClick={() => {
                    const newProducts = [...products];
                    const index = newProducts.findIndex(
                      (p) => p.id === product.id
                    );
                    if (newProducts[index].quantity > 1) {
                      newProducts[index].quantity -= 1;
                      setProducts(newProducts);
                    }
                  }}
                  className="btn-minus rounded-full px-3 py-2"
                >
                  -
                </button>
                <h2 className="text-xl font-bold mx-4">{product.qty}</h2>
                <button
                  onClick={() => {
                    // Increase quantity
                    const newProducts = [...products];
                    const index = newProducts.findIndex(
                      (p) => p.id === product.id
                    );
                    newProducts[index].quantity += 1;
                    setProducts(newProducts);
                  }}
                  className="btn-plus rounded-full px-3 py-2"
                >
                  +
                </button>
              </div>
              <div className="flex justify-end">
                <button
                  onClick={() => {
                    // Remove product from cart
                  }}
                  className="btn btn-danger rounded-md px-2 text-xs py-1 bg-red-500 hover:bg-red-700 text-white"
                >
                  Remove
                </button>
              </div>
              <div className="flex justify-end mx-2">
                <h2 className="text-xl font-bold text-[#F9A825]  mb-2">Rp. {product.price}</h2>
              </div>
            </div>
          </div>
        ))}
        <div className="flex justify-between mt-6">
          <h2 className="text-xl font-bold">Total Quantity: {totalQuantity}</h2>
          <h2 className="text-xl font-bold">
            Total Price: {formatIndo(totalPrice)}
          </h2>
        </div>

        <div className="my-10">
          <Link
            to="/pay"
            className="px-4 py-2 font-bold text-white bg-[#F9A825] rounded hover:bg-[#c8810e] focus:outline-none focus:shadow-outline"
          >
            Beli
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CartPage;
