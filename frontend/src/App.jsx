import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Profile from "./pages/Profile";
import AdminDashboard from "./pages/AdminDashboard";
import AddProduct from "./pages/AddProduct";
import EditProduct from "./pages/EditProduct";
import NotFound from "./pages/NotFound";
import ManageProducts from "./pages/ManageProducts";
import Checkout from "./pages/Checkout";
import MyOrders from "./pages/MyOrders";
function App() {
  return (
    <>
      {/* Header */}
      <Navbar />

      {/* Main Content */}
      <main className="container my-4 page-content">
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/login" element={<Login />} />

          <Route path="/register" element={<Register />} />

          <Route path="/products" element={<Products />} />

          <Route path="/product/:id" element={<ProductDetails />} />

          <Route path="/cart" element={<Cart />} />

          <Route path="/profile" element={<Profile />} />

          <Route path="/admin" element={<AdminDashboard />} />

          <Route path="/add-product" element={<AddProduct />} />

          <Route path="/edit-product/:id" element={<EditProduct />} />

          <Route path="*" element={<NotFound />} />

          <Route path="/manage-products" element={<ManageProducts />} />

          <Route path="/checkout" element={<Checkout />} />

          <Route path="/orders" element={<MyOrders />} />
        </Routes>
      </main>

      {/* Footer */}
      <Footer />
    </>
  );
}

export default App;