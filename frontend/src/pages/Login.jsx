import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";
import { useAuth } from "../context/AuthContext";

function Login() {

  const navigate = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const res = await API.post("/auth/login", form);

      localStorage.setItem("token", res.data.token);

      localStorage.setItem("user", JSON.stringify(res.data.user));
      login(res.data.user);

      alert("Login Successful");

      navigate("/");

    } catch (err) {

      alert(
        err.response?.data?.message ||
        "Invalid Email or Password"
      );

    }

  };

  return (

    <div className="row justify-content-center">

      <div className="col-md-5">

        <div className="card shadow-lg p-4">

          <h2 className="text-center mb-4">
            Login
          </h2>

          <form onSubmit={handleSubmit}>

            <div className="mb-3">

              <label>Email</label>

              <input
                type="email"
                className="form-control"
                name="email"
                onChange={handleChange}
                required
              />

            </div>

            <div className="mb-3">

              <label>Password</label>

              <input
                type="password"
                className="form-control"
                name="password"
                onChange={handleChange}
                required
              />

            </div>

            <button className="btn btn-dark w-100">
              Login
            </button>

          </form>

          <p className="text-center mt-3">

            Don't have an account?

            <Link to="/register">
              {" "}Register
            </Link>

          </p>

        </div>

      </div>

    </div>

  );

}

export default Login;