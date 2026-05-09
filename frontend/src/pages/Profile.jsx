import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/home.css";

function Profile() {
  const [user, setUser] =
    useState({
      name: "",
      email: "",
      phone: "",
    });

  useEffect(() => {
    const savedUser =
      JSON.parse(
        localStorage.getItem("user")
      );

    if (savedUser) {
      setUser({
        name: savedUser.name || "",
        email: savedUser.email || "",
        phone:
          savedUser.phone || "",
      });
    }
  }, []);

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]:
        e.target.value,
    });
  };

  const saveProfile = () => {
    localStorage.setItem(
      "user",
      JSON.stringify(user)
    );

    alert("Profile updated");
  };

  return (
    <>
      <Navbar />

      <div className="profile-page">
        <div className="profile-card">
          <h1>My Profile</h1>

          <input
            name="name"
            value={user.name}
            placeholder="Full Name"
            onChange={handleChange}
          />

          <input
            name="email"
            value={user.email}
            placeholder="Email"
            onChange={handleChange}
          />

          <input
            name="phone"
            value={user.phone}
            placeholder="Phone Number"
            onChange={handleChange}
          />

          <button
            onClick={saveProfile}
          >
            Save Changes
          </button>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Profile;