require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const authRoutes = require("./routes/auth");
const adminRoutes = require("./routes/admin");
const productRoutes = require("./routes/product");
const analyticsRoutes = require("./routes/analytics");
const paymentRoutes = require("./routes/payment");
const orderRoutes = require("./routes/orders");

const app = express();

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() =>
    console.log("MongoDB Connected")
  )
  .catch((err) =>
    console.log(
      "Mongo Error:",
      err.message
    )
  );

app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/products", productRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/orders", orderRoutes);

app.get("/", (req, res) => {
  res.send("Backend Running");
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});