import { useState } from "react";
import API from "../services/api";

function Checkout() {

  const [form, setForm] = useState({
    customerName: "",
    email: "",
    phone: "",
    address: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const placeOrder = async (e) => {
    e.preventDefault();

    try {

      const cartRes = await API.get("/cart");

      const cart = cartRes.data.cart;

      if (cart.length === 0) {
        alert("Cart is Empty");
        return;
      }

      const totalAmount = cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );

      const products = cart.map((item) => ({
        title: item.title,
        price: item.price,
        quantity: item.quantity,
      }));

      await API.post("/orders", {
        customerName: form.customerName,
        email: form.email,
        phone: form.phone,
        address: form.address,
        products,
        totalAmount,
      });

      alert("Order Placed Successfully");

      await API.delete("/cart");

      window.location.href = "/";

    } catch (error) {

      console.log(error);
      alert("Failed to Place Order");

    }
  };

  return (

    <div className="container mt-5">

      <div className="card shadow p-4">

        <h2 className="text-center mb-4">
          Checkout
        </h2>

        <form onSubmit={placeOrder}>

          <input
            type="text"
            className="form-control mb-3"
            placeholder="Full Name"
            name="customerName"
            value={form.customerName}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            className="form-control mb-3"
            placeholder="Email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            className="form-control mb-3"
            placeholder="Phone Number"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            required
          />

          <textarea
            className="form-control mb-3"
            placeholder="Delivery Address"
            name="address"
            value={form.address}
            onChange={handleChange}
            required
          ></textarea>

          <button
            className="btn btn-success w-100"
          >
            Place Order
          </button>

        </form>

      </div>

    </div>

  );
}

export default Checkout;