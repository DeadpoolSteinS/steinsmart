import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import Header from "./header";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";

const PayPage = () => {
  const [products, setProducts] = useState([]);

  // eslint-disable-next-line
  const [userAddress, setUserAddress] = useState({
    name: "Alvin Giovani",
    street: "Sukajadi No. 17",
    city: "Bandung",
    zipCode: "12345",
    country: "Indonesia",
  });

  const [courierOptions, setCourierOptions] = useState([
    { id: 1, name: "JNE", cost: 10000, isSelected: true },
    { id: 2, name: "TIKI", cost: 12000, isSelected: false },
    { id: 3, name: "Pos Indonesia", cost: 9000, isSelected: false },
  ]);

  // eslint-disable-next-line
  const [paymentMethods, setPaymentMethods] = useState([
    { id: 1, name: "Kartu Kredit" },
    { id: 2, name: "Transfer Bank" },
  ]);

  const account = JSON.parse(Cookies.get("account"));
  const navigate = useNavigate();

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

  const calculateTotalPrice = (products) => {
    // Menghitung total harga produk dengan menjumlahkan harga masing-masing produk
    return products.reduce(
      (total, product) => total + product.productId.price * product.qty,
      0
    );
  };

  const calculateShippingCost = (courierOptions) => {
    // Mencari opsi kurir yang dipilih
    const selectedOption = courierOptions.find((option) => option.isSelected);

    // Mengembalikan biaya pengiriman dari opsi kurir yang dipilih
    return selectedOption ? selectedOption.cost : 0;
  };

  const calculateTotalCost = (products, courierOptions) => {
    // Menghitung total harga dengan menambahkan total harga produk dan biaya pengiriman
    return (
      calculateTotalPrice(products) + calculateShippingCost(courierOptions)
    );
  };

  const handleCourierChange = (selectedCourierId) => {
    const updatedCourierOptions = courierOptions.map((option) => {
      if (option.id === selectedCourierId) {
        return { ...option, isSelected: true };
      }
      return { ...option, isSelected: false };
    });
    setCourierOptions(updatedCourierOptions);
  };

  function formatIndo(price) {
    return "Rp. " + price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    // Kirim data rating dan review ke server
    // fetch("http://localhost:3000/api/add_comment", {
    //   method: "POST",
    //   body: JSON.stringify({
    //     accountId: account._id,
    //     productId: productId,
    //     desc: comment,
    //   }),
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // })
    //   .then((response) => response.json())
    //   .then((data) => {
    //     toast(data.message);
    //     fetchDataComment(`http://localhost:3000/api/comments/${productId}`);
    //   });
    swal("Good job!", "Pesananmu sedang diproses!", "success").then(() => {
      navigate("/"); // arahkan ke halaman home
    });
  };

  return (
    <div>
      <Header />
      <div className="container mx-auto py-10">
        {/* List produk */}
        <div className="flex flex-col">
          <h2 className="text-2xl font-bold mb-4">Daftar Produk</h2>
          {products.map((product) => (
            <div key={product._id} className="flex items-center mb-4">
              <img
                src={product.productId.image}
                alt={product.name}
                className="w-16 h-16 mr-4 object-cover"
              />
              <div>
                <h3 className="font-bold text-lg mb-2">{product.name}</h3>
                <p className="text-sm text-gray-600 mb-2">
                  Jumlah: {product.qty}
                </p>
                <p className="text-sm text-gray-600">
                  Harga: {formatIndo(product.productId.price)}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Alamat user */}
        <div className="my-10 border-2 border-gray-200 rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4">Alamat Pengiriman</h2>
          <div className="flex gap-2 items-center">
            <p className="text-lg font-bold mr-4">{account.username}</p>
            <p className="text-sm text-gray-600">{userAddress.street}</p>
            <p className="text-sm text-gray-600">{userAddress.city}</p>
            <p className="text-sm text-gray-600">{userAddress.zipCode}</p>
            <p className="text-sm text-gray-600">{userAddress.country}</p>
          </div>
        </div>

        {/* Pilihan kurir */}
        <div className="my-10">
          <h2 className="text-2xl font-bold mb-4">Pilih Kurir</h2>
          <div className="flex gap-4">
            {courierOptions.map((option) => (
              <label key={option.id} className="flex items-center">
                <input
                  type="radio"
                  className="form-radio"
                  name="courier"
                  checked={option.isSelected}
                  onChange={() => handleCourierChange(option.id)}
                />
                <span className="ml-2 text-lg font-semibold">
                  {option.name}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Pilihan metode pembayaran */}
        <div className="my-10">
          <h2 className="text-2xl font-bold mb-4">Pilih Metode Pembayaran</h2>
          <div className="flex gap-4">
            {paymentMethods.map((method) => (
              <label key={method.id} className="flex items-center">
                <input type="radio" className="form-radio" name="payment" />
                <span className="ml-2 text-lg font-semibold">
                  {method.name}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Rincian harga */}
        <div className="my-10 border-2 border-gray-200 rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4">Rincian Harga</h2>
          <div className="flex items-center mb-4">
            <p className="w-1/3 text-sm text-gray-600 font-bold">
              Total Harga Produk
            </p>
            <p className="w-2/3 text-sm text-right font-bold text-gray-600">
              {formatIndo(calculateTotalPrice(products))}
            </p>
          </div>
          <div className="flex items-center mb-4">
            <p className="w-1/3 text-sm text-gray-600 font-bold">
              Biaya Pengiriman
            </p>
            <p className="w-2/3 text-sm text-right font-bold text-gray-600">
              {formatIndo(calculateShippingCost(courierOptions))}
            </p>
          </div>
          <div className="flex items-center mb-4">
            <p className="w-1/3 text-sm text-gray-600 font-bold">Total Harga</p>
            <p className="w-2/3 text-sm text-right font-bold text-gray-600">
              {formatIndo(calculateTotalCost(products, courierOptions))}
            </p>
          </div>
        </div>

        {/* Tombol bayar */}
        <div className="my-10">
          <button
            onClick={handleSubmit}
            className="px-4 py-2 font-bold text-white bg-[#F9A825] rounded hover:bg-[#c8810e] focus:outline-none focus:shadow-outline"
          >
            Bayar
          </button>
        </div>
      </div>
    </div>
  );
};

export default PayPage;
