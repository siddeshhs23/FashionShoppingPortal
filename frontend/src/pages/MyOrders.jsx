import { useEffect, useState } from "react";
import API from "../services/api";

function MyOrders() {

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const loadInitialOrders = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user") || "null");
        const endpoint = user?.role === "admin" ? "/orders/admin/all" : "/orders";
        const res = await API.get(endpoint);
        setOrders(res.data.orders || []);
      } catch (error) {
        console.log(error);
      }
    };

    loadInitialOrders();
  }, []);

  return (

    <div className="container mt-5">

      <h2 className="mb-4">
        My Orders
      </h2>

      <table className="table table-bordered">

        <thead className="table-dark">

          <tr>
            <th>Customer</th>
            <th>Email</th>
            <th>Total</th>
            <th>Status</th>
            <th>Date</th>
          </tr>

        </thead>

        <tbody>

          {orders.map((order) => (

            <tr key={order._id}>

              <td>{order.customerName}</td>

              <td>{order.email}</td>

              <td>₹{order.totalAmount}</td>

              <td>{order.status}</td>

              <td>
                {new Date(order.createdAt).toLocaleDateString()}
              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  );

}

export default MyOrders;