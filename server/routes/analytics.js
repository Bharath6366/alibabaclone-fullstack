const express =
  require("express");
const Product =
  require("../models/Product");
const User =
  require("../models/User");
const Order =
  require("../models/Order");

const router =
  express.Router();

router.get(
  "/",
  async (req, res) => {
    try {
      const products =
        await Product.countDocuments(
          {
            contentType:
              "product",
          }
        );

      const banners =
        await Product.countDocuments(
          {
            contentType:
              "banner",
          }
        );

      const carousels =
        await Product.countDocuments(
          {
            contentType:
              "carousel",
          }
        );

      const users =
        await User.countDocuments();

      const orders =
        await Order.countDocuments();

      const delivered =
        await Order.countDocuments(
          {
            status:
              "Delivered",
          }
        );

      const revenueData =
        await Order.aggregate([
          {
            $match: {
              status: {
                $in: [
                  "Delivered",
                  "Out for Delivery",
                  "Shipped",
                ],
              },
            },
          },
          {
            $group: {
              _id: null,
              total: {
                $sum:
                  "$total",
              },
            },
          },
        ]);

      const revenue =
        revenueData[0]
          ?.total || 0;

      const lowStock =
        await Product.find({
          contentType:
            "product",
          stock: {
            $lt: 10,
          },
        }).limit(5);

      const categoryStats =
        await Product.aggregate([
          {
            $match: {
              contentType:
                "product",
            },
          },
          {
            $group: {
              _id: "$category",
              count: {
                $sum: 1,
              },
            },
          },
        ]);

      const statusStats =
        await Order.aggregate([
          {
            $group: {
              _id: "$status",
              count: {
                $sum: 1,
              },
            },
          },
        ]);

      const monthlySales =
        await Order.aggregate([
          {
            $group: {
              _id: {
                $month:
                  "$createdAt",
              },
              sales: {
                $sum:
                  "$total",
              },
            },
          },
          {
            $sort: {
              _id: 1,
            },
          },
        ]);

      const monthNames =
        [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ];

      const formattedSales =
        monthlySales.map(
          (m) => ({
            month:
              monthNames[
                m._id -
                  1
              ],
            sales:
              m.sales,
          })
        );

      res.json({
        products,
        banners,
        carousels,
        users,
        orders,
        delivered,
        revenue,
        lowStock,
        categoryStats,
        statusStats,
        monthlySales:
          formattedSales,
      });
    } catch (err) {
      console.log(err);

      res.status(500).json({
        message:
          "Analytics failed",
      });
    }
  }
);

module.exports =
  router;