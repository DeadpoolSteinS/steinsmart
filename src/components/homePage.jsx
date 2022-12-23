import { useEffect, useState } from "react";
import Header from "./header";
import { FiX } from "react-icons/fi";
import FormInput from "./formInput";
import FormTextarea from "./formTextarea";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";

function HomePage() {
  const [isModalOpen, setModalOpen] = useState(false);

  const [productName, setProductName] = useState("");
  const [productDetail, setProductDetail] = useState("");
  const [productImage, setProductImage] = useState("");

  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const response = await fetch("http://localhost:3000/api/products/");
    const data = await response.json();
    setProducts(data.data);
  }

  const handleProductNameChange = (event) => {
    setProductName(event.target.value);
  };

  const handleProductDetailChange = (event) => {
    setProductDetail(event.target.value);
  };

  const handleProductImageChange = (event) => {
    setProductImage(event.target.value);
  };

  function handleSubmit(event) {
    event.preventDefault();

    // Kirimkan data ke API
    fetch("http://localhost:3000/api/add_product/", {
      method: "POST",
      body: JSON.stringify({
        name: productName,
        detail: productDetail,
        image: productImage,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((response) => {
        fetchData();
        toast(response.message);
      })
      .catch((error) => {
        toast(error);
      });

    // Tutup modal
    setModalOpen(false);
  }

  return (
    <div>
      <Header />
      <div className="container mx-auto py-4">
        <button
          onClick={() => setModalOpen(true)}
          className="py-2 px-4 bg-[#F9A825] text-white rounded-full shadow-lg mb-4"
        >
          Tambah Product
        </button>

        <ToastContainer />

        {isModalOpen && (
          <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-75 flex items-center justify-center z-10">
            <div className="w-full max-w-sm rounded-lg bg-white shadow-lg py-4 px-6">
              <div className="modal-header flex items-center justify-between pb-4">
                <h2 className="text-2xl font-bold">Tambah Product</h2>
                <button
                  className="modal-close-button"
                  onClick={() => setModalOpen(false)}
                >
                  <FiX
                    size={24}
                    className="text-gray-600 hover:text-gray-800"
                  />
                </button>
              </div>
              <form action="" method="POST" onSubmit={handleSubmit}>
                <div className="modal-body">
                  <FormInput
                    label="Name"
                    id="productName"
                    type="text"
                    placeholder="ex: Celana Chinos"
                    value={productName}
                    onChange={handleProductNameChange}
                    required
                    className="mb-4"
                  />

                  <FormTextarea
                    label="Detail"
                    id="productDetail"
                    placeholder="ex: Pakaian untuk anak muda yang terjangkau"
                    value={productDetail}
                    onChange={handleProductDetailChange}
                    required
                    className="mb-4"
                  />

                  <FormInput
                    label="Image URL (from internet)"
                    id="productImage"
                    type="text"
                    placeholder="ex: https://cf.shopee.co.id/file/75aaaeeb18ca1260c308d8eb928d6474"
                    value={productImage}
                    onChange={handleProductImageChange}
                    required
                    className="mb-4"
                  />
                </div>

                <div className="modal-footer flex items-center justify-end">
                  <button
                    className="btn btn-primary bg-[#F9A825] text-white px-4 py-2 rounded"
                    type="submit"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        <div className="grid grid-cols-custom justify-center gap-4 sm:col-span-1 md:col-span-2">
          {products.map((product) => (
            <Link to={`/product/${product._id}`} key={product._id}>
              <div className="relative rounded-lg shadow-lg">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-64 h-64 rounded-t-lg shadow object-cover"
                />
                <div className="px-6 py-4">
                  <div className="font-bold text-xl mb-2">{product.name}</div>
                  <p className="text-gray-700 text-base">{product.detail}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
