import React, { useState } from "react";
import Header from "./header";

function CartPage() {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Product 1",
      price: 100,
      quantity: 2,
      image:
        "https://images.tokopedia.net/img/cache/500-square/attachment/2019/6/21/156111030334018/156111030334018_822930be-cb10-4538-a646-f1b3385ee68e.png",
    },
    {
      id: 2,
      name: "Product 2",
      price: 200,
      quantity: 1,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRB-VN6R-zzSCQognqjJx_a1GtDQ4wnTyJpQw&usqp=CAU",
    },
    {
      id: 3,
      name: "Product 3",
      price: 300,
      quantity: 3,
      image:
        "https://images.tokopedia.net/img/cache/500-square/VqbcmM/2021/12/15/17c3cfe2-08c2-4a30-8d14-27dc4e772eee.jpg",
    },
  ]);

  const totalPrice = products.reduce(
    (acc, product) => acc + product.price * product.quantity,
    0
  );
  const totalQuantity = products.reduce(
    (acc, product) => acc + product.quantity,
    0
  );

  return (
    <div>
      <Header />
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-2xl font-bold mb-6">Cart</h1>
        {products.map((product) => (
          <div
            key={product.id}
            className="border rounded-lg shadow-md mb-4 p-4"
          >
            <div className="flex items-center mb-4">
              <img
                src={product.image}
                alt={product.name}
                className="h-16 w-16 rounded mr-4"
              />
              <div>
                <h2 className="text-xl font-bold mb-2">{product.name}</h2>
                <p className="text-gray-600 text-sm mb-4">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </p>
                <h2 className="text-xl font-bold text-gray-600 mb-2">
                  {product.price}
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
                <h2 className="text-xl font-bold mx-4">{product.quantity}</h2>
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
                  className="btn btn-danger rounded-full px-4 py-2 bg-[#F9A825] text-white"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
        <div className="flex justify-between mt-6">
          <h2 className="text-xl font-bold">Total Quantity: {totalQuantity}</h2>
          <h2 className="text-xl font-bold">Total Price: {totalPrice}</h2>
        </div>
      </div>
    </div>
  );
}

export default CartPage;
