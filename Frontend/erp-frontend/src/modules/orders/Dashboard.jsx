// src/modules/orders/OrderDashboard.jsx
import React, { useEffect, useState } from "react";
import OrderAPI from "../../services/orderApi";
import Modal from "../../components/Modal";
import { motion } from "framer-motion";
import { PencilIcon, TrashIcon, PlusCircleIcon } from "@heroicons/react/24/outline";

const statusColors = {
  pending: "bg-yellow-100 text-yellow-800",
  processing: "bg-blue-100 text-blue-800",
  shipped: "bg-purple-100 text-purple-800",
  delivered: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
};

const OrderDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [modalType, setModalType] = useState(""); 
  const [modalData, setModalData] = useState(null); 
  const [formData, setFormData] = useState({
    customer_name: "",
    mobile: "",
    email: "",
    address: "",
    product: "",
    quantity: 1,
  });

  const fetchData = async () => {
    setLoading(true);
    try {
      const [ordersRes, productsRes] = await Promise.all([
        OrderAPI.getOrders(),
        OrderAPI.getProducts(),
      ]);
      setOrders(ordersRes.data);
      setProducts(productsRes.data);
    } catch (error) {
      console.error("Fetch error:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const openModal = (order = null) => {
    setModalType("order");
    setModalData(order);

    if (order) {
      setFormData({
        customer_name: order.customer_name,
        mobile: "",
        email: "",
        address: "",
        product: order.product,
        quantity: order.quantity,
      });
    } else {
      setFormData({
        customer_name: "",
        mobile: "",
        email: "",
        address: "",
        product: "",
        quantity: 1,
      });
    }
  };

  const closeModal = () => {
    setModalType("");
    setModalData(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (modalData?.id) {
        await OrderAPI.updateOrder(modalData.id, {
          product: formData.product,
          quantity: parseInt(formData.quantity),
        });
      } else {
        await OrderAPI.createOrder({
          customer_name: formData.customer_name,
          mobile: formData.mobile,
          email: formData.email,
          address: formData.address,
          product: formData.product,
          quantity: parseInt(formData.quantity),
        });
      }
      closeModal();
      fetchData();
    } catch (error) {
      console.error("Submit failed:", error);
      alert("Submit failed! Check console for details.");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this order?")) return;
    try {
      await OrderAPI.deleteOrder(id);
      fetchData();
    } catch (error) {
      console.error("Delete failed:", error);
      alert("Delete failed! Check console for details.");
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      await OrderAPI.updateStatus(id, status);
      fetchData();
    } catch (error) {
      console.error("Status update failed:", error);
      alert("Status update failed! Check console for details.");
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-[60vh] text-gray-500 text-xl">
        Loading...
      </div>
    );

  return (
    <div className="p-6 space-y-6">

      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
          Orders Dashboard
        </h1>
        <button
          onClick={() => openModal()}
          className="flex items-center gap-2 px-5 py-2 bg-green-500 text-white rounded-lg shadow hover:bg-green-600 transition"
        >
          <PlusCircleIcon className="h-5 w-5" /> Add New Order
        </button>
      </div>

      {/* Cards Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="p-6 rounded-2xl shadow-lg bg-gradient-to-br from-blue-500 to-blue-700 text-white"
        >
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Total Orders</h2>
            <PlusCircleIcon className="h-6 w-6" />
          </div>
          <p className="text-4xl font-bold mt-2">{orders.length}</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="p-6 rounded-2xl shadow-lg bg-gradient-to-br from-purple-500 to-purple-700 text-white"
        >
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Pending Orders</h2>
            <PlusCircleIcon className="h-6 w-6" />
          </div>
          <p className="text-4xl font-bold mt-2">
            {orders.filter((o) => o.status === "pending").length}
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="p-6 rounded-2xl shadow-lg bg-gradient-to-br from-green-500 to-green-700 text-white"
        >
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Delivered Orders</h2>
            <PlusCircleIcon className="h-6 w-6" />
          </div>
          <p className="text-4xl font-bold mt-2">
            {orders.filter((o) => o.status === "delivered").length}
          </p>
        </motion.div>
      </div>

      {/* Modal */}
      <Modal isOpen={!!modalType} title={modalData ? "Edit Order" : "Create Order"} onClose={closeModal}>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          {!modalData && (
            <>
              <input
                name="customer_name"
                placeholder="Customer Name"
                value={formData.customer_name}
                onChange={handleChange}
                required
                className="border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <input
                name="mobile"
                placeholder="Mobile"
                value={formData.mobile}
                onChange={handleChange}
                required
                className="border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <input
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
                className="border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <textarea
                name="address"
                placeholder="Address"
                value={formData.address}
                onChange={handleChange}
                required
                className="border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </>
          )}

          <select
            name="product"
            value={formData.product}
            onChange={handleChange}
            required
            className="border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="">Select Product</option>
            {products.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name} (Available: {p.available_quantity})
              </option>
            ))}
          </select>

          <input
            name="quantity"
            type="number"
            min="1"
            value={formData.quantity}
            onChange={handleChange}
            required
            className="border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            {modalData ? "Update Order" : "Create Order"}
          </button>
        </form>
      </Modal>

      {/* Orders Table */}
      <div className="overflow-x-auto rounded-lg shadow-lg">
        <table className="min-w-full divide-y divide-gray-200 bg-white">
          <thead className="bg-gray-50">
            <tr>
              {["ID", "Customer", "Product", "Quantity", "Status", "Actions"].map((header) => (
                <th
                  key={header}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-50 transition">
                <td className="px-6 py-4 whitespace-nowrap">{order.id}</td>
                <td className="px-6 py-4 whitespace-nowrap">{order.customer_name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{order.product_name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{order.quantity}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <select
                    value={order.status}
                    onChange={(e) => handleStatusChange(order.id, e.target.value)}
                    className={`px-2 py-1 rounded font-medium ${statusColors[order.status]}`}
                  >
                    {Object.keys(statusColors).map((status) => (
                      <option key={status} value={status}>
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="px-6 py-4 whitespace-nowrap flex gap-2">
                  <button
                    onClick={() => openModal(order)}
                    className="flex items-center gap-1 px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition"
                  >
                    <PencilIcon className="h-4 w-4" /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(order.id)}
                    className="flex items-center gap-1 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
                  >
                    <TrashIcon className="h-4 w-4" /> Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderDashboard;
