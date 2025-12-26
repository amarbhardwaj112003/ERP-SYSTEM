import { useEffect, useState } from "react";
import { crmApi } from "../../../../services/crmApi";
import { Link } from "react-router-dom";

export default function CustomerList() {
  const [customers, setCustomers] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadCustomers();
  }, []);

  const loadCustomers = async () => {
    try {
      const response = await crmApi.getCustomers();
      setCustomers(response);
    } catch (error) {
      console.error("Error loading customers:", error);
    }
  };

  const filteredCustomers = customers.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-semibold">Customers</h1>

        <Link
          to="/crm/customers/add"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow"
        >
          + Add Customer
        </Link>
      </div>

      {/* Search */}
      <input
        type="text"
        placeholder="Search customers..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded mb-4"
      />

      {/* Table */}
      <div className="bg-white shadow rounded-lg overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 border-b">
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Phone</th>
              <th className="p-3 text-left">Company</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredCustomers.length > 0 ? (
              filteredCustomers.map((customer) => (
                <tr key={customer.id} className="border-b hover:bg-gray-50">
                  <td className="p-3">{customer.name}</td>
                  <td className="p-3">{customer.email}</td>
                  <td className="p-3">{customer.phone}</td>
                  <td className="p-3">{customer.company}</td>
                  <td className="p-3">
                    <Link
                      to={`/crm/customers/${customer.id}`}
                      className="text-blue-600"
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="p-3 text-center" colSpan="5">
                  No customers found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
