import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Dashboard from "./pages/DashBoard";
import Layaout from "./pages/Layaout";
import Login from "./pages/Login";
import Regisiter from "./pages/Register";
import { AuthProvider } from "./hooks/TokenContext";
import Products from "./pages/Products";
import Orders from "./pages/Orders";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Layaout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/registro" element={<Regisiter />} />
            <Route path="/products" element={<Products />} />
            <Route path="/orders" element={<Orders/>} />
          </Routes>
        </Layaout>
      </AuthProvider>
      <Toaster />
    </BrowserRouter>
  )
}

export default App
