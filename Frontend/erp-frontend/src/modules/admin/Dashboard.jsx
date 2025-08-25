export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
        <div className="p-4 rounded-xl border bg-white">
          <div className="text-sm text-gray-500">Total Employees</div>
          <div className="text-3xl font-semibold">—</div>
        </div>
        <div className="p-4 rounded-xl border bg-white">
          <div className="text-sm text-gray-500">Pending Orders</div>
          <div className="text-3xl font-semibold">—</div>
        </div>
        <div className="p-4 rounded-xl border bg-white">
          <div className="text-sm text-gray-500">Revenue (₹)</div>
          <div className="text-3xl font-semibold">—</div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-4">
        <div className="p-4 rounded-xl border bg-white min-h-[260px]">Bar Chart: Order Status</div>
        <div className="p-4 rounded-xl border bg-white min-h-[260px]">Pie Chart: Revenue Split</div>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        {['HRM','Orders','Inventory','Supply','Finance','CRM'].map(m => (
          <a key={m} href={`/${m.toLowerCase()}/dashboard`} className="p-4 rounded-xl border bg-white hover:shadow">
            <div className="text-lg font-semibold">{m}</div>
            <div className="text-gray-500 text-sm">Open {m} module</div>
          </a>
        ))}
      </div>
    </div>
  );
}
