// Navigates between pages
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Home from "./pages/home/Home.jsx";
import Login from "./pages/login/Login.jsx";
import UserProfile from "./pages/userprofile/UserProfile.jsx";
import Navbar from "./components/navbar/Navbar";

// Function to check if user is authenticated
const isAuthenticated = () => {
  return !!localStorage.getItem("token");
};

const AppRouter = () => {
  return (
    <Router>
      {/* Navbar appears on all pages */}
      <Navbar />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />

        {/* Protected Route */}
        <Route
          path="/profile"
          element={
            isAuthenticated() ? (
              <UserProfile />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        {/* Fallback for unknown routes */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
