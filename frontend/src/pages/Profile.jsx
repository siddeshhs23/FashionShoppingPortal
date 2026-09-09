import { useEffect, useState } from "react";
import API from "../services/api";

function Profile() {

  const [user, setUser] = useState(null);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await API.get("/auth/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(res.data.user);
      } catch (error) {
        console.log(error);
        alert("Please Login First");
      }
    };

    loadProfile();
  }, []);

  if (!user) {
    return (
      <h3 className="text-center mt-5">
        Loading Profile...
      </h3>
    );
  }

  return (

    <div className="container mt-5">

      <div className="card shadow p-4">

        <h2 className="text-center mb-4">
          My Profile
        </h2>

        <table className="table">

          <tbody>

            <tr>
              <th>Name</th>
              <td>{user.name}</td>
            </tr>

            <tr>
              <th>Email</th>
              <td>{user.email}</td>
            </tr>

            <tr>
              <th>Role</th>
              <td>{user.role}</td>
            </tr>

            <tr>
              <th>User ID</th>
              <td>{user._id}</td>
            </tr>

          </tbody>

        </table>

      </div>

    </div>

  );

}

export default Profile;