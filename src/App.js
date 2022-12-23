import { Route, Routes } from "react-router-dom";
import HomePage from "./components/homePage";
import LoginPage from "./components/loginPage";
import RegisterPage from "./components/registerPage";
import DetailPage from "./components/detailPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/product/:productId" element={<DetailPage />} />
    </Routes>
  );
}

export default App;
