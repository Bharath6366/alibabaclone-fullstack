import { useState } from "react";
import axios from "axios";
import "../styles/login.css";

function Login() {
  const [mode, setMode] =
    useState("signup");

  const [step, setStep] =
    useState(1);

  const [form, setForm] =
    useState({
      name: "",
      email: "",
      otp: "",
    });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.value,
    });
  };

  const sendOtp =
    async (e) => {
      e.preventDefault();

      try {
        const res =
          await axios.post(
            `${import.meta.env.VITE_API_URL}/api/auth/send-otp`,
            {
              name: form.name,
              email:
                form.email,
              mode,
            }
          );

        alert(
          res.data.message
        );

        setStep(2);
      } catch (err) {
        alert(
          err.response?.data
            ?.message ||
            "Failed to send OTP"
        );
      }
    };

  const verifyOtp =
    async (e) => {
      e.preventDefault();

      try {
        const res =
          await axios.post(
            `${import.meta.env.VITE_API_URL}/api/auth/verify-otp`,
            {
              email:
                form.email,
              otp: form.otp,
            }
          );

        localStorage.setItem(
          "token",
          res.data.token
        );

        localStorage.setItem(
          "user",
          JSON.stringify(
            res.data.user
          )
        );

        alert(
          "Login successful"
        );
      } catch (err) {
        alert(
          err.response?.data
            ?.message ||
            "Invalid OTP"
        );
      }
    };

  return (
    <div className="login-page">
      <div className="login-box">
        <h1>
          Alibaba Clone
        </h1>

        <div className="tabs">
          <button
            type="button"
            className={
              mode ===
              "signup"
                ? "active"
                : ""
            }
            onClick={() => {
              setMode(
                "signup"
              );
              setStep(1);
            }}
          >
            Signup
          </button>

          <button
            type="button"
            className={
              mode ===
              "login"
                ? "active"
                : ""
            }
            onClick={() => {
              setMode(
                "login"
              );
              setStep(1);
            }}
          >
            Login
          </button>
        </div>

        {step === 1 ? (
          <form
            onSubmit={
              sendOtp
            }
          >
            {mode ===
              "signup" && (
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={
                  form.name
                }
                onChange={
                  handleChange
                }
                required
              />
            )}

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={
                form.email
              }
              onChange={
                handleChange
              }
              required
            />

            <button className="main-btn">
              Send OTP
            </button>
          </form>
        ) : (
          <form
            onSubmit={
              verifyOtp
            }
          >
            <input
              type="text"
              name="otp"
              placeholder="Enter OTP"
              value={
                form.otp
              }
              onChange={
                handleChange
              }
              required
            />

            <button className="main-btn">
              Verify OTP
            </button>
          </form>
        )}

        <div className="divider">
          OR
        </div>

        <button
          type="button"
          className="social google"
        >
          <span className="icon">
            G
          </span>
          Continue with Google
        </button>

        <button
          type="button"
          className="social facebook"
        >
          <span className="icon">
            f
          </span>
          Continue with Facebook
        </button>
      </div>
    </div>
  );
}

export default Login;