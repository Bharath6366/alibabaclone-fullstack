import {
  useEffect,
  useState,
} from "react";
import axios from "axios";
import {
  FaBoxOpen,
  FaUsers,
  FaShoppingCart,
  FaRupeeSign,
} from "react-icons/fa";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
  CartesianGrid,
} from "recharts";

import "../styles/dashboard.css";

function Dashboard() {
  const [stats, setStats] =
    useState({
      products: 0,
      users: 0,
      orders: 0,
      revenue: 0,
      delivered: 0,
      lowStock: [],
      monthlySales: [],
      statusStats: [],
    });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats =
    async () => {
      try {
        const res =
          await axios.get(
            "http://localhost:5000/api/analytics"
          );

        setStats(res.data);
      } catch (err) {
        console.log(err);
      }
    };

  return (
    <div className="dashboard-page">
      {/* HERO */}
      <div className="welcome-box">
        <h1>
          Welcome back,
          Admin 
        </h1>

        <p>
          Here's your complete
          store overview with
          live insights.
        </p>
      </div>

      {/* MAIN STATS */}
      <div className="top-cards">
        <div className="stat-card revenue-card">
          <FaRupeeSign />

          <h3>
            Total Revenue
          </h3>

          <p>
            ₹
            {stats.revenue.toLocaleString()}
          </p>
        </div>

        <div className="stat-card">
          <FaShoppingCart />

          <h3>
            Total Orders
          </h3>

          <p>
            {stats.orders}
          </p>
        </div>

        <div className="stat-card">
          <FaBoxOpen />

          <h3>
            Delivered
          </h3>

          <p>
            {
              stats.delivered
            }
          </p>
        </div>

        <div className="stat-card">
          <FaUsers />

          <h3>
            Pending /
            Active
          </h3>

          <p>
            {stats.orders -
              stats.delivered}
          </p>
        </div>
      </div>

      {/* SECONDARY */}
      <div className="small-cards">
        <div className="mini-stat">
          <h4>
            Products
          </h4>

          <p>
            {
              stats.products
            }
          </p>
        </div>

        <div className="mini-stat">
          <h4>
            Users
          </h4>

          <p>
            {stats.users}
          </p>
        </div>

        <div className="mini-stat">
          <h4>
            Low Stock
          </h4>

          <p>
            {
              stats.lowStock
                .length
            }
          </p>
        </div>
      </div>

      {/* CHARTS */}
      <div className="analytics-grid">
        {/* SALES */}
        <div className="chart-box">
          <div className="chart-head">
            <div>
              <p>
                Revenue
                Analytics
              </p>

              <h2>
                Monthly
                Sales Trend
              </h2>
            </div>

            <span className="chart-badge blue">
              Live
            </span>
          </div>

          <ResponsiveContainer
            width="100%"
            height={330}
          >
            <LineChart
              data={
                stats.monthlySales
              }
            >
              <CartesianGrid
                strokeDasharray="4 4"
                stroke="#eef2f7"
              />

              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tick={{
                  fill:
                    "#64748b",
                  fontSize: 13,
                  fontWeight: 600,
                }}
              />

              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{
                  fill:
                    "#64748b",
                  fontSize: 13,
                }}
              />

              <Tooltip
                formatter={(
                  value
                ) =>
                  `₹${value}`
                }
                contentStyle={{
                  border:
                    "none",
                  borderRadius:
                    "18px",
                  boxShadow:
                    "0 18px 40px rgba(0,0,0,.12)",
                }}
              />

              <Line
                type="monotone"
                dataKey="sales"
                stroke="#2563eb"
                strokeWidth={3}
                dot={{
                  r: 5,
                  fill:
                    "#2563eb",
                  stroke:
                    "#fff",
                  strokeWidth: 3,
                }}
                activeDot={{
                  r: 8,
                  fill:
                    "#ff6a00",
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* STATUS */}
        <div className="chart-box">
          <div className="chart-head">
            <div>
              <p>
                Order
                Insights
              </p>

              <h2>
                Order
                Status
              </h2>
            </div>

            <span className="chart-badge orange">
              Updated
            </span>
          </div>

          <ResponsiveContainer
            width="100%"
            height={330}
          >
            <BarChart
              data={
                stats.statusStats
              }
              barCategoryGap={
                80
              }
            >
              <CartesianGrid
                strokeDasharray="4 4"
                stroke="#eef2f7"
              />

              <XAxis
                dataKey="_id"
                axisLine={false}
                tickLine={false}
                tick={{
                  fill:
                    "#64748b",
                  fontSize: 13,
                  fontWeight: 600,
                }}
              />

              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{
                  fill:
                    "#64748b",
                  fontSize: 13,
                }}
              />

              <Tooltip
                contentStyle={{
                  border:
                    "none",
                  borderRadius:
                    "18px",
                  boxShadow:
                    "0 18px 40px rgba(0,0,0,.12)",
                }}
              />

              <Bar
                dataKey="count"
                fill="#ff6a00"
                radius={[
                  30,
                  30,
                  8,
                  8,
                ]}
                barSize={34}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* LOW STOCK */}
      <div className="low-stock-box">
        <h2>
          Low Stock
          Products
        </h2>

        {stats.lowStock
          .length === 0 ? (
          <p>
            No low stock
            products
          </p>
        ) : (
          stats.lowStock.map(
            (
              item
            ) => (
              <div
                key={
                  item._id
                }
                className="low-item"
              >
                <span>
                  {
                    item.name
                  }
                </span>

                <b>
                  {
                    item.stock
                  }{" "}
                  left
                </b>
              </div>
            )
          )
        )}
      </div>
    </div>
  );
}

export default Dashboard;