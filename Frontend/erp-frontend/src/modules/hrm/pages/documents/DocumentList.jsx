import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import HRM from "../../../../services/hrmApi";

export default function DocumentList() {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDocs();
  }, []);

  const loadDocs = async () => {
    setLoading(true);
    try {
      const res = await HRM.getDocuments();
      setDocuments(res.data);
    } catch (err) {
      console.error("Error loading documents:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this document?")) return;

    try {
      await HRM.deleteDocument(id);
      setDocuments((prev) => prev.filter((d) => d.id !== id));
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Could not delete document.");
    }
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Employee Documents</h2>

        {/* FIXED: Correct Route */}
        <Link
          to="/hrm/documents/upload"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Upload Document
        </Link>
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        {loading ? (
          <div className="p-6 text-center text-gray-500">Loading...</div>
        ) : documents.length === 0 ? (
          <div className="p-6 text-center text-gray-600">No documents found.</div>
        ) : (
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 text-left">Title</th>
                <th className="p-3 text-left">Employee</th>
                <th className="p-3 text-left">File</th>
                <th className="p-3 text-left">Uploaded At</th>
                <th className="p-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {documents.map((doc) => (
                <tr key={doc.id} className="border-t hover:bg-gray-50">
                  <td className="p-3">{doc.title}</td>

                  {/* FIXED: employee_name works now */}
                  <td className="p-3">{doc.employee_name}</td>

                  <td className="p-3">
                    {doc.file ? (
                      <a
                        href={doc.file}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        View / Download
                      </a>
                    ) : (
                      "-"
                    )}
                  </td>

                  <td className="p-3">
                    {new Date(doc.uploaded_at).toLocaleString()}
                  </td>

                  <td className="p-3">
                    <button
                      onClick={() => handleDelete(doc.id)}
                      className="text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
