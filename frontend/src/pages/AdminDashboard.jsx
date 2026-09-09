import { useEffect, useState } from "react";
import API from "../services/api";

function AdminDashboard() {

  const [stats, setStats] = useState({
    totalProducts: 0,
    totalUsers: 0,
    totalOrders: 0,
    totalRevenue: 0,
  });

  useEffect(() => {
    const loadStats = async () => {
      try {
        const res = await API.get("/dashboard");
        setStats(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    loadStats();
  }, []);

  return (

    <div className="container mt-5">

      <h2 className="text-center mb-5">
        Admin Dashboard
      </h2>

      <div className="row">

        <div className="col-md-3 mb-4">

          <div className="card shadow text-center p-4">

            <h3>📦</h3>

            <h4>{stats.totalProducts}</h4>

            <p>Total Products</p>

          </div>

        </div>

        <div className="col-md-3 mb-4">

          <div className="card shadow text-center p-4">

            <h3>👥</h3>

            <h4>{stats.totalUsers}</h4>

            <p>Total Users</p>

          </div>

        </div>

        <div className="col-md-3 mb-4">

          <div className="card shadow text-center p-4">

            <h3>🛒</h3>

            <h4>{stats.totalOrders}</h4>

            <p>Total Orders</p>

          </div>

        </div>

        <div className="col-md-3 mb-4">

          <div className="card shadow text-center p-4">

            <h3>💰</h3>

            <h4>₹{stats.totalRevenue}</h4>

            <p>Total Revenue</p>

          </div>

        </div>

      </div>

    </div>

  );

}

export default AdminDashboard;