import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Payment from "../components/Payment";

const API_URL =
  process.env.REACT_APP_API_URL || "http://localhost:5000";

export default function Preview() {
  const { id: letterId } = useParams();
  const navigate = useNavigate();

  const [letterData, setLetterData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLetter = async () => {
      try {
        const res = await axios.get(
          `${API_URL}/api/letters/${letterId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        setLetterData(res.data.letter);
      } catch (err) {
        console.error("Failed to fetch letter:", err);
      } finally {
        setLoading(false);
      }
    };

    if (letterId) fetchLetter();
  }, [letterId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg text-gray-600">Loading preview…</p>
      </div>
    );
  }

  if (!letterData || !letterData.address) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg text-red-600">Incomplete letter data</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12 px-4">
      <div className="max-w-5xl mx-auto">

        {/* HEADER */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            Preview Your Letter
          </h1>
          <p className="text-gray-600">
            Please review your letter and delivery details before payment
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">

          {/* LETTER */}
          <div className="bg-white rounded-2xl shadow-lg border p-6">
            <h2 className="text-2xl font-semibold text-blue-600 mb-4">
              📄 Letter
            </h2>
            <div className="bg-gray-50 border rounded-xl p-5 whitespace-pre-wrap">
              {letterData.content}
            </div>
          </div>

          {/* ADDRESS */}
          <div className="bg-white rounded-2xl shadow-lg border p-6">
            <h2 className="text-2xl font-semibold text-purple-600 mb-4">
              📍 Delivery Address
            </h2>
            <div className="bg-gray-50 border rounded-xl p-5 space-y-1">
              <p className="font-semibold">{letterData.address.name}</p>
              <p>{letterData.address.street}</p>
              <p>
                {letterData.address.city} {letterData.address.postalCode}
              </p>
              <p>{letterData.address.country}</p>
            </div>
          </div>
        </div>

        {/* PAYMENT COMPONENT */}
        <div className="mt-10 max-w-md mx-auto">
          <Payment
            amount={248}
            letter={letterData}
            address={letterData.address}
            onSuccess={() => navigate("/success")}
            onError={(err) => alert(err)}
          />
        </div>
      </div>
    </div>
  );
}
