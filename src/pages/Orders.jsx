import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import OrderProgress from "../components/OrderProgress";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/letters/my`, {
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
    fetchOrders();
  }, []);

  const statusStyles = {
    paid: "bg-blue-50 text-blue-700 ring-1 ring-blue-200/50",
    printing: "bg-purple-50 text-purple-700 ring-1 ring-purple-200/50",
    shipped: "bg-indigo-50 text-indigo-700 ring-1 ring-indigo-200/50",
    delivered: "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200/50"
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-gray-50/50 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="text-5xl mb-4 text-gray-300 animate-bounce">✉️</div>
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-12 h-1 bg-gray-100 rounded-full animate-pulse" />
          </div>
          <p className="text-sm font-medium text-gray-400 mt-4">
            Loading your orders...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        
        {/* Elegant Header */}
        <div className="mb-12 text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-3">
            <div className="relative">
              <span className="text-4xl">📬</span>
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full ring-2 ring-white" />
            </div>
            <div>
              <h1 className="text-3xl font-light tracking-tight text-gray-900">
                My <span className="font-medium">Orders</span>
              </h1>
              <p className="text-sm text-gray-500 mt-1.5 font-medium">
                {orders.length} {orders.length === 1 ? 'letter' : 'letters'} in progress
              </p>
            </div>
          </div>
          <div className="hidden sm:block w-24 h-0.5 bg-gradient-to-r from-gray-200 to-transparent mt-4" />
        </div>

        {orders.length === 0 ? (
          <div className="bg-white/80 backdrop-blur-sm p-16 rounded-3xl border border-gray-100 text-center shadow-sm hover:shadow-md transition-shadow">
            <div className="relative inline-block">
              <div className="text-7xl mb-4 text-gray-300">📭</div>
              <span className="absolute -bottom-1 right-0 w-4 h-4 bg-gray-200 rounded-full ring-4 ring-white" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No orders yet
            </h3>
            <p className="text-sm text-gray-500 mb-8 max-w-xs mx-auto">
              Your handwritten letters will appear here once you send them
            </p>
            <button
              onClick={() => navigate("/write")}
              className="inline-flex items-center px-6 py-3 bg-gray-900 text-white text-sm font-medium rounded-xl hover:bg-gray-800 transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5"
            >
              <span className="mr-2">✍️</span>
              Write your first letter
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order, index) => (
              <div
                key={order._id}
                onClick={() => navigate(`/success/${order._id}`)}
                className="group relative bg-white p-6 rounded-2xl border border-gray-100 hover:border-gray-200 hover:shadow-md transition-all cursor-pointer"
              >
                {/* Subtle gradient background on hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-gray-50/50 to-transparent opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity" />
                
                <div className="relative">
                  {/* Header Section */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      {/* Order icon */}
                      <div className="hidden sm:flex w-10 h-10 bg-gray-50 rounded-xl items-center justify-center border border-gray-100 group-hover:border-gray-200 transition-colors">
                        <span className="text-lg">📄</span>
                      </div>
                      
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-xs font-mono font-medium text-gray-400 bg-gray-50 px-2 py-1 rounded-lg">
                            #{order._id.slice(-8).toUpperCase()}
                          </span>
                          <span className="text-xs text-gray-300">•</span>
                          <span className="text-xs font-medium text-gray-400">
                            {new Date(order.createdAt).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric'
                            })}
                          </span>
                        </div>
                        
                        {/* Enhanced Status Badge */}
                        <span className={`inline-flex items-center px-3 py-1.5 text-xs font-medium rounded-full capitalize ${
                          statusStyles[order.status] || "bg-gray-50 text-gray-700 ring-1 ring-gray-200/50"
                        }`}>
                          <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
                            order.status === 'delivered' ? 'bg-emerald-500' :
                            order.status === 'shipped' ? 'bg-indigo-500' :
                            order.status === 'printing' ? 'bg-purple-500' :
                            order.status === 'paid' ? 'bg-blue-500' : 'bg-gray-500'
                          }`} />
                          {order.status === "paid" ? "Payment confirmed" :
                           order.status === "printing" ? "Currently printing" :
                           order.status === "shipped" ? "On its way" :
                           order.status === "delivered" ? "Successfully delivered" : 
                           order.status.replace('_', ' ')}
                        </span>
                      </div>
                    </div>
                    
                    {/* Enhanced View Link */}
                    <span className="inline-flex items-center text-xs font-medium text-gray-400 group-hover:text-gray-900 transition-colors">
                      View details 
                      <span className="ml-1 text-sm transform group-hover:translate-x-0.5 transition-transform">
                        →
                      </span>
                    </span>
                  </div>

                  {/* Progress Section */}
                  <div className="mt-4 pl-0 sm:pl-13">
                    <OrderProgress status={order.status} />
                  </div>
                  
                  {/* Metadata Footer */}
                  <div className="flex items-center gap-3 mt-4 pt-3 border-t border-gray-50">
                    {order.isAnonymous && (
                      <span className="inline-flex items-center gap-1.5 text-xs text-gray-400 bg-gray-50 px-2 py-1 rounded-lg">
                        <span className="text-sm">🕵️</span>
                        Anonymous sender
                      </span>
                    )}
                    
                    {/* Delivery estimate (example enhancement) */}
                    {order.status !== 'delivered' && order.status !== 'paid' && (
                      <span className="inline-flex items-center gap-1.5 text-xs text-gray-300">
                        <span className="w-1 h-1 bg-gray-300 rounded-full" />
                        Estimated 3-5 days
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {/* Subtle footer */}
        {orders.length > 0 && (
          <p className="text-center text-xs text-gray-300 mt-8">
            Click on any order to view full details and tracking
          </p>
        )}
      </div>
    </div>
  );
}