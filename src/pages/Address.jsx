import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const API_URL =
  process.env.REACT_APP_API_URL || "http://localhost:5000";

export default function Address() {
  const navigate = useNavigate();
  const location = useLocation();

  // 🔑 letterId comes from navigation state
  const letterId = location.state?.letterId;

  // 🔐 Guard: if someone refreshes or opens directly
  useEffect(() => {
    if (!letterId) {
      navigate("/write");
    }
  }, [letterId, navigate]);

  const [address, setAddress] = useState({
    name: "",
    street: "",
    apartment: "",
    city: "",
    state: "",
    postalCode: "",
    country: "IN",
    phone: "",
  });

  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const countries = [
    { code: "IN", name: "India" },
    { code: "US", name: "United States" },
    { code: "GB", name: "United Kingdom" },
    { code: "CA", name: "Canada" },
    { code: "AU", name: "Australia" },
    { code: "DE", name: "Germany" },
    { code: "FR", name: "France" },
    { code: "JP", name: "Japan" },
  ];

  // ✅ Validation
  useEffect(() => {
    const newErrors = {};
    if (!address.name.trim()) newErrors.name = "Name is required";
    if (!address.street.trim()) newErrors.street = "Street is required";
    if (!address.city.trim()) newErrors.city = "City is required";
    if (!address.postalCode.trim())
      newErrors.postalCode = "Postal code is required";
    if (!address.country) newErrors.country = "Country is required";

    setErrors(newErrors);
    setIsValid(Object.keys(newErrors).length === 0);
  }, [address]);

  // ✅ Save address
  const handleSubmit = async () => {
    setIsSubmitted(true);
    if (!isValid) return;

    try {
      setLoading(true);

      await axios.put(
        `${API_URL}/api/letters/${letterId}/address`,
        address,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );

      // 🔥 Navigate using URL param (Preview is param-based)
      navigate(`/preview/${letterId}`);
    } catch (error) {
      console.error("Save address failed:", error);
      alert("Failed to save address. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    navigate("/write", { state: { letterId } });
  };

  const handleInputChange = (field, value) => {
    setAddress((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const formatAddressPreview = () => {
    const countryName =
      countries.find((c) => c.code === address.country)?.name ||
      address.country;

    return `${address.name}
${address.street}
${address.apartment ? address.apartment + "\n" : ""}
${address.city}${address.state ? ", " + address.state : ""} ${
      address.postalCode
    }
${countryName}
${address.phone ? "Phone: " + address.phone : ""}`.trim();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="text-center mb-10">
          <button
            onClick={handleBack}
            className="text-gray-600 hover:text-gray-900 mb-6"
          >
            ← Back to Letter
          </button>

          <h1 className="text-4xl font-bold mb-4">Delivery Address</h1>
          <p className="text-gray-600">
            Where should we send your letter?
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">

          {/* Preview */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl p-6 shadow">
              <h3 className="font-semibold mb-3">Address Preview</h3>
              <div className="bg-gray-50 p-4 rounded whitespace-pre-line">
                {formatAddressPreview() || "Start typing…"}
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl p-6 shadow">
              <div className="grid md:grid-cols-2 gap-6">
                <input
                  placeholder="Full Name"
                  value={address.name}
                  onChange={(e) =>
                    handleInputChange("name", e.target.value)
                  }
                  className="border p-3 rounded"
                />

                <input
                  placeholder="Street Address"
                  value={address.street}
                  onChange={(e) =>
                    handleInputChange("street", e.target.value)
                  }
                  className="border p-3 rounded md:col-span-2"
                />

                <input
                  placeholder="Apartment"
                  value={address.apartment}
                  onChange={(e) =>
                    handleInputChange("apartment", e.target.value)
                  }
                  className="border p-3 rounded"
                />

                <input
                  placeholder="Phone"
                  value={address.phone}
                  onChange={(e) =>
                    handleInputChange("phone", e.target.value)
                  }
                  className="border p-3 rounded"
                />

                <input
                  placeholder="City"
                  value={address.city}
                  onChange={(e) =>
                    handleInputChange("city", e.target.value)
                  }
                  className="border p-3 rounded"
                />

                <input
                  placeholder="State"
                  value={address.state}
                  onChange={(e) =>
                    handleInputChange("state", e.target.value)
                  }
                  className="border p-3 rounded"
                />

                <input
                  placeholder="Postal Code"
                  value={address.postalCode}
                  onChange={(e) =>
                    handleInputChange("postalCode", e.target.value)
                  }
                  className="border p-3 rounded"
                />

                <select
                  value={address.country}
                  onChange={(e) =>
                    handleInputChange("country", e.target.value)
                  }
                  className="border p-3 rounded"
                >
                  {countries.map((c) => (
                    <option key={c.code} value={c.code}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <button
                onClick={handleSubmit}
                disabled={!isValid || loading}
                className="mt-6 w-full bg-blue-600 text-white p-4 rounded font-semibold disabled:bg-gray-400"
              >
                {loading ? "Saving..." : "Continue to Preview"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
