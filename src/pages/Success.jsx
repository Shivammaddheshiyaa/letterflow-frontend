import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import OrderProgress from "../components/OrderProgress";

const API_URL =
  process.env.REACT_APP_API_URL || "http://localhost:5000";

export default function Success() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [letter, setLetter] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLetter = async () => {
      try {
        const res = await axios.get(
          `${API_URL}/api/letters/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        setLetter(res.data.letter);
      } catch (error) {
        console.error("Failed to fetch order:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchLetter();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg text-gray-600">Loading order...</p>
      </div>
    );
  }

  if (!letter) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h2 className="text-xl font-semibold">No Order Found</h2>
      </div>
    );
  }

  const isPaid =
    letter.status === "paid" ||
    letter.status === "printing" ||
    letter.status === "shipped" ||
    letter.status === "delivered";

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-16 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-10">

        {/* Dynamic Header */}
        <div className="text-center mb-8">
          {isPaid ? (
            <>
              <h1 className="text-4xl font-bold text-green-600 mb-3">
                🎉 Payment Successful!
              </h1>
              <p className="text-gray-600">
                Your letter is being processed for delivery.
              </p>
            </>
          ) : (
            <>
              <h1 className="text-4xl font-bold text-yellow-600 mb-3">
                ⚠️ Payment Pending
              </h1>
              <p className="text-gray-600">
                This order has not been paid yet.
              </p>

              <button
                onClick={() => navigate(`/preview/${letter._id}`)}
                className="mt-4 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl"
              >
                Complete Payment
              </button>
            </>
          )}
        </div>

        {/* Order Info */}
        <div className="bg-gray-50 rounded-xl p-6 mb-6 border">
          <div className="flex justify-between items-center flex-wrap gap-4">
            <div>
              <p className="text-sm text-gray-500">Order ID</p>
              <p className="font-semibold">{letter._id}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Current Status</p>
              <span
                className={`px-4 py-1 rounded-full text-sm font-semibold capitalize ${
                  letter.status === "delivered"
                    ? "bg-green-100 text-green-700"
                    : letter.status === "shipped"
                    ? "bg-blue-100 text-blue-700"
                    : letter.status === "printing"
                    ? "bg-purple-100 text-purple-700"
                    : letter.status === "paid"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                {letter.status}
              </span>
            </div>
          </div>

          {/* Progress Tracker */}
          <OrderProgress status={letter.status} />
        </div>

        {/* Letter Preview */}
        <div className="bg-white border rounded-xl p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">📄 Letter Preview</h2>
          <div className="bg-gray-50 border rounded-lg p-4 whitespace-pre-wrap text-gray-700 leading-relaxed max-h-60 overflow-y-auto">
            {letter.content}
          </div>
        </div>

        {/* Delivery Info */}
        {isPaid && (
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8">
            <p className="text-blue-800 font-medium">
              Estimated Delivery: 5–10 business days
            </p>
            <p className="text-sm text-blue-700 mt-1">
              You can track your order anytime from your Orders dashboard.
            </p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate("/orders")}
            className="px-6 py-3 rounded-xl bg-gray-200 hover:bg-gray-300 font-semibold"
          >
            📦 View My Orders
          </button>

          <button
            onClick={() => navigate("/write")}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold hover:from-blue-700 hover:to-purple-700"
          >
            ✉️ Send Another Letter
          </button>
        </div>

      </div>
    </div>
  );
}
