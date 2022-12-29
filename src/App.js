import { Route, Routes } from "react-router-dom";
import HomePage from "./components/homePage";
import LoginPage from "./components/loginPage";
import RegisterPage from "./components/registerPage";
import ProductPage from "./components/productPage";
import CartPage from "./components/cartPage";
import PayPage from "./components/payPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/product/:productId" element={<ProductPage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/pay" element={<PayPage />} />
    </Routes>
  );
}

export default App;
