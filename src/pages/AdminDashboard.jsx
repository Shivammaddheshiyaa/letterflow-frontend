import { useEffect, useState } from "react";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

export default function AdminDashboard() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("all");

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/admin/orders`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setOrders(res.data.letters);
    } catch (error) {
      console.error("Failed to fetch orders:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await axios.put(
        `${API_URL}/api/admin/orders/${id}/status`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      fetchOrders();
    } catch (error) {
      console.error("Status update failed:", error);
    }
  };

  /* ===================== FILTERS ===================== */
  const total = orders.length;
  const pending = orders.filter(
    (o) => o.status === "draft" || o.status === "address_added"
  ).length;
  const paid = orders.filter((o) => o.status === "paid").length;
  const printing = orders.filter((o) => o.status === "printing").length;
  const shipped = orders.filter((o) => o.status === "shipped").length;
  const delivered = orders.filter((o) => o.status === "delivered").length;

  const getFilteredOrders = () => {
    if (activeFilter === "all") return orders;
    if (activeFilter === "pending") {
      return orders.filter((o) => o.status === "draft" || o.status === "address_added");
    }
    return orders.filter((o) => o.status === activeFilter);
  };

  const filteredOrders = getFilteredOrders();

  const filters = [
    { id: "all", label: "All", count: total, color: "gray" },
    { id: "pending", label: "Pending", count: pending, color: "amber" },
    { id: "paid", label: "Paid", count: paid, color: "blue" },
    { id: "printing", label: "Printing", count: printing, color: "purple" },
    { id: "shipped", label: "Shipped", count: shipped, color: "indigo" },
    { id: "delivered", label: "Delivered", count: delivered, color: "emerald" },
  ];

  const getStatusBadgeColor = (status) => {
    switch(status) {
      case "draft": return "bg-gray-100 text-gray-700";
      case "address_added": return "bg-amber-100 text-amber-700";
      case "paid": return "bg-blue-100 text-blue-700";
      case "printing": return "bg-purple-100 text-purple-700";
      case "shipped": return "bg-indigo-100 text-indigo-700";
      case "delivered": return "bg-emerald-100 text-emerald-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-gray-500">Loading dashboard...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        
        {/* Simple header */}
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-gray-800">📮 Admin Dashboard</h1>
          <p className="text-sm text-gray-500 mt-1">Manage and track anonymous letters</p>
        </div>

        {/* Filter tabs with subtle colors */}
        <div className="mb-6 border-b border-gray-200 pb-1">
          <div className="flex flex-wrap items-center gap-2">
            {filters.map((filter) => {
              const isActive = activeFilter === filter.id;
              
              return (
                <button
                  key={filter.id}
                  onClick={() => setActiveFilter(filter.id)}
                  className={`
                    px-4 py-2 text-sm font-medium rounded-lg transition-all
                    ${isActive 
                      ? `bg-${filter.color}-600 text-white shadow-sm` 
                      : `bg-${filter.color}-50 text-${filter.color}-700 hover:bg-${filter.color}-100`
                    }
                  `}
                >
                  <span>{filter.label}</span>
                  <span className={`ml-2 px-1.5 py-0.5 rounded-full text-xs ${
                    isActive ? "bg-white/20 text-white" : "bg-white text-gray-700"
                  }`}>
                    {filter.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Results count */}
        <div className="mb-4 flex items-center justify-between">
          <span className="text-sm text-gray-600">
            Showing <span className="font-medium">{filteredOrders.length}</span> {filteredOrders.length === 1 ? 'order' : 'orders'}
          </span>
          <span className="text-xs text-gray-400">
            {activeFilter !== "all" ? `Filtered by: ${activeFilter}` : ''}
          </span>
        </div>

        {/* Order list */}
        <div className="space-y-3">
          {filteredOrders.length === 0 ? (
            <div className="bg-white p-12 rounded-xl border border-gray-200 text-center">
              <div className="text-4xl mb-3">📭</div>
              <p className="text-gray-600 font-medium">No orders found</p>
              <p className="text-sm text-gray-400 mt-1">
                {activeFilter !== "all" ? `No ${activeFilter} orders yet` : 'Orders will appear here'}
              </p>
            </div>
          ) : (
            filteredOrders.map((order) => (
              <div
                key={order._id}
                className="bg-white p-5 rounded-xl border border-gray-200 hover:border-gray-300 transition-all"
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  
                  {/* Left - User info */}
                  <div className="flex-1">
                    <div className="flex items-start gap-3">
                      <div className={`h-9 w-9 rounded-full flex items-center justify-center flex-shrink-0 ${
                        getStatusBadgeColor(order.status).split(' ')[0]
                      }`}>
                        <span className="text-sm font-medium">
                          {order.user?.name?.charAt(0) || "A"}
                        </span>
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center flex-wrap gap-2">
                          <h3 className="font-medium text-gray-800">
                            {order.user?.name || "Anonymous"}
                          </h3>
                          <span className="text-xs text-gray-400">
                            #{order._id.slice(-6)}
                          </span>
                          <span className="text-xs text-gray-400">
                            {new Date(order.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                        
                        <p className="text-xs text-gray-500 mb-2">
                          {order.user?.email || "No email provided"}
                        </p>
                        
                        {/* Letter preview with subtle background */}
                        <div className="mt-2 bg-gray-50 p-3 rounded-lg border border-gray-100">
                          <p className="text-sm text-gray-700 line-clamp-2">
                            {order.content || "No content"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right - Status dropdown */}
                  <div className="flex flex-col items-end gap-2">
                    <select
                      value={order.status}
                      onChange={(e) => updateStatus(order._id, e.target.value)}
                      className={`px-3 py-1.5 text-xs font-medium rounded-lg border-0 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${getStatusBadgeColor(order.status)}`}
                    >
                      <option value="draft">📝 Draft</option>
                      <option value="address_added">📍 Address Added</option>
                      <option value="paid">💰 Paid</option>
                      <option value="printing">🖨️ Printing</option>
                      <option value="shipped">📦 Shipped</option>
                      <option value="delivered">✅ Delivered</option>
                    </select>
                    
                    {/* Status badge */}
                    <span className={`text-xs px-2 py-0.5 rounded-full ${getStatusBadgeColor(order.status)}`}>
                      {order.status === "draft" ? "Draft" :
                       order.status === "address_added" ? "Address Added" :
                       order.status === "paid" ? "Paid" :
                       order.status === "printing" ? "Printing" :
                       order.status === "shipped" ? "Shipped" :
                       order.status === "delivered" ? "Delivered" : order.status}
                    </span>
                    
                    {order.isAnonymous && (
                      <span className="text-xs text-gray-400">
                        🕵️ Anonymous
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}