import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {
  FaMapMarkerAlt,
  FaTrash,
  FaCheckCircle,
} from "react-icons/fa";
import "../styles/home.css";

function Addresses() {
  const [addresses, setAddresses] =
    useState([]);

  const [form, setForm] =
    useState({
      name: "",
      phone: "",
      pincode: "",
      house: "",
      area: "",
      landmark: "",
      city: "",
      state: "",
      type: "Home",
    });

  useEffect(() => {
    const saved =
      JSON.parse(
        localStorage.getItem(
          "addresses"
        )
      ) || [];

    setAddresses(saved);
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.value,
    });
  };

  const addAddress = () => {
    const newAddress = {
      id: Date.now(),
      ...form,
      default:
        addresses.length === 0,
    };

    const updated = [
      ...addresses,
      newAddress,
    ];

    setAddresses(updated);

    localStorage.setItem(
      "addresses",
      JSON.stringify(updated)
    );

    setForm({
      name: "",
      phone: "",
      pincode: "",
      house: "",
      area: "",
      landmark: "",
      city: "",
      state: "",
      type: "Home",
    });
  };

  const removeAddress = (id) => {
    const updated =
      addresses.filter(
        (a) => a.id !== id
      );

    setAddresses(updated);

    localStorage.setItem(
      "addresses",
      JSON.stringify(updated)
    );
  };

  const setDefault = (id) => {
    const updated =
      addresses.map((a) => ({
        ...a,
        default: a.id === id,
      }));

    setAddresses(updated);

    localStorage.setItem(
      "addresses",
      JSON.stringify(updated)
    );
  };

  return (
    <>
      <Navbar />

      <div className="address-page">
        <div className="address-form">
          <h1>Add Address</h1>

          <input
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
          />

          <input
            name="phone"
            placeholder="Phone"
            value={form.phone}
            onChange={handleChange}
          />

          <input
            name="pincode"
            placeholder="Pincode"
            value={form.pincode}
            onChange={handleChange}
          />

          <input
            name="house"
            placeholder="House No"
            value={form.house}
            onChange={handleChange}
          />

          <input
            name="area"
            placeholder="Area / Street"
            value={form.area}
            onChange={handleChange}
          />

          <input
            name="landmark"
            placeholder="Landmark"
            value={form.landmark}
            onChange={handleChange}
          />

          <input
            name="city"
            placeholder="City"
            value={form.city}
            onChange={handleChange}
          />

          <input
            name="state"
            placeholder="State"
            value={form.state}
            onChange={handleChange}
          />

          <select
            name="type"
            value={form.type}
            onChange={handleChange}
          >
            <option>Home</option>
            <option>Office</option>
          </select>

          <button
            onClick={addAddress}
          >
            Save Address
          </button>
        </div>

        <div className="saved-addresses">
          <h1>Saved Addresses</h1>

          {addresses.map((a) => (
            <div
              className="address-card"
              key={a.id}
            >
              <div>
                <h3>
                  <FaMapMarkerAlt />
                  {a.name} ({a.type})
                </h3>

                <p>
                  {a.house},{" "}
                  {a.area},{" "}
                  {a.city},{" "}
                  {a.state} -
                  {a.pincode}
                </p>

                <small>
                  {a.phone}
                </small>
              </div>

              <div className="address-actions">
                {!a.default && (
                  <button
                    className="default-btn"
                    onClick={() =>
                      setDefault(
                        a.id
                      )
                    }
                  >
                    <FaCheckCircle />
                  </button>
                )}

                <button
                  className="remove-btn"
                  onClick={() =>
                    removeAddress(
                      a.id
                    )
                  }
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Addresses;