const express = require("express");
const Product = require("../models/Product");

const router = express.Router();

/* ADD */
router.post("/add", async (req, res) => {
  try {
    const product = await Product.create(req.body);

    res.json({
      message: "Saved successfully",
      product,
    });
  } catch (err) {
    res.status(500).json({
      message: "Failed",
    });
  }
});

/* GET ALL */
router.get("/", async (req, res) => {
  try {
    const products = await Product.find().sort({
      createdAt: -1,
    });

    res.json(products);
  } catch (err) {
    res.status(500).json({
      message: "Error",
    });
  }
});

/* UPDATE */
router.put("/:id", async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json({
      message: "Updated",
      updated,
    });
  } catch (err) {
    res.status(500).json({
      message: "Update failed",
    });
  }
});

/* DELETE */
router.delete("/:id", async (req, res) => {
  try {
    await Product.findByIdAndDelete(
      req.params.id
    );

    res.json({
      message: "Deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      message: "Delete failed",
    });
  }
});

module.exports = router;