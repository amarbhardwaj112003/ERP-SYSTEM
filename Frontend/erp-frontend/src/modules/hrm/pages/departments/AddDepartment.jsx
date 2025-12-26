import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import HRM from "../../../../services/hrmApi";

const AddDepartment = () => {
  const navigate = useNavigate();
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const editId = params.get("id");

  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (editId) {
      (async () => {
        try {
          const res = await HRM.getDepartment(editId);
          setName(res.data.name || "");
        } catch (err) {
          console.error(err);
          setError("Failed to fetch department data.");
        }
      })();
    }
  }, [editId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      setLoading(true);
      if (editId) {
        await HRM.updateDepartment(editId, { name });
      } else {
        await HRM.createDepartment({ name });
      }
      navigate("/hr/departments");
    } catch (err) {
      console.error(err);
      if (err.response) {
        setError(err.response.data.detail || "Something went wrong.");
      } else {
        setError("Network error or server not responding.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4">
        {editId ? "Edit Department" : "Add Department"}
      </h1>

      {error && (
        <div className="mb-4 p-2 bg-red-200 text-red-800 rounded">{error}</div>
      )}

      <form onSubmit={handleSubmit}>
        <label className="block mb-2 font-semibold">Name</label>
        <input
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border rounded mb-4"
          placeholder="Enter department name"
        />

        <div className="flex gap-2">
          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded"
            disabled={loading}
          >
            {loading ? "Saving..." : "Save"}
          </button>
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="px-4 py-2 border rounded"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddDepartment;
