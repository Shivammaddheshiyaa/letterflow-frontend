import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import WriteLetter from "./pages/WriteLetter";
import Address from "./pages/Address";
import Preview from "./pages/Preview";
import Success from "./pages/Success";
import Orders from "./pages/Orders";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminDashboard from "./pages/AdminDashboard";
import AdminRoute from "./components/AdminRoute";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected routes */}
        <Route
          path="/write"
          element={
            <ProtectedRoute>
              <WriteLetter />
            </ProtectedRoute>
          }
        />

        <Route
          path="/address"
          element={
            <ProtectedRoute>
              <Address />
            </ProtectedRoute>
          }
        />

        <Route
          path="/preview/:id"
          element={
            <ProtectedRoute>
              <Preview />
            </ProtectedRoute>
          }
        />

        <Route
          path="/success/:id"
          element={
            <ProtectedRoute>
              <Success />
            </ProtectedRoute>
          }
        />

        {/* ✅ NEW: Orders Page */}
        <Route
          path="/orders"
          element={
            <ProtectedRoute>
              <Orders />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />


      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
