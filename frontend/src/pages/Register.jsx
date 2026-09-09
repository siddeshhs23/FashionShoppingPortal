import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";

function Register() {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
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

      const res = await API.post("/auth/register", form);

      alert(res.data.message);

      navigate("/login");

    } catch (err) {

      alert(
        err.response?.data?.message ||
        "Registration Failed"
      );

    }
  };

  return (
    <div className="row justify-content-center">

      <div className="col-md-5">

        <div className="card shadow p-4">

          <h2 className="text-center mb-4">
            Register
          </h2>

          <form onSubmit={handleSubmit}>

            <div className="mb-3">

              <label>Name</label>

              <input
                type="text"
                className="form-control"
                name="name"
                onChange={handleChange}
                required
              />

            </div>

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
              Register
            </button>

          </form>

          <p className="text-center mt-3">

            Already have an account?

            <Link to="/login">
              {" "}Login
            </Link>

          </p>

        </div>

      </div>

    </div>
  );
}

export default Register;