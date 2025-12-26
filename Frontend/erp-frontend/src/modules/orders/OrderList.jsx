import React, { useEffect, useState } from "react";
import OrderAPI from "../../../services/orderApi";
import Modal from "../../components/Modal";
import OrderForm from "../components/OrderForm";

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState(null);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await OrderAPI.getOrders();
      setOrders(res.data);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      await OrderAPI.deleteOrder(id);
      fetchOrders();
    } catch (err) {
      console.error(err);
    }
  };

  const openModal = (order = null) => {
    setModalData(order);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalData(null);
    setModalOpen(false);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Orders</h1>
      <button
        onClick={() => openModal()}
        className="mb-4 px-4 py-2 bg-green-500 text-white rounded"
      >
        Add Order
      </button>

      <table className="w-full border">
        <thead>
          <tr>
            <th className="border p-2">ID</th>
            <th className="border p-2">Customer</th>
            <th className="border p-2">Product</th>
            <th className="border p-2">Quantity</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order.id}>
              <td className="border p-2">{order.id}</td>
              <td className="border p-2">{order.customer_name}</td>
              <td className="border p-2">{order.product_name}</td>
              <td className="border p-2">{order.quantity}</td>
              <td className="border p-2">{order.status}</td>
              <td className="border p-2 flex gap-2">
                <button
                  onClick={() => openModal(order)}
                  className="px-2 py-1 bg-blue-500 text-white rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(order.id)}
                  className="px-2 py-1 bg-red-500 text-white rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal isOpen={modalOpen} title={modalData ? "Edit Order" : "Add Order"} onClose={closeModal}>
        <OrderForm order={modalData} onClose={closeModal} onRefresh={fetchOrders} />
      </Modal>
    </div>
  );
};

export default OrderList;
