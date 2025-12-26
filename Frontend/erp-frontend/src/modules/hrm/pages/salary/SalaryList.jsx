import { Link } from "react-router-dom";

export default function SalaryList() {
  // ...state and data loading

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Salaries</h2>

        <Link
          to="/hrm/salaries/add"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add Salary
        </Link>
      </div>

      {/* Table for salary records */}
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">Employee</th>
            <th className="p-2 border">Amount</th>
            <th className="p-2 border">Month</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {/* Map salary records here */}
        </tbody>
      </table>
    </div>
  );
}
