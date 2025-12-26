import { useState, useEffect } from "react";
import HRM from "../../../../services/hrmApi";

export default function DocumentUpload() {
  const [employees, setEmployees] = useState([]);
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [employee, setEmployee] = useState("");

  useEffect(() => {
    loadEmployees();
  }, []);

  const loadEmployees = async () => {
    try {
      const res = await HRM.getEmployees();
      setEmployees(res.data);
    } catch (error) {
      console.log("Error loading employees", error);
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!file || !title || !employee) {
      alert("Please fill all fields");
      return;
    }

    const formData = new FormData();
    formData.append("employee", employee);
    formData.append("title", title);
    formData.append("file", file);  // MUST match your Django model name

    try {
      await HRM.uploadDocument(formData);
      alert("Document uploaded successfully!");
      setTitle("");
      setEmployee("");
      setFile(null);
    } catch (error) {
      console.error("Upload error:", error);
      alert("Failed to upload document");
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Upload Employee Document</h2>

      <form onSubmit={handleUpload} className="border p-4 rounded">
        
        {/* Employee Drop-down */}
        <div className="mb-3">
          <label className="block font-medium mb-1">Select Employee</label>
          <select
            className="border p-2 w-full"
            value={employee}
            onChange={(e) => setEmployee(e.target.value)}
          >
            <option value="">-- Select Employee --</option>
            {employees.map((emp) => (
              <option key={emp.id} value={emp.id}>
                {emp.name}
              </option>
            ))}
          </select>
        </div>

        {/* Title */}
        <div className="mb-3">
          <label className="block font-medium mb-1">Document Title</label>
          <input
            type="text"
            className="border p-2 w-full"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g., Aadhaar Card, Offer Letter"
          />
        </div>

        {/* File Upload */}
        <div className="mb-3">
          <label className="block font-medium mb-1">Choose File</label>
          <input
            type="file"
            className="border p-2 w-full"
            onChange={(e) => setFile(e.target.files[0])}
          />
        </div>

        {/* Submit Button */}
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Upload
        </button>
      </form>
    </div>
  );
}
