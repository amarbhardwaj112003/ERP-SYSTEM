// ----------------------------------------------
// CRM DASHBOARD – MODERN & STYLISH VERSION
// ----------------------------------------------

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import crmApi from "../../services/crmApi";

// Recharts
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from "recharts";

// Heroicons
import {
  UserGroupIcon,
  UserPlusIcon,
  ClipboardDocumentCheckIcon,
  MegaphoneIcon
} from "@heroicons/react/24/outline";

// Framer Motion
import { motion } from "framer-motion";

export default function Dashboard() {
  const [stats, setStats] = useState({
    total_customers: 0,
    total_leads: 0,
    total_tickets: 0,
    total_campaigns: 0,
  });

  const [leadChart, setLeadChart] = useState([]);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const response = await crmApi.getDashboardStats();
      setStats(response.data.stats);
      setLeadChart(response.data.monthly_leads);
    } catch (error) {
      console.error("Error loading dashboard:", error);
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const cardData = [
    {
      title: "Total Customers",
      count: stats.total_customers,
      color: "from-blue-500 to-blue-700",
      icon: UserGroupIcon,
      link: "/crm/customers",
    },
    {
      title: "Total Leads",
      count: stats.total_leads,
      color: "from-green-500 to-green-700",
      icon: UserPlusIcon,
      link: "/crm/leads",
    },
    {
      title: "Support Tickets",
      count: stats.total_tickets,
      color: "from-red-500 to-red-700",
      icon: ClipboardDocumentCheckIcon,
      link: "/crm/tickets",
    },
    {
      title: "Marketing Campaigns",
      count: stats.total_campaigns,
      color: "from-purple-500 to-purple-700",
      icon: MegaphoneIcon,
      link: "/crm/campaigns",
    },
  ];

  return (
    <div className="p-6 space-y-6">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-bold text-gray-800"
      >
        CRM Dashboard
      </motion.h1>

      {/* Top Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {cardData.map((card, idx) => {
          const Icon = card.icon;
          return (
            <motion.div
              key={idx}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: idx * 0.1 }}
              className={`p-6 rounded-2xl shadow-xl text-white bg-gradient-to-br ${card.color} hover:scale-105 transform transition relative overflow-hidden`}
            >
              <div className="absolute top-4 right-4 opacity-20 w-16 h-16">
                <Icon className="w-full h-full" />
              </div>
              <p className="text-sm font-medium">{card.title}</p>
              <h2 className="text-3xl font-bold mt-2">{card.count}</h2>
              <Link
                to={card.link}
                className="mt-4 inline-block text-white font-medium hover:underline"
              >
                View Details →
              </Link>
            </motion.div>
          );
        })}
      </div>

      {/* Add Buttons */}
      <div className="flex flex-wrap gap-4">
        <Link
          to="/crm/customers/add"
          className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition flex items-center gap-2"
        >
          <UserPlusIcon className="w-5 h-5"/> Add Customer
        </Link>

        <Link
          to="/crm/leads/add"
          className="px-4 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition flex items-center gap-2"
        >
          <UserPlusIcon className="w-5 h-5"/> Add Lead
        </Link>

        <Link
          to="/crm/tickets/add"
          className="px-4 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 transition flex items-center gap-2"
        >
          <ClipboardDocumentCheckIcon className="w-5 h-5"/> Add Ticket
        </Link>

        <Link
          to="/crm/campaigns/add"
          className="px-4 py-2 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition flex items-center gap-2"
        >
          <MegaphoneIcon className="w-5 h-5"/> Add Campaign
        </Link>
      </div>

      {/* Lead Growth Chart */}
      <div className="bg-white p-6 rounded-2xl shadow-xl border">
        <h2 className="text-xl font-semibold mb-4">Monthly Lead Growth</h2>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={leadChart} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="url(#leadGradient)" radius={[8, 8, 0, 0]} />
              <defs>
                <linearGradient id="leadGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.8}/>
                  <stop offset="100%" stopColor="#60a5fa" stopOpacity={0.5}/>
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
