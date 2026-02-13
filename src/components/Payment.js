import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL =
  process.env.REACT_APP_API_URL || "http://localhost:5000";

export default function Payment({
  amount = 248,
  letter,
  address,
}) {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const initializeRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    if (!letter?._id) {
      alert("Letter not found.");
      return;
    }

    setLoading(true);

    try {
      const loaded = await initializeRazorpay();
      if (!loaded) {
        alert("Razorpay SDK failed to load.");
        setLoading(false);
        return;
      }

      // ✅ Create order from backend
      const { data: order } = await axios.post(
        `${API_URL}/api/payment/create-order`,
        { amount },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: "INR",
        name: "LetterFlow",
        description: "Anonymous Letter Delivery",
        order_id: order.id,

        handler: async function (response) {
          try {
            // ✅ Verify payment on backend
            await axios.post(
              `${API_URL}/api/payment/verify`,
              {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                letterId: letter._id,
              },
              {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
              }
            );

            setLoading(false);

            // ✅ Redirect properly with letter ID
            navigate(`/success/${letter._id}`);

          } catch (err) {
            console.error("Verification error:", err);
            setLoading(false);
            alert("Payment verification failed.");
          }
        },

        prefill: {
          name: address?.name || "Customer",
          contact: address?.phone || "9999999999",
        },

        theme: {
          color: "#4F46E5",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();

      rzp.on("payment.failed", function (response) {
        setLoading(false);
        alert(response.error.description);
      });

    } catch (error) {
      console.error("Payment error:", error);
      setLoading(false);
      alert("Payment initialization failed.");
    }
  };

  return (
    <button
      onClick={handlePayment}
      disabled={loading}
      className="w-full py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl hover:from-indigo-700 hover:to-purple-700 transition shadow-lg"
    >
      {loading ? "Processing..." : `💳 Pay ₹${amount}`}
    </button>
  );
}
