const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    contentType: {
      type: String,
      enum: [
        "product",
        "banner",
        "carousel",
      ],
      default: "product",
    },

    name: String,
    category: String,
    brand: String,
    price: Number,
    salePrice: Number,
    stock: Number,
    description: String,
    tags: [String],

    bannerTitle: String,
    bannerSubtitle: String,

    carouselTitle: String,

    images: [String],

    active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Product",
  productSchema
);