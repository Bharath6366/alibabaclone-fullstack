const express = require("express");
const Order = require("../models/Order");

const sendMail =
  require("../utils/sendMail");

const generateInvoice =
  require("../utils/generateInvoice");

const router = express.Router();

/* CREATE ORDER */
router.post("/create", async (req, res) => {
  try {
    const count =
      await Order.countDocuments();

    const now = new Date();

    const date =
      `${now.getFullYear()}${String(
        now.getMonth() + 1
      ).padStart(2, "0")}${String(
        now.getDate()
      ).padStart(2, "0")}`;

    const orderId =
      `ORD-${date}-${1000 + count}`;

    const customerId =
      `CUS-${1000 + count}`;

    const invoiceId =
      `INV-${5000 + count}`;

    const order =
      await Order.create({
        ...req.body,
        orderId,
        customerId,
        invoiceId,
      });

    const email =
      req.body.email;

    /* Generate invoice PDF */
    const pdfBuffer =
      await generateInvoice(
        order
      );

    /* Send order confirmation mail */
    if (email) {
      try {
        await sendMail({
          to: email,
          customerName:
            order.customerName,
          subject:
            `Order Confirmed - ${order.orderId}`,
          orderId:
            order.orderId,
          status:
            order.status,
          total:
            order.total,
          paymentMethod:
            order.paymentMethod,
          attachments: [
            {
              filename: `Invoice-${order.invoiceId}.pdf`,
              content:
                pdfBuffer.toString(
                  "base64"
                ),
            },
          ],
        });
      } catch (mailErr) {
        console.log(
          "Mail failed:",
          mailErr.message
        );
      }
    }

    res.json(order);
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message:
        "Order creation failed",
    });
  }
});

/* GET USER ORDERS */
router.get(
  "/user",
  async (req, res) => {
    try {
      const orders =
        await Order.find({
          email:
            req.query.email,
        }).sort({
          createdAt: -1,
        });

      res.json(orders);
    } catch (err) {
      console.log(err);

      res.status(500).json({
        message:
          "Cannot fetch user orders",
      });
    }
  }
);

/* GET ALL ORDERS */
router.get("/all", async (req, res) => {
  try {
    const orders =
      await Order.find().sort({
        createdAt: -1,
      });

    const fixedOrders =
      await Promise.all(
        orders.map(
          async (order, index) => {
            let changed = false;

            if (!order.orderId) {
              order.orderId =
                `ORD-${1000 + index}`;
              changed = true;
            }

            if (!order.customerId) {
              order.customerId =
                `CUS-${1000 + index}`;
              changed = true;
            }

            if (!order.invoiceId) {
              order.invoiceId =
                `INV-${5000 + index}`;
              changed = true;
            }

            if (changed) {
              await order.save();
            }

            return order;
          }
        )
      );

    res.json(fixedOrders);
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message:
        "Cannot fetch orders",
    });
  }
});

/* UPDATE STATUS */
router.put(
  "/update/:id",
  async (req, res) => {
    try {
      const order =
        await Order.findById(
          req.params.id
        );

      if (!order) {
        return res
          .status(404)
          .json({
            message:
              "Order not found",
          });
      }

      const nextMap = {
        Pending:
          "Shipped",

        Shipped:
          "Out for Delivery",

        "Out for Delivery":
          "Delivered",

        Delivered:
          null,
      };

      const allowedNext =
        nextMap[
          order.status
        ];

      if (
        req.body.status !==
        allowedNext
      ) {
        return res
          .status(400)
          .json({
            message: `Invalid status change. ${order.status} can only move to ${allowedNext}`,
          });
      }

      order.status =
        req.body.status;

      await order.save();

      if (order.email) {
        try {
          await sendMail({
            to: order.email,
            customerName:
              order.customerName,
            subject:
              `${order.status} • ${order.orderId}`,
            orderId:
              order.orderId,
            status:
              order.status,
            total:
              order.total,
            paymentMethod:
              order.paymentMethod,
          });
        } catch (mailErr) {
          console.log(
            "Mail failed:",
            mailErr.message
          );
        }
      }

      res.json(order);
    } catch (err) {
      console.log(err);

      res.status(500).json({
        message:
          "Status update failed",
      });
    }
  }
);

module.exports = router;