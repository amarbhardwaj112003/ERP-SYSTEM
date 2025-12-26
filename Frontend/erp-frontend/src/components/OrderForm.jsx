import React, { useEffect, useState } from "react";
import OrderAPI from "../../../services/orderApi";

const OrderForm = ({ order, onClose, onRefresh }) => {
  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    customer: order?.customer || "",
    product: order?.product || "",
    quantity: order?.quantity || 1,
  });

  useEffect(() => {
    const fetchData = async () => {
      const cRes = await OrderAPI.getCustomers();
      const pRes = await OrderAPI.getProducts();
      setCustomers(cRes.data);
      setProducts(pRes.data);
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (order) {
        await OrderAPI.updateOrder(order.id, formData);
      } else {
        await OrderAPI.addOrder(formData);
      }
      onRefresh();
      onClose();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <select name="customer" value={formData.customer} onChange={handleChange} required className="border px-2 py-1 rounded">
        <option value="">Select Customer</option>
        {customers.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
      </select>

      <select name="product" value={formData.product} onChange={handleChange} required className="border px-2 py-1 rounded">
        <option value="">Select Product</option>
        {products.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
      </select>

      <input type="number" name="quantity" value={formData.quantity} onChange={handleChange} min={1} required className="border px-2 py-1 rounded" />

      <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">
        {order ? "Update" : "Add"} Order
      </button>
    </form>
  );
};

export default OrderForm;
