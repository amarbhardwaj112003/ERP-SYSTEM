// src/modules/admin/AdminDashboard.jsx
import React, { useEffect, useState } from "react";
import HRM from "../../services/hrmApi";
import Inventory from "../../services/inventoryApi";
import OrderAPI from "../../services/orderApi";
import FinanceAPI from "../../services/financeApi";
// import CRMAPI from "../../services/crmApi";
// import SupplyAPI from "../../services/supplyApi";

import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend);

export default function AdminDashboard() {
  // Stats
  const [totalEmployees, setTotalEmployees] = useState(0);
  const [pendingOrders, setPendingOrders] = useState(0);
  const [revenue, setRevenue] = useState(0);

  // Charts
  const [orderStatusData, setOrderStatusData] = useState({});
  const [revenueSplitData, setRevenueSplitData] = useState({});

  useEffect(() => {
    fetchHRM();
    fetchOrders();
    fetchFinance();
  }, []);

  // --- HRM ---
  const fetchHRM = async () => {
    try {
      const res = await HRM.getEmployees();
      // Safe check: ensure data is an array
      const employees = Array.isArray(res.data) ? res.data : [];
      setTotalEmployees(employees.length);
    } catch (err) {
      console.error("HRM fetch error:", err);
      setTotalEmployees(0); // default to 0 if API fails
    }
  };

  // --- Orders ---
  const fetchOrders = async () => {
    try {
      const res = await OrderAPI.getOrders();
      const orders = Array.isArray(res.data) ? res.data : [];

      const pending = orders.filter((o) => o.status === "pending").length;
      setPendingOrders(pending);

      // Bar chart: order status
      const statusCounts = orders.reduce((acc, curr) => {
        acc[curr.status] = (acc[curr.status] || 0) + 1;
        return acc;
      }, {});

      setOrderStatusData({
        labels: Object.keys(statusCounts),
        datasets: [
          {
            label: "Orders",
            data: Object.values(statusCounts),
            backgroundColor: ["#3b82f6", "#facc15", "#10b981", "#ef4444", "#8b5cf6"],
          },
        ],
      });
    } catch (err) {
      console.error("Orders fetch error:", err);
      setPendingOrders(0);
    }
  };

  // --- Finance ---
  const fetchFinance = async () => {
    try {
      const res = await FinanceAPI.getRevenue(); // API must return { total, split }
      const total = res.data?.total || 0;
      setRevenue(total);

      setRevenueSplitData({
        labels: Object.keys(res.data?.split || {}),
        datasets: [
          {
            data: Object.values(res.data?.split || {}),
            backgroundColor: ["#3b82f6", "#f59e0b", "#10b981", "#ef4444", "#8b5cf6", "#06b6d4"],
          },
        ],
      });
    } catch (err) {
      console.error("Finance fetch error:", err);
      setRevenue(0);
    }
  };

  const modules = [
    { name: "HRM", path: "/hrm/dashboard" },
    { name: "Orders", path: "/orders/dashboard" },
    { name: "Inventory", path: "/inventory/dashboard" },
    { name: "Supply", path: "/supply/dashboard" },
    { name: "Finance", path: "/finance/dashboard" },
    { name: "CRM", path: "/crm/dashboard" },
  ];

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
        <div className="p-4 rounded-xl border bg-white shadow">
          <div className="text-sm text-gray-500">Total Employees</div>
          <div className="text-3xl font-semibold">{totalEmployees}</div>
        </div>
        <div className="p-4 rounded-xl border bg-white shadow">
          <div className="text-sm text-gray-500">Pending Orders</div>
          <div className="text-3xl font-semibold">{pendingOrders}</div>
        </div>
        <div className="p-4 rounded-xl border bg-white shadow">
          <div className="text-sm text-gray-500">Revenue (₹)</div>
          <div className="text-3xl font-semibold">{revenue}</div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-4">
        <div className="p-4 rounded-xl border bg-white min-h-[260px]">
          <h3 className="text-lg font-semibold mb-2">Order Status</h3>
          {orderStatusData?.labels?.length ? (
            <Bar data={orderStatusData} />
          ) : (
            <div className="text-gray-400">No data</div>
          )}
        </div>

        <div className="p-4 rounded-xl border bg-white min-h-[260px]">
          <h3 className="text-lg font-semibold mb-2">Revenue Split</h3>
          {revenueSplitData?.labels?.length ? (
            <Pie data={revenueSplitData} />
          ) : (
            <div className="text-gray-400">No data</div>
          )}
        </div>
      </div>

      {/* Modules Navigation */}
      <div className="grid md:grid-cols-3 gap-4">
        {modules.map((m) => (
          <a
            key={m.name}
            href={m.path}
            className="p-4 rounded-xl border bg-white hover:shadow-lg transition-all"
          >
            <div className="text-lg font-semibold">{m.name}</div>
            <div className="text-gray-500 text-sm">Open {m.name} module</div>
          </a>
        ))}
      </div>
    </div>
  );
}
