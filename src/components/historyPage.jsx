import Cookies from "js-cookie";
import React, { useState, useEffect } from "react";
import Header from "./header";

const HistoryPage = () => {
  const [orders, setOrders] = useState([]);

  const account = JSON.parse(Cookies.get("account"));

  useEffect(() => {
    fetchData(`http://localhost:3000/api/account_order/${account._id}`);
  }, []);

  async function fetchData(url) {
    const response = await fetch(url);
    const data = await response.json();
    setOrders(data.data);
    console.log(data.data);
  }

  return (
    <div>
      <Header />
      <div className="container mx-auto py-4">
        <h1>Order History</h1>
        <div className="grid grid-cols-3 gap-4">
          {orders.map((order) => (
            <div key={order.id} className="bg-white shadow-md rounded-lg p-4">
              <ul>
                {order.product.map((product) => (
                  <li key={product._id} className="font-bold text-lg">
                    {product.productId.name}
                  </li>
                ))}
              </ul>
              <p className="font-bold text-xl mb-2">
                Courier: <span className="text-gray-600">{order.courier}</span>
              </p>
              <p className="font-bold text-xl">
                Payment method:{" "}
                <span className="text-gray-600">{order.payment}</span>
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HistoryPage;
