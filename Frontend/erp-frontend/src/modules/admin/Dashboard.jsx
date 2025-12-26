// src/modules/admin/AdminDashboard.jsx
import React, { useEffect, useState } from "react";
import HRM from "../../services/hrmApi";
import Inventory from "../../services/inventoryApi";
import OrderAPI from "../../services/orderApi";
import FinanceAPI from "../../services/financeApi";

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

import {
  UserGroupIcon,
  ShoppingCartIcon,
  CurrencyRupeeIcon,
  CubeIcon,
  TruckIcon,
  ClipboardDocumentCheckIcon,
  ChartPieIcon,
} from "@heroicons/react/24/outline";

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend);

export default function AdminDashboard() {
  const [totalEmployees, setTotalEmployees] = useState(0);
  const [pendingOrders, setPendingOrders] = useState(0);
  const [revenue, setRevenue] = useState(0);

  const [orderStatusData, setOrderStatusData] = useState({ labels: [], datasets: [] });
  const [revenueSplitData, setRevenueSplitData] = useState({ labels: [], datasets: [] });

  useEffect(() => {
    fetchHRM();
    fetchOrders();
    fetchFinance();
  }, []);

  const fetchHRM = async () => {
    try {
      const res = await HRM.getEmployees();
      const employees = Array.isArray(res.data) ? res.data : [];
      setTotalEmployees(employees.length);
    } catch (err) {
      setTotalEmployees(0);
    }
  };

  const fetchOrders = async () => {
    try {
      const res = await OrderAPI.getOrders();
      const orders = Array.isArray(res.data) ? res.data : [];
      setPendingOrders(orders.filter((o) => o.status === "pending").length);

      const statusCounts = orders.reduce((acc, curr) => {
        acc[curr.status] = (acc[curr.status] || 0) + 1;
        return acc;
      }, {});

      if (Object.keys(statusCounts).length) {
        setOrderStatusData({
          labels: Object.keys(statusCounts),
          datasets: [
            {
              label: "Orders",
              data: Object.values(statusCounts),
              backgroundColor: ["#3b82f6", "#facc15", "#10b981", "#ef4444", "#8b5cf6"],
              borderRadius: 8,
            },
          ],
        });
      }
    } catch {
      setPendingOrders(0);
      setOrderStatusData({ labels: [], datasets: [] });
    }
  };

  const fetchFinance = async () => {
    try {
      const res = await FinanceAPI.getRevenue();
      const total = res.data?.total || 0;
      setRevenue(total);

      const split = res.data?.split || {};
      if (Object.keys(split).length) {
        setRevenueSplitData({
          labels: Object.keys(split),
          datasets: [
            {
              data: Object.values(split),
              backgroundColor: ["#3b82f6", "#f59e0b", "#10b981", "#ef4444", "#8b5cf6", "#06b6d4"],
            },
          ],
        });
      }
    } catch {
      setRevenue(0);
      setRevenueSplitData({ labels: [], datasets: [] });
    }
  };

  const modules = [
    { name: "HRM", path: "/hrm/dashboard", icon: <UserGroupIcon className="h-8 w-8 text-blue-600" /> },
    { name: "Orders", path: "/orders/dashboard", icon: <ShoppingCartIcon className="h-8 w-8 text-yellow-500" /> },
    { name: "Inventory", path: "/inventory/dashboard", icon: <CubeIcon className="h-8 w-8 text-purple-600" /> },
    { name: "Supply", path: "/supply/dashboard", icon: <TruckIcon className="h-8 w-8 text-green-500" /> },
    { name: "Finance", path: "/finance/dashboard", icon: <CurrencyRupeeIcon className="h-8 w-8 text-teal-600" /> },
    { name: "CRM", path: "/crm/dashboard", icon: <ClipboardDocumentCheckIcon className="h-8 w-8 text-pink-600" /> },
  ];

  return (
    <div className="space-y-10 p-6 bg-gradient-to-b from-gray-50 to-gray-100 min-h-screen">
      {/* Header */}
      <h1 className="text-4xl font-bold text-gray-800">Admin Dashboard</h1>

      {/* Stats */}
      <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
        <Card
          title="Total Employees"
          value={totalEmployees}
          icon={<UserGroupIcon className="h-10 w-10 text-white" />}
          gradient="from-blue-500 to-blue-400"
        />
        <Card
          title="Pending Orders"
          value={pendingOrders}
          icon={<ShoppingCartIcon className="h-10 w-10 text-white" />}
          gradient="from-yellow-400 to-yellow-300"
        />
        <Card
          title="Revenue (₹)"
          value={revenue}
          icon={<CurrencyRupeeIcon className="h-10 w-10 text-white" />}
          gradient="from-teal-500 to-teal-400"
        />
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-6">
        <ChartCard
          title="Order Status"
          chart={
            orderStatusData.labels.length ? (
              <Bar
                data={orderStatusData}
                options={{
                  responsive: true,
                  plugins: { legend: { position: "top" } },
                }}
              />
            ) : (
              <div className="text-gray-400 text-center p-10">No order data available</div>
            )
          }
        />
        <ChartCard
          title="Revenue Split"
          chart={
            revenueSplitData.labels.length ? (
              <Pie
                data={revenueSplitData}
                options={{
                  responsive: true,
                  plugins: { legend: { position: "bottom" } },
                }}
              />
            ) : (
              <div className="text-gray-400 text-center p-10">No revenue data available</div>
            )
          }
        />
      </div>

      {/* Modules */}
      <div className="grid md:grid-cols-3 gap-6">
        {modules.map((m) => (
          <a
            key={m.name}
            href={m.path}
            className="flex items-center gap-4 p-6 bg-white rounded-2xl shadow hover:shadow-2xl hover:scale-105 transition-transform border border-gray-100"
          >
            <div className="bg-gray-50 p-3 rounded-full shadow">{m.icon}</div>
            <div>
              <div className="text-lg font-semibold text-gray-800">{m.name}</div>
              <div className="text-sm text-gray-500">Open {m.name} module</div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

// ---------------- Components ----------------
function Card({ title, value, icon, gradient }) {
  return (
    <div
      className={`flex items-center justify-between p-6 rounded-2xl shadow-lg text-white bg-gradient-to-r ${gradient} transform hover:scale-105 transition-transform`}
    >
      <div>
        <div className="text-sm opacity-80">{title}</div>
        <div className="text-3xl font-bold mt-1">{value}</div>
      </div>
      <div className="p-4 bg-white/20 rounded-full">{icon}</div>
    </div>
  );
}

function ChartCard({ title, chart }) {
  return (
    <div className="p-6 bg-white rounded-2xl shadow-lg border border-gray-100">
      <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
        <ChartPieIcon className="h-6 w-6 text-indigo-600" /> {title}
      </h3>
      {chart}
    </div>
  );
}
