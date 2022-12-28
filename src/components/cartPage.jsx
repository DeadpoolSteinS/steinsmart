import React, { useState } from "react";
import Header from "./header";

function CartPage() {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Product 1",
      price: 100,
      quantity: 2,
      image: "https://images.tokopedia.net/img/cache/500-square/attachment/2019/6/21/156111030334018/156111030334018_822930be-cb10-4538-a646-f1b3385ee68e.png",
    },
    {
      id: 2,
      name: "Product 2",
      price: 200,
      quantity: 1,
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRB-VN6R-zzSCQognqjJx_a1GtDQ4wnTyJpQw&usqp=CAU",
    },
    {
      id: 3,
      name: "Product 3",
      price: 300,
      quantity: 3,
      image: "https://images.tokopedia.net/img/cache/500-square/VqbcmM/2021/12/15/17c3cfe2-08c2-4a30-8d14-27dc4e772eee.jpg",
    },
  ]);

  const totalPrice = products.reduce((acc, product) => acc + product.price * product.quantity, 0);
  const totalQuantity = products.reduce((acc, product) => acc + product.quantity, 0);

  return (
    <div>
      <Header />
      <div className="container mx-auto px-4 py-12">
        {products.map((product) => (
          <div key={product.id} className="border rounded-lg shadow-md mb-4 p-4">
            <div className="flex items-start justify-start mb-4">
              <img src={product.image} alt={product.name} className="h-20 w-20 rounded mr-4" />
              <div className="w-full">
                <h2 className="text-xl font-bold mb-2">{product.name}</h2>
                <p className="text-gray-600 text-sm mb-4">{product.detail}lorem ipsum laah</p>
                <div className="flex items-center justify-end">
                  <button
                    onClick={() => {
                      const newProducts = [...products];
                      const index = newProducts.findIndex((p) => p.id === product.id);
                      if (newProducts[index].quantity > 1) {
                        newProducts[index].quantity -= 1;
                        setProducts(newProducts);
                      }
                    }}
                    className="btn-minus font-bold text-xs border px-3 py-2"
                  >
                    -
                  </button>
                  <h2 className="text-xs font-bold px-3 py-2 border">{product.quantity}</h2>
                  <button
                    onClick={() => {
                      // Increase quantity
                      const newProducts = [...products];
                      const index = newProducts.findIndex((p) => p.id === product.id);
                      newProducts[index].quantity += 1;
                      setProducts(newProducts);
                    }}
                    className="btn-plus font-bold text-xs border px-3 py-2"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
            <div className="flex justify-between items-center">
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
        <div className="flex justify-between mt-6 items-center">
          <p className="text-lg font-bold">Total Quantity : {totalQuantity}</p>
          <div className="flex justify-center items-center">
            <p className="text-lg font-bold">Total Price : Rp. {totalPrice}</p>
            <button className="mx-5 px-4 py-2 bg-[#F9A825] text-white rounded-lg hover:bg-[#d38b18] focus:outline-none focus:shadow-outline"> Checkout</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartPage;
