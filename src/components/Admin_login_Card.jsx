import { useState } from "react";
import { checkAccess } from "../services/checkAdminAccess";

export default function LoginCard({ onClose, onSuccess }) {
  const [userId, setUserId] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!userId || !phone) {
      alert("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      const data = await checkAccess(userId, phone);

      if (data.success) {
        // console.log(data);
        localStorage.setItem("admin_token", data.token);
        localStorage.setItem("user", data.userName);
        localStorage.setItem("userId", data.userId);

        onSuccess(); // tell parent login worked
      } else {
        alert("You don't have admin access");
      }

    } catch (err) {
      alert("Error checking access");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 text-black">
      <div className="bg-white p-6 rounded-lg w-80 shadow-lg">

        <h2 className="text-lg font-bold mb-4 text-center">
          Admin Verification
        </h2>

        <input
          type="text"
          placeholder="Enter ID"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          className="border p-2 w-full mb-3 rounded"
          required
        />

        <input
          type="tel"
          placeholder="Enter PIN"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="border p-2 w-full mb-4 rounded"
          required
        />

        <div className="flex justify-between">
          <button 
            onClick={onClose}
            className="px-3 py-1 border rounded"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="bg-bgColor text-white px-3 py-1 rounded"
          >
            {loading ? "Checking..." : "Submit"}
          </button>

        </div>

      </div>
    </div>
  );
}