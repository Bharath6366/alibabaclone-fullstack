const mongoose =
  require("mongoose");

const orderSchema =
  new mongoose.Schema(
    {
      /* Professional IDs */
      orderId: {
        type: String,
        unique: true,
      },

      customerId: {
        type: String,
      },

      invoiceId: {
        type: String,
      },

      /* User info */
      userId: String,
      customerName: String,
      email: String,

      /* Ordered items */
      items: [
        {
          name: String,
          price: Number,
          salePrice: Number,
          quantity: Number,
          images: [String],
        },
      ],

      /* Delivery address */
      address: {
        name: String,
        phone: String,
        house: String,
        area: String,
        landmark: String,
        city: String,
        state: String,
        pincode: String,
      },

      /* Payment */
      total: Number,
      paymentMethod: String,

      /* Order flow */
      status: {
        type: String,
        default: "Pending",
      },
    },
    {
      timestamps: true,
    }
  );

module.exports =
  mongoose.model(
    "Order",
    orderSchema
  );