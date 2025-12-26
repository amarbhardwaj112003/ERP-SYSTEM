// src/modules/hr/HRDashboard.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import CountUp from "react-countup";
import HRM from "../../services/hrmApi";

// Heroicons
import {
  UserGroupIcon,
  BuildingLibraryIcon,
  CalendarDaysIcon,
  DocumentTextIcon,
  CurrencyRupeeIcon,
  ClipboardDocumentCheckIcon,
  StarIcon,
} from "@heroicons/react/24/outline";

export default function HRDashboard() {
  const [totalEmployees, setTotalEmployees] = useState(0);
  const [totalDepartments, setTotalDepartments] = useState(0);
  const [pendingLeaves, setPendingLeaves] = useState(0);

  useEffect(() => {
    loadDashboardStats();
  }, []);

  const loadDashboardStats = async () => {
    try {
      const empRes = await HRM.getEmployees();
      setTotalEmployees(empRes.data.length);

      const deptRes = await HRM.getDepartments();
      setTotalDepartments(deptRes.data.length);

      const leaveRes = await HRM.getLeaves();
      const pending = leaveRes.data.filter((l) => l.status === "pending").length;
      setPendingLeaves(pending);
    } catch (err) {
      console.error("Error loading dashboard stats:", err);
    }
  };

  // Card animation
  const cardAnim = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } };

  const stats = [
    {
      title: "Total Employees",
      value: totalEmployees,
      icon: <UserGroupIcon className="h-14 w-14 text-white opacity-20" />,
      gradient: "from-blue-500 to-blue-700",
    },
    {
      title: "Departments",
      value: totalDepartments,
      icon: <BuildingLibraryIcon className="h-14 w-14 text-white opacity-20" />,
      gradient: "from-green-500 to-green-700",
    },
    {
      title: "Pending Leaves",
      value: pendingLeaves,
      icon: <CalendarDaysIcon className="h-14 w-14 text-white opacity-20" />,
      gradient: "from-purple-500 to-purple-700",
    },
  ];

  const quickLinks = [
    { label: "Departments", path: "/hr/departments", icon: <BuildingLibraryIcon className="h-6 w-6 text-indigo-500" /> },
    { label: "Employees", path: "/hr/employees", icon: <UserGroupIcon className="h-6 w-6 text-blue-500" /> },
    { label: "Attendance", path: "/hr/attendance", icon: <CalendarDaysIcon className="h-6 w-6 text-green-500" /> },
    { label: "Leaves", path: "/hr/leaves", icon: <ClipboardDocumentCheckIcon className="h-6 w-6 text-purple-500" /> },
    { label: "Salaries", path: "/hr/salaries", icon: <CurrencyRupeeIcon className="h-6 w-6 text-teal-500" /> },
    { label: "Documents", path: "/hr/documents", icon: <DocumentTextIcon className="h-6 w-6 text-pink-500" /> },
    { label: "Reviews", path: "/hr/reviews", icon: <StarIcon className="h-6 w-6 text-yellow-500" /> },
  ];

  return (
    <div className="p-6 space-y-10 bg-gradient-to-b from-gray-50 to-gray-100 min-h-screen">
      {/* Header */}
      <motion.h1
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-extrabold text-gray-900 tracking-wide drop-shadow-sm"
      >
        HR Management Dashboard
      </motion.h1>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, idx) => (
          <motion.div
            key={idx}
            variants={cardAnim}
            initial="hidden"
            animate="show"
            transition={{ delay: 0.1 * (idx + 1) }}
            className={`p-6 rounded-2xl shadow-lg text-white bg-gradient-to-br ${stat.gradient} hover:shadow-2xl hover:scale-[1.03] transform transition-all relative overflow-hidden`}
          >
            {/* Background icon */}
            <div className="absolute -right-6 -top-6">{stat.icon}</div>

            <h2 className="text-xl font-semibold relative z-10">{stat.title}</h2>
            <p className="text-4xl font-bold mt-2 relative z-10">
              <CountUp end={stat.value} duration={1.5} separator="," />
            </p>
          </motion.div>
        ))}
      </div>

      {/* Quick Links */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 pt-4">
        {quickLinks.map((link, idx) => (
          <motion.div
            key={idx}
            variants={cardAnim}
            initial="hidden"
            animate="show"
            transition={{ delay: 0.1 * (idx + 1) }}
          >
            <Link
              to={link.path}
              className="flex items-center gap-4 p-5 bg-white/70 backdrop-blur-md rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all border border-gray-200"
            >
              <div className="p-3 bg-gray-50 rounded-full shadow">{link.icon}</div>
              <p className="text-lg font-semibold text-gray-800">{link.label}</p>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
